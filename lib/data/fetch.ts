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
	ProjectRow,
	ProjectPricingRow,
	ProjectWithRelations,
} from "@/lib/types/database";

// ─── Settings ─────────────────────────────────────────────────────────────────
export async function getSettings(): Promise<Record<string, string>> {
  const db = createServiceClient();
  const { data, error } = await db.from("site_settings").select("*");
  if (error) {
    console.error("Error fetching site settings:", error);
  }
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
  const { data, error } = await db.from("about_section").select("*").single();
  if (error) {
    console.error("Error fetching about section:", error);
  }
  return (data ?? null) as AboutSectionRow | null;
}

// ─── Categories ───────────────────────────────────────────────────────────────
export async function getCategories(): Promise<CategoryRow[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) {
    console.error("Error fetching categories:", error);
  }
  return (data ?? []) as CategoryRow[];
}

// ─── Featured Works ───────────────────────────────────────────────────────────
export async function getFeaturedWorks(): Promise<FeaturedWorkRow[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("featured_works")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) {
    console.error("Error fetching featured works:", error);
  }
  return (data ?? []) as FeaturedWorkRow[];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<TestimonialRow[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) {
    console.error("Error fetching testimonials:", error);
  }
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
  const { data, error } = await db
    .from("gallery_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

    if (error) {
      console.error("Error fetching gallery items:", error);
    }
  const rows = (data ?? []) as GalleryItemRow[];
  return rows.map((item) => ({
    id: item.id,
    image: item.image_url,
    category: item.category,
    title: item.title,
  }));
}


// ─── Projects ──────────────────────────────────────────────────────────────
export async function getFeaturedProjects(): Promise<ProjectRow[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order")
    .limit(3);

  if (error) console.error("getFeaturedProjects error:", error);
  return (data ?? []) as ProjectRow[];
}

export async function getProjectBySlug(
  category: string,
  slug: string
): Promise<ProjectWithRelations | null> {
  const db = createServiceClient();

  const { data: project, error } = await db
    .from("projects")
    .select("*")
    .eq("category", category)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !project) {
    if (error) console.error("getProjectBySlug error:", error);
    return null;
  }

  const [pricingResult, galleryResult] = await Promise.all([
    db.from("project_pricing").select("*").eq("project_id", project.id).order("sort_order"),
    db.from("gallery_items").select("*").eq("project_id", project.id).order("sort_order"),
  ]);

  if (pricingResult.error) console.error("getProjectBySlug pricing error:", pricingResult.error);
  if (galleryResult.error) console.error("getProjectBySlug gallery error:", galleryResult.error);

  return {
    ...(project as ProjectRow),
    pricing: (pricingResult.data ?? []) as ProjectPricingRow[],
    gallery: (galleryResult.data ?? []) as GalleryItemRow[],
  };
}

// ─── Projects by Category ─────────────────────────────────────────────────
export async function getProjectsByCategory(
  category: string
): Promise<ProjectRow[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("category", category)
    .eq("is_active", true)
    .order("sort_order");

  if (error) console.error("getProjectsByCategory error:", error);
  return (data ?? []) as ProjectRow[];
}

// ─── All Projects (for Featured Works) ───────────────────────────────────
export async function getAllProjects(): Promise<ProjectRow[]> {
  const db = createServiceClient();
  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) console.error("getAllProjects error:", error);
  return (data ?? []) as ProjectRow[];
}