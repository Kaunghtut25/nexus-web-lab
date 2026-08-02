// Nexus Web Lab — API proxy
// Forwards /api/* requests to the local Nexus Bridge via Cloudflare Tunnel.
// Target base comes from Vercel env NEXUS_TUNNEL_URL (e.g. https://xxx.trycloudflare.com)
const { Buffer } = require('node:buffer');

module.exports = async function handler(req, res) {
  try {
    const tunnel = process.env.NEXUS_TUNNEL_URL;
    if (!tunnel) {
      res.status(500).json({ ok: false, error: 'NEXUS_TUNNEL_URL is not configured' });
      return;
    }
    const parts = req.query.path || [];
    const path = Array.isArray(parts) ? parts.join('/') : String(parts);
    const target = new URL(tunnel.replace(/\/+$/, '') + '/api/' + path);

    // forward query string
    const qs = new URL(req.url, 'http://localhost').searchParams;
    qs.forEach((value, key) => target.searchParams.append(key, value));

    // forward relevant headers
    const headers = {};
    ['content-type', 'authorization', 'accept', 'x-nexus-token', 'x-api-key'].forEach((h) => {
      const v = req.headers[h];
      if (v) headers[h] = v;
    });

    const body = await new Promise((resolve) => {
      const chunks = [];
      req.on('data', (c) => chunks.push(c));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', () => resolve(Buffer.alloc(0)));
    });

    const upstream = await fetch(target, {
      method: req.method,
      headers,
      body: (req.method === 'GET' || req.method === 'HEAD') ? undefined : body,
      redirect: 'follow',
    });

    const text = await upstream.text();
    const ct = upstream.headers.get('content-type');
    if (ct) res.setHeader('content-type', ct);
    res.status(upstream.status).send(text);
  } catch (err) {
    res.status(502).json({ ok: false, error: String((err && err.message) || err) });
  }
};