import { NextRequest, NextResponse } from "next/server";
import {
	createServiceClient,
	createServerSupabaseClient,
} from "@/lib/modules/supabase/server";


async function verifyAdmin() {
	const supabase = await createServerSupabaseClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user?.email === process.env.ADMIN_EMAIL ? user : null;
}

export async function GET() {
	const db = createServiceClient();
	const { data } = await db
		.from("gallery_items")
		.select("*")
		.order("sort_order");
	return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
	if (!(await verifyAdmin()))
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const body = await req.json();
	const db = createServiceClient();
	const { error } = await db.from("gallery_items").insert(body);
	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
	if (!(await verifyAdmin()))
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const body = await req.json();
	const db = createServiceClient();
	const { error } = await db
		.from("gallery_items")
		.update({
			title: body.title,
			category: body.category,
			image_url: body.image_url,
			sort_order: body.sort_order,
			updated_at: new Date().toISOString(),
		})
		.eq("id", body.id);
	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
	if (!(await verifyAdmin()))
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const { id } = await req.json();
	const db = createServiceClient();
	const { error } = await db.from("gallery_items").delete().eq("id", id);
	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}
