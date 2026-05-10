import type { ServiceInfo, Testimonial } from "@/lib/types";

export const WHATSAPP_NUMBER = "2348094221721";
export const WHATSAPP_MESSAGE =
	"Hi! I'm interested in booking a session with Posh & Painted.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const NAV_LINKS = [
	{ label: "Portfolio", href: "/portfolio" },
	{ label: "Services", href: "/services/face-painting" },
	{ label: "About", href: "/#about" },
	{ label: "Book Now", href: WHATSAPP_URL, external: true },
];

export const CATEGORY_IMAGES: Record<
	string,
	{ image: string; title: string; subtitle: string }
> = {
	"face-painting": {
		image: "/assets/cat-face-paint.jpg",
		title: "Face Painting",
		subtitle: "From whimsical designs to intricate artistry",
	},
	"body-painting": {
		image: "/assets/cat-body-paint.jpg",
		title: "Body Painting",
		subtitle: "Full-body transformations for any occasion",
	},
	"special-effects": {
		image: "/assets/cat-sfx-makeup.jpg",
		title: "Special Effects",
		subtitle: "Cinema-quality prosthetics & character design",
	},
};

export const SERVICES: ServiceInfo[] = [
	{
		slug: "face-painting",
		title: "Face Painting",
		tagline: "Transform any event into a magical experience",
		description:
			"From whimsical butterflies for children's parties to intricate editorial designs, face painting transforms any event into a magical experience.",
		longDescription:
			"From whimsical butterflies for children's parties to intricate editorial designs, face painting transforms any event into a magical experience. Using only hypoallergenic, cosmetic-grade pigments that are safe for all skin types, every design is hand-painted with precision and artistry. Whether you need quick festival glitter or elaborate masquerade masks, each creation is tailored to your vision.",
		heroImage: "/assets/service-face-hero.jpg",
		pricing: [
			{
				name: "Basic Designs",
				price: "$75/hr",
				note: "Simple shapes, glitter, small accents",
			},
			{
				name: "Elaborate / Full Face",
				price: "$120/hr",
				note: "Detailed characters, masquerade, editorial",
			},
			{
				name: "Event Rate (4+ hrs)",
				price: "$400",
				note: "Best value for parties & festivals",
			},
		],
		details: [
			{ icon: "Clock", text: "1–4 hours depending on complexity" },
			{ icon: "Shield", text: "Hypoallergenic, cosmetic-grade products" },
			{ icon: "Users", text: "Individual or group sessions available" },
			{ icon: "Sparkles", text: "Water-resistant and long-lasting options" },
		],
	},
	{
		slug: "body-painting",
		title: "Body Painting",
		tagline: "Full-body artistic transformations",
		description:
			"Full-body artistic transformations for events, photo shoots, and performances. Each design is custom-created to match your vision, theme, or brand.",
		longDescription:
			"Full-body artistic transformations for events, photo shoots, and performances. Each design is custom-created to match your vision, theme, or brand. Water-resistant options available for pool parties and outdoor events. From abstract art to realistic camouflage, the body becomes a living canvas.",
		heroImage: "/assets/service-body-hero.jpg",
		pricing: [
			{ name: "Partial Body", price: "$200", note: "Torso, back, or arms" },
			{ name: "Full Body", price: "$500", note: "Complete transformation" },
			{
				name: "Event / Performance",
				price: "$800+",
				note: "Multi-model, live painting available",
			},
		],
		details: [
			{ icon: "Clock", text: "2–6 hours depending on coverage" },
			{ icon: "Shield", text: "FDA-approved body paints only" },
			{ icon: "Users", text: "Solo or group installations" },
			{ icon: "Sparkles", text: "Water-resistant & sweat-proof options" },
		],
	},
	{
		slug: "special-effects",
		title: "Special Effects",
		tagline: "Cinema-quality prosthetics & creature design",
		description:
			"Cinema-quality prosthetics, wounds, aging makeup, and creature designs. Perfect for film productions, Halloween events, haunted houses, and theatrical performances.",
		longDescription:
			"Cinema-quality prosthetics, wounds, aging makeup, and creature designs. Perfect for film productions, Halloween events, haunted houses, and theatrical performances. Using professional-grade latex, silicone, and gelatin prosthetics combined with expert paint techniques to create hyper-realistic effects that hold up on camera and on stage.",
		heroImage: "/assets/service-sfx-hero.jpg",
		pricing: [
			{
				name: "Basic Prosthetics",
				price: "$150",
				note: "Scars, wounds, small appliances",
			},
			{
				name: "Full Character",
				price: "$400",
				note: "Complete creature or aged transformation",
			},
			{
				name: "Film / Day Rate",
				price: "$1,200",
				note: "On-set availability, touch-ups included",
			},
		],
		details: [
			{ icon: "Clock", text: "1–5 hours depending on complexity" },
			{ icon: "Shield", text: "Professional-grade latex & silicone" },
			{ icon: "Users", text: "Film, theater, events & private bookings" },
			{ icon: "Sparkles", text: "Camera-ready HD finish" },
		],
	},
];

export const TESTIMONIALS: Testimonial[] = [
	{
		id: "1",
		name: "Sarah & David",
		role: "Wedding Clients",
		quote:
			"Collaborating with Posh & Painted was an exercise in patience and revelation. The final designs didn't just decorate our guests — they redefined how everyone experienced our special day.",
		rating: 5,
	},
	{
		id: "2",
		name: "Maya Johnson",
		role: "Event Planner",
		quote:
			"The face painting at our corporate gala was absolutely mesmerizing. Every guest felt like a work of art. Professional, punctual, and unbelievably talented. We'll be booking again next year.",
		rating: 5,
	},
	{
		id: "3",
		name: "The Rodriguez Family",
		role: "Birthday Party",
		quote:
			"Our daughter's birthday party was transformed into a magical wonderland. The kids couldn't stop looking at themselves in the mirror. Pure joy!",
		rating: 5,
	},
];

export const DEFAULT_GALLERY_ITEMS = [
	{
		id: "default-1",
		image: "/assets/portfolio-1.jpg",
		category: "face-painting" as const,
		title: "Children's Party",
	},
	{
		id: "default-2",
		image: "/assets/portfolio-2.jpg",
		category: "face-painting" as const,
		title: "Masquerade Mask",
	},
	{
		id: "default-3",
		image: "/assets/portfolio-3.jpg",
		category: "body-painting" as const,
		title: "Forest Camouflage",
	},
	{
		id: "default-4",
		image: "/assets/portfolio-4.jpg",
		category: "special-effects" as const,
		title: "Skull Design",
	},
	{
		id: "default-5",
		image: "/assets/portfolio-5.jpg",
		category: "face-painting" as const,
		title: "Bridal Floral",
	},
	{
		id: "default-6",
		image: "/assets/portfolio-6.jpg",
		category: "special-effects" as const,
		title: "Fantasy Creature",
	},
	{
		id: "default-7",
		image: "/assets/cat-face-paint.jpg",
		category: "face-painting" as const,
		title: "Butterfly Art",
	},
	{
		id: "default-8",
		image: "/assets/cat-body-paint.jpg",
		category: "body-painting" as const,
		title: "Golden Geometric",
	},
	{
		id: "default-9",
		image: "/assets/feat-ethereal-glow.jpg",
		category: "face-painting" as const,
		title: "UV Neon Glow",
	},
	{
		id: "default-10",
		image: "/assets/feat-frozen-momentum.jpg",
		category: "body-painting" as const,
		title: "Frozen Waves",
	},
	{
		id: "default-11",
		image: "/assets/cat-sfx-makeup.jpg",
		category: "special-effects" as const,
		title: "Prosthetic Wound",
	},
	{
		id: "default-12",
		image: "/assets/about-artist.jpg",
		category: "face-painting" as const,
		title: "Behind the Scenes",
	},
];
