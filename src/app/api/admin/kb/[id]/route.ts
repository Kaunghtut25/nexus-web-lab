import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "../../auth-guard";
import { dbRun } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// DELETE /api/admin/kb/[id] — remove a knowledge base entry
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAuth(req);
  if (auth instanceof NextResponse) return auth;
  try {
    const { id } = await params;
    await dbRun("DELETE FROM kb_entries WHERE id = ?", [id]);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e).slice(0, 200) }, { status: 500 });
  }
}
