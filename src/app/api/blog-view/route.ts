import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { slug?: string } | null;
  const slug = body?.slug;

  if (!slug) {
    return NextResponse.json({ ok: false, error: 'slug is required' }, { status: 400 });
  }

  const strapiUrl = env.strapiUrl;
  if (!strapiUrl) {
    return NextResponse.json({ ok: false, error: 'STRAPI_URL is missing' }, { status: 500 });
  }

  const token = env.strapiToken;
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'User-Agent': userAgent,
  };

  if (ip) headers['X-Forwarded-For'] = ip;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${strapiUrl}/api/public/blog-posts/${encodeURIComponent(slug)}/view`, {
    method: 'POST',
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: 'view update failed' }, { status: response.status });
  }

  const data = (await response.json()) as { data?: { views?: number; unique?: boolean } };
  return NextResponse.json({ ok: true, data: data.data ?? null });
}
