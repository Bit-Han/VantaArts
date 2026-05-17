// ─── Raw database row types ───────────────────────────────────────────────────
// These match the column names in your Supabase tables exactly.

export interface SiteSettingRow {
	id: string;
	key: string;
	value: string;
	updated_at: string;
}

export interface HeroSlideRow {
	id: string;
	video_url: string;
	poster_url: string;
	sort_order: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface HeroContentRow {
	id: string;
	heading: string;
	subtext: string;
	updated_at: string;
}

export interface AboutSectionRow {
	id: string;
	eyebrow: string;
	heading: string;
	paragraph_1: string;
	paragraph_2: string | null;
	paragraph_3: string | null;
	image_url: string;
	updated_at: string;
}

export interface CategoryRow {
	id: string;
	key: string;
	slug: string;
	image_url: string;
	title: string;
	subtitle: string;
	sort_order: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface FeaturedWorkRow {
	id: string;
	category: string;
	title: string;
	description: string;
	image_url: string;
	link: string;
	sort_order: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface TestimonialRow {
	id: string;
	name: string;
	role: string;
	quote: string;
	rating: number;
	sort_order: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface ServiceRow {
	id: string;
	slug: string;
	title: string;
	tagline: string;
	description: string;
	long_description: string;
	hero_image_url: string;
	sort_order: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface ServiceDetailRow {
	id: string;
	service_id: string;
	icon: string;
	text: string;
	sort_order: number;
}

export interface ServicePricingRow {
	id: string;
	service_id: string;
	name: string;
	price: string;
	note: string | null;
	sort_order: number;
}

export interface GalleryItemRow {
	id: string;
	image_url: string;
	category: "inks" | "canvas" | "walls";
	title: string;
	sort_order: number;
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

// ─── Composed / transformed types used by frontend components ─────────────────

export interface ServiceWithRelations {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	longDescription: string;
	heroImage: string;
	details: Pick<ServiceDetailRow, "icon" | "text">[];
	pricing: Pick<ServicePricingRow, "name" | "price" | "note">[];
}

export interface GalleryItem {
	id: string;
	image: string;
	category: "inks" | "canvas" | "walls";
	title: string;
}

// ─── Admin-only composed type (includes id for updates) ───────────────────────

export interface ServiceWithRelationsAdmin {
	id: string;
	slug: string;
	title: string;
	tagline: string;
	description: string;
	long_description: string;
	hero_image_url: string;
	sort_order: number;
	is_active: boolean;
	details: Pick<ServiceDetailRow, "icon" | "text">[];
	pricing: Pick<ServicePricingRow, "name" | "price" | "note">[];
}
