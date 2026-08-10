// Build prefill hrefs for Contact / Get a Quote forms.
// When a client clicks "Get Started" or "Get a Free Quote" on any page,
// we pass what they saw/checked (service, package, price, features, source)
// as URL params so the target form's message box is pre-filled.

type PrefillOpts = {
  service?: string;
  pkg?: string;
  price?: string;
  features?: string[];
  source?: string;
};

export function prefillHref(base: string, o: PrefillOpts): string {
  const lines: string[] = [];
  if (o.service) lines.push(`Service: ${o.service}`);
  if (o.pkg) lines.push(`Package: ${o.pkg}`);
  if (o.price) lines.push(`Price: ${o.price}`);
  if (o.features && o.features.length) {
    lines.push(`Interested features:\n- ${o.features.join("\n- ")}`);
  }
  if (o.source) lines.push(`Source: ${o.source}`);

  const q = new URLSearchParams();
  if (o.service) q.set("svc", o.service);
  q.set("msg", lines.join("\n"));
  return `${base}?${q.toString()}`;
}
