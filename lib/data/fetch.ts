import { createServiceClient } from "@/lib/modules/supabase/server";

// ─── Settings ────────────────────────────────────────────────────────────────
import type {
  SiteSettingRow,
  HeroSlideRow,
  HeroContentRow,
  AboutSectionRow,
  CategoryRow,
  FeaturedWorkRow,
  TestimonialRow,
  ServiceRow,
  ServiceDetailRow,
  ServicePricingRow,
  GalleryItemRow,
  ServiceWithRelations,
  GalleryItem,
} from "@/lib/types/database";

// ─── Settings ─────────────────────────────────────────────────────────────────
export async function getSettings(): Promise<Record<string, string>> {
  const db = createServiceClient();
  const { data } = await db.from("site_settings").select("*");
  const rows = (data ?? []) as SiteSettingRow[];
  return Object.fromEntries(rows.map((s) => [s.key, s.value]));
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export async function getHeroData(): Promise<{
  slides: HeroSlideRow[];
  content: HeroContentRow | null;
}> {
  const db = createServiceClient();
  const [slidesResult, contentResult] = await Promise.all([
    db
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order"),
    db.from("hero_content").select("*").single(),
  ]);

  return {
    slides: (slidesResult.data ?? []) as HeroSlideRow[],
    content: (contentResult.data ?? null) as HeroContentRow | null,
  };
}

// ─── About ────────────────────────────────────────────────────────────────────
export async function getAboutSection(): Promise<AboutSectionRow | null> {
  const db = createServiceClient();
  const { data } = await db.from("about_section").select("*").single();
  return (data ?? null) as AboutSectionRow | null;
}

// ─── Categories ───────────────────────────────────────────────────────────────
export async function getCategories(): Promise<CategoryRow[]> {
  const db = createServiceClient();
  const { data } = await db
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return (data ?? []) as CategoryRow[];
}

// ─── Featured Works ───────────────────────────────────────────────────────────
export async function getFeaturedWorks(): Promise<FeaturedWorkRow[]> {
  const db = createServiceClient();
  const { data } = await db
    .from("featured_works")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return (data ?? []) as FeaturedWorkRow[];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<TestimonialRow[]> {
  const db = createServiceClient();
  const { data } = await db
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return (data ?? []) as TestimonialRow[];
}

// ─── Services ─────────────────────────────────────────────────────────────────
export async function getServices(): Promise<ServiceWithRelations[]> {
  const db = createServiceClient();
  const [servicesResult, detailsResult, pricingResult] = await Promise.all([
    db
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order"),
    db.from("service_details").select("*").order("sort_order"),
    db.from("service_pricing").select("*").order("sort_order"),
  ]);

  const services = (servicesResult.data ?? []) as ServiceRow[];
  const details = (detailsResult.data ?? []) as ServiceDetailRow[];
  const pricing = (pricingResult.data ?? []) as ServicePricingRow[];

  return services.map((s) => ({
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    longDescription: s.long_description,
    heroImage: s.hero_image_url,
    details: details
      .filter((d) => d.service_id === s.id)
      .map((d) => ({ icon: d.icon, text: d.text })),
    pricing: pricing
      .filter((p) => p.service_id === s.id)
      .map((p) => ({ name: p.name, price: p.price, note: p.note })),
  }));
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceWithRelations | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const db = createServiceClient();
  const { data } = await db
    .from("gallery_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  const rows = (data ?? []) as GalleryItemRow[];
  return rows.map((item) => ({
    id: item.id,
    image: item.image_url,
    category: item.category,
    title: item.title,
  }));
}