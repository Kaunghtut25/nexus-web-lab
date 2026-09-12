// Dependency-free Markdown -> HTML renderer for blog article bodies.
//
// Post content is authored in the admin editor as light Markdown / plain text.
// Before this module the page rendered `post.content` inside a
// `whitespace-pre-wrap` div, so `#`, `##` and `-` markers were shown to readers
// literally and the article text only existed in the client bundle.
//
// Supported subset (matches what the published posts actually use):
//   # / ## / ###       headings (# -> h2, deeper -> h3, so a page keeps one h1)
//   - / * / •          bullet list items
//   1. 2. 3.           ordered list items
//   ALL CAPS text line  section heading (h2), e.g. "WHAT IT COSTS"
//   **bold**, [text](url), bare https:// URLs
//
// Security: every source line is HTML-escaped before anything is emitted, so
// raw HTML in a post is displayed as text and cannot be injected. Only the tags
// this file writes can reach the DOM.

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPES[c] ?? c);
}

/** Section heading written in caps, optionally numbered ("2. MOBILE-FIRST DESIGN"). */
const CAPS_HEADING = /^(?:\d+\.\s+)?[A-Z0-9][A-Z0-9 &/'’\-.,:()/]+$/;
const MD_HEADING = /^(#{1,6})\s+(.*\S)\s*$/;
const UL_ITEM = /^[-*•]\s+(.*\S)\s*$/;
const OL_ITEM = /^\d+\.\s+(.*\S)\s*$/;

function isCapsHeading(line: string): boolean {
  if (line.length < 5 || line.length > 90) return false;
  if (!CAPS_HEADING.test(line)) return false;
  return /[A-Z]/.test(line); // must contain letters, not just punctuation/digits
}

function inline(raw: string): string {
  // Split links out of the raw text first so escaping never touches generated markup.
  const parts: string[] = [];
  const links = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<)]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = links.exec(raw)) !== null) {
    parts.push(esc(raw.slice(last, m.index)));
    if (m[1] !== undefined) {
      parts.push(`<a href="${esc(m[2])}" rel="noopener noreferrer">${esc(m[1])}</a>`);
    } else {
      parts.push(`<a href="${esc(m[3])}" rel="noopener noreferrer">${esc(m[3])}</a>`);
    }
    last = m.index + m[0].length;
  }
  parts.push(esc(raw.slice(last)));
  return parts.join('').replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
}

/** Render post body Markdown to safe HTML. */
export function renderMarkdown(source: string): string {
  const lines = (source || '').replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let listTag: 'ul' | 'ol' | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  };
  const closeList = () => {
    if (listTag) {
      out.push(`</${listTag}>`);
      listTag = null;
    }
  };
  const openList = (tag: 'ul' | 'ol') => {
    if (listTag !== tag) {
      closeList();
      out.push(`<${tag}>`);
      listTag = tag;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      closeList();
      continue;
    }

    const md = MD_HEADING.exec(line);
    if (md) {
      flushParagraph();
      closeList();
      const level = md[1].length === 1 ? 2 : 3;
      out.push(`<h${level}>${inline(md[2])}</h${level}>`);
      continue;
    }

    const bullet = UL_ITEM.exec(line);
    if (bullet) {
      flushParagraph();
      openList('ul');
      out.push(`<li>${inline(bullet[1])}</li>`);
      continue;
    }

    const ordered = OL_ITEM.exec(line);
    if (ordered && !isCapsHeading(line)) {
      flushParagraph();
      openList('ol');
      out.push(`<li>${inline(ordered[1])}</li>`);
      continue;
    }

    if (isCapsHeading(line)) {
      flushParagraph();
      closeList();
      out.push(`<h2>${inline(line)}</h2>`);
      continue;
    }

    closeList();
    paragraph.push(line);
  }

  flushParagraph();
  closeList();
  return out.join('\n');
}
