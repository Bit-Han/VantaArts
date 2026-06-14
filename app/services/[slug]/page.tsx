// import { notFound } from "next/navigation";
// import { getServices, getServiceBySlug } from "@/lib/data/fetch";
// import ServiceDetailClient from "@/components/ServicesDetails";

// interface Props {
//   params: Promise<{ slug: string }>;
// }

// // Tells Next.js which slugs exist so it can statically generate them
// export async function generateStaticParams() {
//   const services = await getServices();
//   return services.map((s) => ({ slug: s.slug }));
// }

// export default async function ServiceDetailPage({ params }: Props) {
//   const { slug } = await params;
//   const service = await getServiceBySlug(slug);

//   if (!service) return notFound();

//   return <ServiceDetailClient service={service} />;
// }

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices, getProjectsByCategory } from "@/lib/data/fetch";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const services = await getServices();
	return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceCategoryPage({ params }: Props) {
	const { slug } = await params;

	// Validate this is a real service
	const services = await getServices();
	const service = services.find((s) => s.slug === slug);
	if (!service) return notFound();

	// Fetch all projects under this category
	// Services use slugs like "inks", "canvas", "walls"
	// Projects use category values "inks", "canvas", "walls"
	// They match directly — service slug === project category
	const projects = await getProjectsByCategory(slug);

	return (
		<main className="min-h-screen bg-[#0a0a0a] pt-[120px] pb-24">
			<div className="container-main">
				{/* Header */}
				<div className="mb-16">
					<p className="eyebrow mb-4">{service.title.toUpperCase()}</p>
					<h1
						className="text-white leading-[1.05] tracking-[-0.015em]"
						style={{
							fontFamily: "'Cormorant Garamond', Georgia, serif",
							fontSize: "clamp(48px, 6vw, 72px)",
							fontWeight: 400,
						}}
					>
						{service.tagline}
					</h1>
					<p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[600px] leading-relaxed">
						{service.description}
					</p>
				</div>

				{/* Projects Grid */}
				{projects.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project) => (
							<Link
								key={project.id}
								href={`/${project.category}/${project.slug}`}
								className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
							>
								{project.featured_image_url ? (
									<Image
										src={project.featured_image_url}
										alt={project.title}
										fill
										className="object-cover transition-transform duration-700 group-hover:scale-105"
									/>
								) : (
									<div className="w-full h-full bg-[#111]" />
								)}
								<div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
								<div className="absolute inset-0 p-8 flex flex-col justify-end">
									<p className="eyebrow mb-3">
										{project.category.toUpperCase()}
									</p>
									<h2 className="text-white text-3xl font-medium leading-tight">
										{project.title}
									</h2>
									<p className="text-[#d0d0d0] text-sm mt-3 leading-relaxed line-clamp-2">
										{project.description}
									</p>
									<span className="text-white text-sm uppercase tracking-[0.08em] mt-6 inline-flex items-center gap-2">
										View Project <span>&rarr;</span>
									</span>
								</div>
							</Link>
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-32 text-center">
						<p
							className="text-[#555] text-sm tracking-[0.15em] uppercase"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							No projects yet in this category.
						</p>
					</div>
				)}
			</div>
		</main>
	);
}