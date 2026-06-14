import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, createServerSupabaseClient } from "@/lib/modules/supabase/server";


async function verifyAdmin() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.email === process.env.ADMIN_EMAIL ? user : null;
}

export async function GET() {
  const db = createServiceClient();
  const [slides, content] = await Promise.all([
    db.from("hero_slides").select("*").order("sort_order"),
    db.from("hero_content").select("*").single(),
  ]);
  if (slides.error) {
		console.error("GET /api/admin/hero - slides error:", slides.error);
		return NextResponse.json({ error: slides.error.message }, { status: 500 });
	}

	// .single() errors if there are 0 rows or >1 rows — treat "0 rows" as null content, not a failure
	if (content.error && content.error.code !== "PGRST116") {
		console.error("GET /api/admin/hero - content error:", content.error);
		return NextResponse.json({ error: content.error.message }, { status: 500 });
	}
  
  return NextResponse.json({ slides: slides.data, content: content.data });
}

export async function PUT(req: NextRequest) {
  if (!await verifyAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const db = createServiceClient();

  if (body.type === "content") {
    const { error } = await db
      .from("hero_content")
      .update({ heading: body.heading, subtext: body.subtext, updated_at: new Date().toISOString() })
      .eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (body.type === "slide") {
    const { error } = await db
      .from("hero_slides")
      .update({ video_url: body.video_url, poster_url: body.poster_url, sort_order: body.sort_order, is_active: body.is_active, updated_at: new Date().toISOString() })
      .eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (body.type === "new_slide") {
    const { error } = await db.from("hero_slides").insert({ video_url: body.video_url, poster_url: body.poster_url, sort_order: body.sort_order });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (body.type === "delete_slide") {
    const { error } = await db.from("hero_slides").delete().eq("id", body.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}