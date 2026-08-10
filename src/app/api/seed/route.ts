import { NextRequest, NextResponse } from 'next/server';
import { dbRun } from '@/lib/db';
import { requireAuth } from '../admin/auth-guard';

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    // Delete all existing testimonials
    await dbRun('DELETE FROM testimonials');

    const testimonials = [
      { id: "t1", name: "A9 Global Travels", role: "Travel Agency", company: "A9 Global", content: "Nexus Web Lab delivered a premium travel website with 35+ pages. The admin panel makes managing tours, hotels, and bookings effortless.", rating: 5, avatar: "", logo: "/a9-logo.jpeg", sort_order: 1 },
      { id: "t2", name: "J Recruit Co., Ltd.", role: "Recruitment Platform", company: "J Recruit", content: "Professional recruitment platform with job board and referral system. Clean code, fast delivery, excellent support.", rating: 5, avatar: "", logo: "https://jrecruit-site.vercel.app/logo.svg", sort_order: 2 },
      { id: "t3", name: "Stardust.co", role: "E-Commerce", company: "Stardust", content: "Our e-commerce store with AI live chat exceeded expectations. Sales increased within the first month.", rating: 5, avatar: "", logo: "https://stardust-co-eight.vercel.app/logo.svg", sort_order: 3 },
      { id: "t4", name: "The SPACE Traveller", role: "Travel & Booking Platform", company: "SPACE Traveller", content: "A modern booking platform for flights, stays and tours. Clean architecture and a smooth user experience from search to checkout.", rating: 5, avatar: "", logo: "/space-logo.jpg", sort_order: 4 },
      { id: "t5", name: "Azami Training Center", role: "Education & Training", company: "Azami", content: "Azami Training Center needed a bilingual education platform. Nexus delivered course listings, job board and a full admin panel.", rating: 5, avatar: "", logo: "https://azami-training-center.vercel.app/logo.svg", sort_order: 5 },
      { id: "t6", name: "Nexus AI Chatbot", role: "AI Product", company: "Nexus", content: "Our own AI chatbot product powering lead capture and instant support across client websites.", rating: 5, avatar: "", logo: "/logo.png", sort_order: 6 }
    ];

    for (const testimonial of testimonials) {
      await dbRun(
        'INSERT OR REPLACE INTO testimonials (id, name, role, company, content, rating, avatar, logo, sort_order) VALUES (?,?,?,?,?,?,?,?,?)',
        [testimonial.id, testimonial.name, testimonial.role, testimonial.company, testimonial.content, testimonial.rating, testimonial.avatar, testimonial.logo, testimonial.sort_order]
      );
    }

    return NextResponse.json({ success: true, count: testimonials.length });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to seed database' }, { status: 500 });
  }
}
