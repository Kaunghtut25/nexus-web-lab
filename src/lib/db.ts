import { createClient } from '@libsql/client';
import crypto from 'crypto';

const client = createClient({
  url: process.env.TURSO_URL || 'libsql://stardust-db-kaunghtut25.aws-ap-northeast-1.turso.io',
  authToken: process.env.TURSO_TOKEN || '',
});

let initPromise: Promise<void> | null = null;

async function init() {
  await client.execute(`CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT DEFAULT '')`);
  await client.execute(`CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT, service TEXT, message TEXT, created_at TEXT DEFAULT (datetime('now')))`);
  await client.execute(`CREATE TABLE IF NOT EXISTS uploads (id TEXT PRIMARY KEY, data TEXT NOT NULL, mime TEXT, name TEXT, created_at TEXT DEFAULT (datetime('now')))`);
  await client.execute(`CREATE TABLE IF NOT EXISTS admins (id TEXT PRIMARY KEY, username TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS students (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, status TEXT DEFAULT 'pending', created_at TEXT DEFAULT (datetime('now')))`);
  await client.execute(`CREATE TABLE IF NOT EXISTS exam_results (email TEXT NOT NULL, module_id TEXT NOT NULL, score INTEGER NOT NULL DEFAULT 0, passed INTEGER NOT NULL DEFAULT 0, attempts INTEGER NOT NULL DEFAULT 0, best_score INTEGER NOT NULL DEFAULT 0, updated_at TEXT DEFAULT (datetime('now')), PRIMARY KEY (email, module_id))`);
  await client.execute(`CREATE TABLE IF NOT EXISTS chat_messages (id TEXT PRIMARY KEY, visitor_id TEXT NOT NULL, role TEXT NOT NULL, content TEXT NOT NULL, context TEXT DEFAULT 'website', created_at TEXT DEFAULT (datetime('now')))`);

  // Migration: add context column to chat_messages if missing (separates website vs course bot memory)
  // MUST run before creating the context index, or the index fails on pre-existing tables.
  try { await client.execute(`ALTER TABLE chat_messages ADD COLUMN context TEXT DEFAULT 'website'`); } catch { /* column exists */ }

  await client.execute(`CREATE INDEX IF NOT EXISTS idx_chat_visitor ON chat_messages (visitor_id, created_at)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_chat_visitor_context ON chat_messages (visitor_id, context, created_at)`);
// Human handoff: open handoff requests per visitor + staff replies the visitor polls
await client.execute(`CREATE TABLE IF NOT EXISTS chat_handoffs (id TEXT PRIMARY KEY, visitor_id TEXT NOT NULL, context TEXT DEFAULT 'website', status TEXT DEFAULT 'open', requested_at TEXT DEFAULT (datetime('now')), resolved_at TEXT)`);
await client.execute(`CREATE TABLE IF NOT EXISTS chat_staff_messages (id TEXT PRIMARY KEY, visitor_id TEXT NOT NULL, context TEXT DEFAULT 'website', content TEXT NOT NULL, created_at TEXT DEFAULT (datetime('now')))`);
await client.execute(`CREATE INDEX IF NOT EXISTS idx_handoffs_open ON chat_handoffs (visitor_id, context, status)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS services (id TEXT PRIMARY KEY, title TEXT NOT NULL, price TEXT, description TEXT, features TEXT DEFAULT '[]', icon TEXT, image TEXT, sort_order INTEGER DEFAULT 0)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, title TEXT NOT NULL, url TEXT, client TEXT, description TEXT, tags TEXT DEFAULT '[]', image TEXT, featured INTEGER DEFAULT 0, sort_order INTEGER DEFAULT 0)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT, service TEXT, message TEXT, source TEXT, created_at TEXT DEFAULT (datetime('now')))`);
  await client.execute(`CREATE TABLE IF NOT EXISTS testimonials (id TEXT PRIMARY KEY, name TEXT, role TEXT, company TEXT, content TEXT, rating INTEGER DEFAULT 5, avatar TEXT, logo TEXT, sort_order INTEGER DEFAULT 0)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS quotes (id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT, service TEXT, budget TEXT, timeline TEXT, message TEXT, created_at TEXT DEFAULT (datetime('now')))`);
  await client.execute(`CREATE TABLE IF NOT EXISTS hero_slides (id TEXT PRIMARY KEY, title TEXT NOT NULL, subtitle TEXT DEFAULT '', image TEXT DEFAULT '', sort_order INTEGER DEFAULT 0)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS features (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', icon TEXT DEFAULT '✨', sort_order INTEGER DEFAULT 0)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS premium_features (id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT DEFAULT '', icon TEXT DEFAULT '✨', sort_order INTEGER DEFAULT 0)`);
  await client.execute(`CREATE TABLE IF NOT EXISTS blog_posts (id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, excerpt TEXT DEFAULT '', content TEXT DEFAULT '', image TEXT DEFAULT '', tags TEXT DEFAULT '[]', published INTEGER DEFAULT 1, created_at TEXT DEFAULT (datetime('now')))`);

  // Migration: add image column if missing
  try { await client.execute(`ALTER TABLE projects ADD COLUMN image TEXT`); } catch { /* column exists */ }

  // Migration: add image column to services if missing
  try { await client.execute(`ALTER TABLE services ADD COLUMN image TEXT`); } catch { /* column exists */ }

  // Migration: add logo column to testimonials if missing
  try { await client.execute(`ALTER TABLE testimonials ADD COLUMN logo TEXT`); } catch { /* column exists */ }

  // Seed settings (INSERT OR IGNORE — safe to run every time, adds any new default keys)
  await seedSettings();
  await seedHeroSlidesAndFeatures();

  // Seed admin with scrypt hash if empty
  const a = await client.execute("SELECT COUNT(*) as cnt FROM admins");
  if ((a.rows[0]?.cnt as number) === 0) {
    const { hashPassword } = await import('./auth');
    const hashed = await hashPassword('admin123');
    await client.execute("INSERT INTO admins (id,username,password_hash) VALUES (?,?,?)", [crypto.randomUUID(),'admin',hashed]);
  }
}

async function seedSettings() {
  const defaults: [string,string][] = [
    ['siteName','Nexus Web Lab'],
    ['tagline','Digital Solutions'],
    ['heroTitle','We Build Websites That Grow Your Business'],
    ['heroSubtitle','Nexus Web Lab delivers professional websites, apps, and digital solutions. From concept to deployment — we handle everything.'],
    ['heroCta','Start Your Project'],
    ['heroBadge','Available for new projects'],
    ['phone','09945598825'],
    ['email','info@nexusweblab.com'],
    ['address','No.189, Kha 6 Street, Insein, Yangon'],
    ['stat1Value','134+'],
    ['stat1Label','Projects Delivered'],
    ['stat2Value','129+'],
    ['stat2Label','Happy Clients'],
    ['stat3Value','98.9%'],
    ['stat3Label','Client Satisfaction'],
    ['stat4Value','24/7'],
    ['stat4Label','Support'],
    ['ctaTitle','Ready to Build Something Great?'],
    ['ctaSubtitle',"Let's discuss your project. Free consultation, no obligation."],
    ['ctaButton','Get Free Consultation'],
    ['aboutTitle','Who We Are'],
    ['aboutText','Nexus Web Lab is a Yangon-based digital solutions company founded by U Kaung Htut. We specialize in building modern, high-performance websites and web applications for businesses in Myanmar and beyond.'],
    ['footerDesc','Professional web development & digital solutions in Yangon, Myanmar.'],
    // Section headings (controllable from admin settings)
    ['heroSectionTitle','We Build Websites That Grow Your Business'],
    ['heroSectionSubtitle','Nexus Web Lab delivers professional websites, apps, and digital solutions. From concept to deployment — we handle everything.'],
    ['servicesTitle','What We Do'],
    ['servicesSubtitle','End-to-end digital services — from design to deployment.'],
    ['projectsTitle','Recent Work'],
    ['projectsSubtitle','Projects we delivered for our clients.'],
    ['whyTitle','Why Choose Nexus'],
    ['whySubtitle','We deliver results, not just promises.'],
    ['testimonialsTitle','What Clients Say'],
    ['testimonialsSubtitle','Trusted by businesses across multiple industries.'],
    ['heroViewPortfolio','View Portfolio'],
    ['ctaSecondary','Explore Services'],
    // Premium / site content (controllable from admin settings)
    ['marqueeTechs','Next.js, React, TypeScript, AI Integration, Tailwind CSS, Vercel, Node.js, PostgreSQL, Docker, GraphQL'],
    ['aboutTechs','Next.js, React, TypeScript, Tailwind CSS, Node.js, Vercel, Turso DB, OpenAI API, Framer Motion, Lucide Icons'],
    ['whyBullets','Free consultation, no obligation|Response within 24 hours|Custom solution for your budget|Yangon-based, available locally'],
    ['paymentMethods','KBZ Bank|AYA Bank|CB Bank|AYA Pay|KBZPay|CB Pay|Wave Pay|Bank transfer|PayPal'],
  ];
  for (const [k,v] of defaults) {
    await client.execute('INSERT OR IGNORE INTO settings (key,value) VALUES (?,?)', [k,v]);
  }

  // Seed initial testimonials with client logos
  const testimonialCount = await client.execute('SELECT COUNT(*) as cnt FROM testimonials');
  if ((testimonialCount.rows[0]?.cnt as number) === 0) {
    await client.execute(
      'INSERT OR REPLACE INTO testimonials (id, name, role, company, content, rating, avatar, logo, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
      ['t1', 'A9 Global Travels', 'Travel Agency', 'A9 Global', 'Nexus Web Lab delivered a premium travel website with 35+ pages. The admin panel makes managing tours, hotels, and bookings effortless.', 5, 'https://i.pravatar.cc/150?img=1', 'https://www.a9travel.com/favicon.ico', 1]
    );
    await client.execute(
      'INSERT OR REPLACE INTO testimonials (id, name, role, company, content, rating, avatar, logo, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
      ['t2', 'J Recruit Co., Ltd.', 'Recruitment Platform', 'J Recruit', 'Professional recruitment platform with job board and referral system. Clean code, fast delivery, excellent support.', 5, 'https://i.pravatar.cc/150?img=2', 'https://jrecruit-site.vercel.app/logo.svg', 2]
    );
    await client.execute(
      'INSERT OR REPLACE INTO testimonials (id, name, role, company, content, rating, avatar, logo, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
      ['t3', 'Stardust.co', 'E-Commerce', 'Stardust', 'Our e-commerce store with AI live chat exceeded expectations. Sales increased within the first month.', 5, 'https://i.pravatar.cc/150?img=3', 'https://stardust-co-eight.vercel.app/logo.svg', 3]
    );
  }

  // Seed hero slides if empty
  await seedHeroSlidesAndFeatures();
}

async function seedHeroSlidesAndFeatures() {
  const slideCount = await client.execute('SELECT COUNT(*) as cnt FROM hero_slides');
  if ((slideCount.rows[0]?.cnt as number) === 0) {
    const slides = [
      ['hs1', 'Nexus Web Lab — Custom Web Development', 'Modern websites built with Next.js & React', '/images/hero/slide-webdev.jpg', 1],
      ['hs2', 'Nexus Web Lab — AI-Powered Solutions', 'Chatbots, automation & intelligent apps', '/images/hero/slide-ai.jpg', 2],
      ['hs3', 'Nexus Web Lab — E-Commerce Experts', 'Online stores that convert visitors to customers', '/images/hero/slide-ecom.jpg', 3],
    ];
    for (const [id, title, subtitle, image, sort_order] of slides) {
      await client.execute('INSERT OR REPLACE INTO hero_slides (id,title,subtitle,image,sort_order) VALUES (?,?,?,?,?)', [id, title, subtitle, image, sort_order]);
    }
  }

  // Seed premium features if empty
  const premiumCount = await client.execute('SELECT COUNT(*) as cnt FROM premium_features');
  if ((premiumCount.rows[0]?.cnt as number) === 0) {
    const premiums = [
      ['pf1', 'Custom E-Commerce / AI Web App', 'Online stores, AI-powered apps, and custom platforms built around your exact business needs.', '🛒', 1],
      ['pf2', 'Full Admin Dashboard', 'Manage products, services, content, leads, and settings from your own private control panel.', '📊', 2],
      ['pf3', 'Payment Gateway Integration', 'Accept KBZPay, AYA Pay, Wave, bank transfer, or international gateways — securely integrated.', '💳', 3],
      ['pf4', 'AI Chatbot / Smart Features', '24/7 AI assistant, smart search, and automation built into your website to capture every lead.', '🤖', 4],
      ['pf5', 'Priority Support', 'You get fast, direct support — we respond within 24 hours, every time.', '🎧', 5],
      ['pf6', 'Unlimited Revisions', 'We keep refining until you are 100% happy. No extra charges, no limits.', '♾️', 6],
    ];
    for (const [id, title, description, icon, sort_order] of premiums) {
      await client.execute('INSERT OR REPLACE INTO premium_features (id,title,description,icon,sort_order) VALUES (?,?,?,?,?)', [id, title, description, icon, sort_order]);
    }
  }

  // Seed features if empty
  const featureCount = await client.execute('SELECT COUNT(*) as cnt FROM features');
  if ((featureCount.rows[0]?.cnt as number) === 0) {
    const features = [
      ['f1', 'Quality Code', 'Clean, type-safe code with TypeScript and modern frameworks.', '✅', 1],
      ['f2', 'Fast Delivery', 'Quick turnaround without compromising quality.', '⚡', 2],
      ['f3', 'Client First', 'Your satisfaction is our priority. Free revisions included.', '⭐', 3],
      ['f4', 'Modern Tech', 'Next.js, AI integration, and cutting-edge tools.', '✨', 4],
    ];
    for (const [id, title, description, icon, sort_order] of features) {
      await client.execute('INSERT OR REPLACE INTO features (id,title,description,icon,sort_order) VALUES (?,?,?,?,?)', [id, title, description, icon, sort_order]);
    }
  }
}

async function ensureInit() { if (!initPromise) initPromise = init(); await initPromise; }

export function getDb() { return client; }

/**
 * Read-only query that SKIPS the 30+ CREATE/ALTER/seed round-trips in init().
 * Safe for public pages: the production DB is already migrated/seeded, and
 * callers wrap these in fallbacks. On a cold lambda this is the difference
 * between ~14s and ~0.5s first load.
 */
export async function dbAllRead(sql: string, args?: any[]) {
  const rs = args ? await client.execute({ sql, args }) : await client.execute(sql);
  return rs.rows;
}

export async function dbGetRead(sql: string, args?: any[]) {
  const rs = args ? await client.execute({ sql, args }) : await client.execute(sql);
  return rs.rows[0];
}

export async function dbAll(sql: string, args?: any[]) {
  await ensureInit();
  const rs = args ? await client.execute({ sql, args }) : await client.execute(sql);
  return rs.rows;
}

export async function dbGet(sql: string, args?: any[]) {
  await ensureInit();
  const rs = args ? await client.execute({ sql, args }) : await client.execute(sql);
  return rs.rows[0];
}

export async function dbRun(sql: string, args?: any[]) {
  await ensureInit();
  await (args ? client.execute({ sql, args }) : client.execute(sql));
}
