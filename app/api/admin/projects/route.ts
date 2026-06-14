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

	const [projectsResult, pricingResult] = await Promise.all([
		db.from("projects").select("*").order("sort_order"),
		db.from("project_pricing").select("*").order("sort_order"),
	]);

	if (projectsResult.error) {
		console.error("GET /api/admin/projects error:", projectsResult.error);
		return NextResponse.json(
			{ error: projectsResult.error.message },
			{ status: 500 },
		);
	}
	if (pricingResult.error) {
		console.error(
			"GET /api/admin/projects pricing error:",
			pricingResult.error,
		);
		return NextResponse.json(
			{ error: pricingResult.error.message },
			{ status: 500 },
		);
	}

	const projects = projectsResult.data ?? [];
	const pricing = pricingResult.data ?? [];

	const combined = projects.map((p) => ({
		...p,
		pricing: pricing.filter((pr) => pr.project_id === p.id),
	}));

	return NextResponse.json(combined);
}

export async function POST(req: NextRequest) {
	if (!(await verifyAdmin())) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const db = createServiceClient();

	const { data, error } = await db
		.from("projects")
		.insert({
			slug: body.slug,
			title: body.title,
			category: body.category,
			description: body.description,
			featured_image_url: body.featured_image_url,
			is_featured: body.is_featured ?? false,
			sort_order: body.sort_order ?? 0,
			is_active: body.is_active ?? true,
		})
		.select()
		.single();

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
	if (!(await verifyAdmin())) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const db = createServiceClient();

	const { error } = await db
		.from("projects")
		.update({
			title: body.title,
			slug: body.slug,
			category: body.category,
			description: body.description,
			featured_image_url: body.featured_image_url,
			is_featured: body.is_featured,
			sort_order: body.sort_order,
			is_active: body.is_active,
			updated_at: new Date().toISOString(),
		})
		.eq("id", body.id);

	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });

	// Replace pricing rows for this project
	await db.from("project_pricing").delete().eq("project_id", body.id);

	if (body.pricing?.length > 0) {
		const rows = body.pricing.map(
			(p: { name: string; price: string; note: string | null }, i: number) => ({
				project_id: body.id,
				name: p.name,
				price: p.price,
				note: p.note ?? null,
				sort_order: i,
			}),
		);
		const { error: pricingError } = await db
			.from("project_pricing")
			.insert(rows);
		if (pricingError)
			return NextResponse.json(
				{ error: pricingError.message },
				{ status: 500 },
			);
	}

	return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
	if (!(await verifyAdmin())) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { id } = await req.json();
	const db = createServiceClient();
	const { error } = await db.from("projects").delete().eq("id", id);
	if (error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	return NextResponse.json({ success: true });
}
