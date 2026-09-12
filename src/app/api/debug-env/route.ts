import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? 'set' : 'MISSING',
    ZEN_API_KEY: process.env.ZEN_API_KEY ? 'set' : 'MISSING',
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY ? 'set' : 'MISSING',
  });
}
