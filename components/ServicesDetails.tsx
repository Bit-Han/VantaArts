
"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Clock, Shield, Users, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageLightbox from "@/components/ImageLightBox";
import type { ServiceWithRelations } from "@/lib/types/database";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, React.ReactNode> = {
	Clock: <Clock size={18} />,
	Shield: <Shield size={18} />,
	Users: <Users size={18} />,
	Sparkles: <Sparkles size={18} />,
};


interface Props {
  service: ServiceWithRelations; // ← use it here instead of the local Service interface
}

// ─── Component (UI completely unchanged) ─────────────────────────────────────
export default function ServiceDetailClient({ service }: Props) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	// Gallery images: currently the hero image.
	// To show more, add a gallery_images column or join gallery_items by slug.
	const galleryImages = useMemo<string[]>(
		() => (service.heroImage ? [service.heroImage] : []),
		[service.heroImage],
	);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				".service-detail-content > *",
				{ y: 40, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: section,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);
		}, section);

		return () => ctx.revert();
	}, [service]);

	// WhatsApp URL — read from env or fall back to a sensible default
	// Ideally pass this down from the server page as a prop (see note below)
	const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}`;

	return (
		<main className="min-h-screen bg-[#0a0a0a]">
			{/* Hero */}
			<section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden">
				<Image
					src={service.heroImage}
					alt={service.title}
					fill
					priority
					className="object-cover"
				/>
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						background:
							"linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.8) 100%)",
					}}
				/>
				<div className="absolute bottom-0 left-0 right-0 z-[2] container-main pb-16">
					<p className="eyebrow mb-3">RECENTLY RELEASED</p>
					<h1
						className="text-white leading-[1.0] tracking-[-0.02em]"
						style={{
							fontFamily: "'Cormorant Garamond', Georgia, serif",
							fontSize: "clamp(48px, 8vw, 80px)",
							fontWeight: 400,
						}}
					>
						{service.title}
					</h1>
					<p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[500px]">
						{service.tagline}
					</p>
					<a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="btn-primary mt-8 inline-flex"
					>
						BOOK THIS SERVICE →
					</a>
				</div>
			</section>

			{/* Details */}
			<section ref={sectionRef} className="py-20 md:py-28">
				<div className="container-main">
					<div className="service-detail-content flex flex-col lg:flex-row gap-12 lg:gap-16">
						{/* Left */}
						<div className="w-full lg:w-[60%]">
							<p className="eyebrow mb-4">THE CRAFTSMANSHIP</p>
							<h2
								className="text-white leading-[1.1] tracking-[-0.01em] mb-8"
								style={{
									fontFamily: "'Cormorant Garamond', Georgia, serif",
									fontSize: "clamp(36px, 5vw, 48px)",
									fontWeight: 400,
								}}
							>
								About This Service
							</h2>
							<p className="text-[#a0a0a0] text-base leading-relaxed mb-10">
								{service.longDescription}
							</p>

							<div className="flex flex-col gap-5">
								{service.details.map((detail, i) => (
									<div key={i} className="flex items-start gap-4">
										<div className="text-[#c17a53] mt-0.5">
											{ICON_MAP[detail.icon]}
										</div>
										<p className="text-[#a0a0a0] text-base">{detail.text}</p>
									</div>
								))}
							</div>
						</div>

						{/* Right — Pricing */}
						<div className="w-full lg:w-[40%]">
							<div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-8 lg:p-10 sticky top-24">
								<h3 className="text-white text-2xl font-medium mb-8">
									Pricing
								</h3>
								<div className="flex flex-col gap-6">
									{service.pricing.map((tier, i) => (
										<div
											key={i}
											className="flex flex-col gap-2 pb-6 border-b border-[#2a2a2a] last:border-0 last:pb-0"
										>
											<div className="flex justify-between items-center">
												<span className="text-white text-base">
													{tier.name}
												</span>
												<span className="text-[#c17a53] text-xl font-medium">
													{tier.price}
												</span>
											</div>
											{tier.note && (
												<p className="text-[#666666] text-sm">{tier.note}</p>
											)}
										</div>
									))}
								</div>
								<a
									href={whatsappUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="btn-primary w-full mt-8 block text-center !rounded-lg"
								>
									BOOK NOW
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Gallery */}
			{galleryImages.length > 0 && (
				<section className="pb-20 md:pb-28">
					<div className="container-main">
						<h3 className="text-white text-2xl font-medium mb-8">Gallery</h3>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{galleryImages.map((img, i) => (
								<div
									key={i}
									className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
									onClick={() => {
										setLightboxIndex(i);
										setLightboxOpen(true);
									}}
								>
									<Image
										src={img}
										alt={`${service.title} ${i}`}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
							))}
						</div>
					</div>
				</section>
			)}

			<ImageLightbox
				images={galleryImages.map((img, i) => ({
					src: img,
					alt: `${service.title} ${i}`,
				}))}
				currentIndex={lightboxIndex}
				isOpen={lightboxOpen}
				onClose={() => setLightboxOpen(false)}
				onNavigate={setLightboxIndex}
			/>
		</main>
	);
}