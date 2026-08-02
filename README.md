# Nexus Web Lab

Nexus AI hosted on Vercel. The frontend talks to **your PC's local Nexus Bridge** through a
Cloudflare Tunnel, so the AI brain (OpenClaw Gateway on :18789) stays on your machine.

## Architecture

```
Browser (nexus-web-lab.vercel.app)
  -> /api/*  (Vercel serverless proxy, api/[...path].js)
  -> https://<tunnel>.trycloudflare.com  (cloudflared, runs on your PC)
  -> Nexus Bridge 127.0.0.1:8020  (uvicorn main.py)
  -> OpenClaw Gateway ws://127.0.0.1:18789
```

## Setup on the PC (backend side)

1. Start the Nexus Bridge:
   `cd ua-agent\nexus-bridge && python -m uvicorn main:app --host 127.0.0.1 --port 8020`
2. Start the tunnel:
   `cloudflared tunnel --url http://127.0.0.1:8020`
   -> gives you `https://<random>.trycloudflare.com`
3. Update the Vercel env var so the proxy knows where to forward:
   `vercel env add NEXUS_TUNNEL_URL production` -> paste the tunnel URL
   `vercel --prod`

## Deploy (after pushing to GitHub)

```
vercel link --project nexus-web-lab --scope kk-darklight
vercel --prod
```

## Limitations

- The free trycloudflare URL changes every time the tunnel restarts ->
  update `NEXUS_TUNNEL_URL` and redeploy.
- Vercel Hobby functions cap at 60s per request.
- The tunnel is public: anyone with the URL can call the bridge
  (chat endpoints use login; add a shared-secret header for production).
