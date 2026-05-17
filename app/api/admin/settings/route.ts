import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, createServerSupabaseClient } from "@/lib/modules/supabase/server";

async function verifyAdmin() {
	const supabase = await createServerSupabaseClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user?.email === process.env.ADMIN_EMAIL ? user : null;
}

export async function GET() {
	const db = createServiceClient();
	const { data } = await db.from("site_settings").select("*");
	// Transform array to key-value object
	const settings = Object.fromEntries(
		(data || []).map((s) => [s.key, s.value]),
	);
	return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
	if (!(await verifyAdmin()))
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const body = await req.json();
	const db = createServiceClient();
	// body is { key: value, key: value, ... }
	const updates = Object.entries(body).map(([key, value]) =>
		db
			.from("site_settings")
			.upsert(
				{ key, value: String(value), updated_at: new Date().toISOString() },
				{ onConflict: "key" },
			),
	);
	await Promise.all(updates);
	return NextResponse.json({ success: true });
}
