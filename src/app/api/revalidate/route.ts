import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { secret?: string; tags?: string[] }
    | null;

  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'REVALIDATE_SECRET is missing' }, { status: 500 });
  }

  if (!body?.secret || body.secret !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const tags = Array.isArray(body.tags) ? body.tags.filter(Boolean) : [];
  if (!tags.length) {
    return NextResponse.json({ ok: false, error: 'No tags provided' }, { status: 400 });
  }

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ ok: true, revalidated: tags });
}
