// "use client";

// import Link from "next/link";
// import Image from "next/image";

// import { SERVICES } from "@/lib/data/constants";

// export default function ServicesPage() {
// 	return (
// 		<main className="min-h-screen bg-[#0a0a0a] pt-[120px] pb-24">
// 			<div className="container-main">
// 				{/* Header */}
// 				<div className="mb-16">
// 					<p className="eyebrow mb-4">SERVICES</p>

// 					<h1
// 						className="text-white leading-[1.05] tracking-[-0.015em]"
// 						style={{
// 							fontFamily: "'Cormorant Garamond', Georgia, serif",

// 							fontSize: "clamp(48px, 6vw, 72px)",

// 							fontWeight: 400,
// 						}}
// 					>
// 						Crafted Experiences
// 					</h1>

// 					<p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[600px] leading-relaxed">
// 						Face painting, body art, and cinematic special effects designed to
// 						leave a lasting impression.
// 					</p>
// 				</div>

// 				{/* Services Grid */}
// 				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// 					{SERVICES.map((service) => (
// 						<Link
// 							key={service.slug}
// 							href={`/services/${service.slug}`}
// 							className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
// 						>
// 							<Image
// 								src={service.heroImage}
// 								alt={service.title}
// 								fill
// 								className="object-cover transition-transform duration-700 group-hover:scale-105"
// 							/>

// 							<div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />

// 							<div className="absolute inset-0 p-8 flex flex-col justify-end">
// 								<p className="eyebrow mb-3">SERVICE</p>

// 								<h2 className="text-white text-3xl font-medium leading-tight">
// 									{service.title}
// 								</h2>

// 								<p className="text-[#d0d0d0] text-sm mt-3 leading-relaxed">
// 									{service.tagline}
// 								</p>

// 								<span className="text-white text-sm uppercase tracking-[0.08em] mt-6 inline-flex items-center gap-2">
// 									Explore
// 									<span>&rarr;</span>
// 								</span>
// 							</div>
// 						</Link>
// 					))}
// 				</div>
// 			</div>
// 		</main>
// 	);
// }

import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/data/fetch";

export default async function ServicesPage() {
	// Fetch services from Supabase instead of importing from constants
	const services = await getServices();

	return (
		<main className="min-h-screen bg-[#0a0a0a] pt-[120px] pb-24">
			<div className="container-main">
				{/* Header */}
				<div className="mb-16">
					<p className="eyebrow mb-4">SERVICES</p>
					<h1
						className="text-white leading-[1.05] tracking-[-0.015em]"
						style={{
							fontFamily: "'Cormorant Garamond', Georgia, serif",
							fontSize: "clamp(48px, 6vw, 72px)",
							fontWeight: 400,
						}}
					>
						Crafted Experiences
					</h1>
					<p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[600px] leading-relaxed">
						Face painting, body art, and cinematic special effects designed to
						leave a lasting impression.
					</p>
				</div>

				{/* Services Grid — same markup, now DB-driven */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service) => (
						<Link
							key={service.slug}
							href={`/services/${service.slug}`}
							className="group relative overflow-hidden rounded-xl aspect-[3/4] block"
						>
							<Image
								src={service.heroImage}
								alt={service.title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
							<div className="absolute inset-0 p-8 flex flex-col justify-end">
								<p className="eyebrow mb-3">SERVICE</p>
								<h2 className="text-white text-3xl font-medium leading-tight">
									{service.title}
								</h2>
								<p className="text-[#d0d0d0] text-sm mt-3 leading-relaxed">
									{service.tagline}
								</p>
								<span className="text-white text-sm uppercase tracking-[0.08em] mt-6 inline-flex items-center gap-2">
									Explore <span>&rarr;</span>
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}