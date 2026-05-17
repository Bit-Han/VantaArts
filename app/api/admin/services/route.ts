import { NextRequest, NextResponse } from "next/server";
import { createServiceClient, createServerSupabaseClient } from "@/lib/modules/supabase/server";
import type {
	ServiceRow,
	ServiceDetailRow,
	ServicePricingRow,
	ServiceWithRelationsAdmin,
} from "@/lib/types/database";

// ─── Types for the request body ───────────────────────────────────────────────
interface ServiceUpdateBody {
  id: string;
  title: string;
  tagline: string;
  description: string;
  long_description: string;
  hero_image_url: string;
  details: Pick<ServiceDetailRow, "icon" | "text">[];
  pricing: Pick<ServicePricingRow, "name" | "price" | "note">[];
}

async function verifyAdmin(): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.email === process.env.ADMIN_EMAIL;
}

export async function GET(): Promise<NextResponse> {
  const db = createServiceClient();
  const [servicesResult, detailsResult, pricingResult] = await Promise.all([
    db.from("services").select("*").order("sort_order"),
    db.from("service_details").select("*").order("sort_order"),
    db.from("service_pricing").select("*").order("sort_order"),
  ]);

  const services = (servicesResult.data ?? []) as ServiceRow[];
  const details = (detailsResult.data ?? []) as ServiceDetailRow[];
  const pricing = (pricingResult.data ?? []) as ServicePricingRow[];

  const combined: ServiceWithRelationsAdmin[] = services.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    long_description: s.long_description,
    hero_image_url: s.hero_image_url,
    sort_order: s.sort_order,
    is_active: s.is_active,
    details: details
      .filter((d) => d.service_id === s.id)
      .map((d) => ({ icon: d.icon, text: d.text })),
    pricing: pricing
      .filter((p) => p.service_id === s.id)
      .map((p) => ({ name: p.name, price: p.price, note: p.note })),
  }));

  return NextResponse.json(combined);
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: ServiceUpdateBody = await req.json();
  const db = createServiceClient();

  // Update core service fields
  const { error } = await db
    .from("services")
    .update({
      title: body.title,
      tagline: body.tagline,
      description: body.description,
      long_description: body.long_description,
      hero_image_url: body.hero_image_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", body.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Replace details — delete old rows then insert new ones
  await db.from("service_details").delete().eq("service_id", body.id);

  if (body.details.length > 0) {
    const detailRows: Omit<ServiceDetailRow, "id">[] = body.details.map(
      (d, i) => ({
        service_id: body.id,
        icon: d.icon,
        text: d.text,
        sort_order: i,
      })
    );
    await db.from("service_details").insert(detailRows);
  }

  // Replace pricing — delete old rows then insert new ones
  await db.from("service_pricing").delete().eq("service_id", body.id);

  if (body.pricing.length > 0) {
    const pricingRows: Omit<ServicePricingRow, "id">[] = body.pricing.map(
      (p, i) => ({
        service_id: body.id,
        name: p.name,
        price: p.price,
        note: p.note ?? null,
        sort_order: i,
      })
    );
    await db.from("service_pricing").insert(pricingRows);
  }

  return NextResponse.json({ success: true });
}