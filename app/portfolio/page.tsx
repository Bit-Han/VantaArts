// "use client";

// import { useState, useMemo, useRef, useEffect } from "react";

// import Image from "next/image";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { DEFAULT_GALLERY_ITEMS } from "@/lib/data/constants";
// import { useLocalStorage } from "@/hooks/useLocalStorage";

// import type { Project } from "@/lib/types";

// import ImageLightbox from "@/components/ImageLightBox";

// gsap.registerPlugin(ScrollTrigger);

// const FILTERS = [
// 	{ key: "all", label: "ALL" },
// 	{ key: "inks", label: "INKS" },
// 	{ key: "canvas", label: "CANVAS" },
// 	{ key: "walls", label: "WALLS" },
// ];

// export default function Portfolio() {
// 	const [activeFilter, setActiveFilter] = useState("all");

// 	const [lightboxOpen, setLightboxOpen] = useState(false);

// 	const [lightboxIndex, setLightboxIndex] = useState(0);

// 	const [cmsProjects] = useLocalStorage<Project[]>("posh-painted-projects", []);

// 	const gridRef = useRef<HTMLDivElement>(null);

// 	const allItems = useMemo(() => {
// 		const cmsItems = cmsProjects.flatMap((p) => [
// 			{
// 				id: p.id,
// 				image: p.heroImage,
// 				category: p.category,
// 				title: p.title,
// 			},

// 			...p.galleryImages.map((img, i) => ({
// 				id: `${p.id}-gallery-${i}`,
// 				image: img,
// 				category: p.category,
// 				title: `${p.title} — ${i + 1}`,
// 			})),
// 		]);

// 		return [...cmsItems, ...DEFAULT_GALLERY_ITEMS];
// 	}, [cmsProjects]);

// 	const filteredItems = useMemo(() => {
// 		if (activeFilter === "all") {
// 			return allItems;
// 		}

// 		return allItems.filter((item) => item.category === activeFilter);
// 	}, [allItems, activeFilter]);

// 	const lightboxImages = useMemo(
// 		() =>
// 			filteredItems.map((item) => ({
// 				src: item.image,
// 				alt: item.title,
// 			})),
// 		[filteredItems],
// 	);

// 	useEffect(() => {
// 		const grid = gridRef.current;

// 		if (!grid) return;

// 		const items = grid.querySelectorAll(".portfolio-item");

// 		gsap.fromTo(
// 			items,
// 			{
// 				opacity: 0,
// 				scale: 0.9,
// 			},
// 			{
// 				opacity: 1,
// 				scale: 1,
// 				duration: 0.4,
// 				stagger: 0.05,
// 				ease: "power2.out",
// 			},
// 		);
// 	}, [activeFilter]);

// 	return (
// 		<main className="min-h-screen bg-[#0a0a0a] pt-30 pb-24">
// 			<div className="container-main">
// 				{/* Header */}
// 				<div className="mb-12">
// 					<h1
// 						className="text-white leading-[1.05] tracking-[-0.015em]"
// 						style={{
// 							fontFamily: "'Cormorant Garamond', Georgia, serif",
// 							fontSize: "clamp(48px, 6vw, 64px)",
// 							fontWeight: 400,
// 						}}
// 					>
// 						Selected Works
// 					</h1>

// 					<p className="text-[#a0a0a0] text-lg font-light mt-4">
// 						A legacy written in color.
// 					</p>
// 				</div>

// 				{/* Filter Tabs */}
// 				<div className="flex flex-wrap gap-3 mb-12">
// 					{FILTERS.map((filter) => (
// 						<button
// 							key={filter.key}
// 							onClick={() => setActiveFilter(filter.key)}
// 							className="px-6 py-2.5 rounded-full text-[13px] font-medium tracking-[0.04em] transition-all duration-200"
// 							style={{
// 								background:
// 									activeFilter === filter.key ? "#c17a53" : "transparent",

// 								color: activeFilter === filter.key ? "#0a0a0a" : "#a0a0a0",

// 								border:
// 									activeFilter === filter.key
// 										? "1px solid #c17a53"
// 										: "1px solid #2a2a2a",
// 							}}
// 						>
// 							{filter.label}
// 						</button>
// 					))}
// 				</div>

// 				{/* Masonry Grid */}
// 				<div
// 					ref={gridRef}
// 					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// 				>
// 					{filteredItems.map((item, i) => (
// 						<div
// 							key={item.id}
// 							className="portfolio-item group relative overflow-hidden rounded-lg cursor-pointer"
// 							style={{
// 								aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3",
// 							}}
// 							onClick={() => {
// 								setLightboxIndex(i);
// 								setLightboxOpen(true);
// 							}}
// 						>
// 							<div className="relative w-full h-full">
// 								<Image
// 									src={item.image}
// 									alt={item.title}
// 									fill
// 									loading="lazy"
// 									className="object-cover transition-transform duration-500 group-hover:scale-105"
// 								/>
// 							</div>

// 							<div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
// 								<span className="text-white text-lg font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// 									VIEW
// 								</span>
// 							</div>
// 						</div>
// 					))}
// 				</div>

// 				{/* Empty State */}
// 				{filteredItems.length === 0 && (
// 					<div className="text-center py-20">
// 						<p className="text-[#666666] text-lg">
// 							No projects found in this category.
// 						</p>
// 					</div>
// 				)}
// 			</div>

// 			{/* Lightbox */}
// 			<ImageLightbox
// 				images={lightboxImages}
// 				currentIndex={lightboxIndex}
// 				isOpen={lightboxOpen}
// 				onClose={() => setLightboxOpen(false)}
// 				onNavigate={setLightboxIndex}
// 			/>
// 		</main>
// 	);
// }


import { getGalleryItems } from "@/lib/data/fetch";
import PortfolioClient from "@/components/PortfolioClient";

export default async function PortfolioPage() {
  // Fetch all gallery items from Supabase
  const items = await getGalleryItems();

  return <PortfolioClient items={items} />;
}