export interface Project {
	id: string;
	title: string;
	category: "face-painting" | "body-painting" | "special-effects";
	description: string;
	heroImage: string;
	galleryImages: string[];
	featured: boolean;
	createdAt: string;
}

export interface Testimonial {
	id: string;
	name: string;
	role: string;
	quote: string;
	rating: number;
}

export interface ServiceInfo {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	longDescription: string;
	heroImage: string;
	pricing: PricingTier[];
	details: ServiceDetail[];
}

export interface PricingTier {
	name: string;
	price: string;
	note?: string;
}

export interface ServiceDetail {
	icon: string;
	text: string;
}
