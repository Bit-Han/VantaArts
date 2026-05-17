// "use client";

// import { useRef, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import { CATEGORY_IMAGES } from "@/lib/data/constants";

// gsap.registerPlugin(ScrollTrigger);

// const categories = [
// 	{
// 		key: "walls",
// 		slug: "walls",
// 	},
// 	{
// 		key: "canvas",
// 		slug: "canvas",
// 	},
// 	{
// 		key: "inks",
// 		slug: "inks",
// 	},
// ];

// export default function WorkCategories() {
// 	const sectionRef = useRef<HTMLDivElement>(null);

// 	const gridRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const section = sectionRef.current;
// 		const grid = gridRef.current;

// 		if (!section || !grid) return;

// 		const ctx = gsap.context(() => {
// 			// Header Entrance
// 			gsap.fromTo(
// 				".cat-header > *",
// 				{
// 					y: 40,
// 					opacity: 0,
// 				},
// 				{
// 					y: 0,
// 					opacity: 1,
// 					duration: 0.8,
// 					stagger: 0.1,
// 					ease: "power3.out",

// 					scrollTrigger: {
// 						trigger: section,
// 						start: "top 80%",
// 						toggleActions: "play none none none",
// 					},
// 				},
// 			);

// 			// 3D Grid Tilt
// 			const x = (window.innerWidth / 2) * 0.001;

// 			const y = (window.innerHeight / 2) * 0.001;

// 			gsap
// 				.timeline({
// 					scrollTrigger: {
// 						trigger: grid,
// 						start: "top bottom",
// 						end: "bottom top",
// 						scrub: true,
// 					},
// 				})
// 				.fromTo(
// 					grid,
// 					{
// 						rotateX: -y,
// 						rotateY: x,
// 					},
// 					{
// 						rotateX: -y / 2,
// 						rotateY: x / 2,
// 						ease: "power1.inOut",
// 					},
// 				)
// 				.fromTo(
// 					grid.querySelectorAll(".grid-item"),
// 					{
// 						filter: "brightness(120%)",
// 					},
// 					{
// 						filter: "brightness(80%)",
// 						ease: "power3.inOut",
// 					},
// 					0,
// 				);

// 			// Stagger Items
// 			gsap.fromTo(
// 				".grid-item",
// 				{
// 					y: 60,
// 					opacity: 0,
// 				},
// 				{
// 					y: 0,
// 					opacity: 1,
// 					duration: 0.8,
// 					stagger: 0.15,
// 					ease: "power3.out",

// 					scrollTrigger: {
// 						trigger: grid,
// 						start: "top 85%",
// 						toggleActions: "play none none none",
// 					},
// 				},
// 			);
// 		}, section);

// 		return () => ctx.revert();
// 	}, []);

// 	return (
// 		<section ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32">
// 			<div className="container-main">
// 				{/* Header */}
// 				<div className="cat-header mb-16">
// 					<p className="eyebrow mb-4">THE COLLECTION</p>

// 					<h2
// 						className="text-white leading-[1.1] tracking-[-0.01em]"
// 						style={{
// 							fontFamily: "'Cormorant Garamond', Georgia, serif",

// 							fontSize: "clamp(36px, 5vw, 48px)",

// 							fontWeight: 400,
// 						}}
// 					>
// 						A Legacy in Color
// 					</h2>

// 					<p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[540px] leading-relaxed">
// 						From delicate face painting to immersive body art and cinematic
// 						special effects.
// 					</p>
// 				</div>

// 				{/* Grid */}
// 				<div
// 					ref={gridRef}
// 					className="grid grid-cols-1 md:grid-cols-3 gap-6"
// 					style={{
// 						perspective: "1000px",
// 						transformStyle: "preserve-3d",
// 					}}
// 				>
// 					{categories.map((cat) => {
// 						const data = CATEGORY_IMAGES[cat.key];

// 						return (
// 							<Link
// 								key={cat.key}
// 								href={`/services/${cat.slug}`}
// 								className="grid-item group relative aspect-[3/4] overflow-hidden rounded-lg block"
// 							>
// 								{/* Image */}
// 								<div className="relative w-full h-full">
// 									<Image
// 										src={data.image}
// 										alt={data.title}
// 										fill
// 										loading="lazy"
// 										className="object-cover transition-transform duration-700 group-hover:scale-105"
// 									/>
// 								</div>

// 								{/* Overlay */}
// 								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />

// 								{/* Hover Content */}
// 								<div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
// 									<p className="text-white text-2xl font-medium tracking-wide uppercase">
// 										{data.title}
// 									</p>

// 									<p className="text-[#a0a0a0] text-sm mt-2">{data.subtitle}</p>
// 								</div>

// 								{/* Bottom Label */}
// 								<div className="absolute bottom-6 left-6 md:opacity-100 group-hover:opacity-0 transition-opacity duration-300">
// 									<p className="text-white text-xl font-medium tracking-wide uppercase">
// 										{data.title}
// 									</p>
// 								</div>
// 							</Link>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</section>
// 	);
// }



"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Category {
  id: string;
  key: string;
  slug: string;
  image_url: string;
  title: string;
  subtitle: string;
}

interface Props {
  categories: Category[];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function WorkCategories({ categories }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      // Header Entrance
      gsap.fromTo(
        ".cat-header > *",
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
        }
      );

      // 3D Grid Tilt
      const x = (window.innerWidth / 2) * 0.001;
      const y = (window.innerHeight / 2) * 0.001;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(grid, { rotateX: -y, rotateY: x }, { rotateX: -y / 2, rotateY: x / 2, ease: "power1.inOut" })
        .fromTo(
          grid.querySelectorAll(".grid-item"),
          { filter: "brightness(120%)" },
          { filter: "brightness(80%)", ease: "power3.inOut" },
          0
        );

      // Stagger Items
      gsap.fromTo(
        ".grid-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="container-main">
        {/* Header */}
        <div className="cat-header mb-16">
          <p className="eyebrow mb-4">THE COLLECTION</p>
          <h2
            className="text-white leading-[1.1] tracking-[-0.01em]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: 400,
            }}
          >
            A Legacy in Color
          </h2>
          <p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[540px] leading-relaxed">
            From delicate face painting to immersive body art and cinematic
            special effects.
          </p>
        </div>

        {/* Grid — rendered from DB categories */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/services/${cat.slug}`}
              className="grid-item group relative aspect-[3/4] overflow-hidden rounded-lg block"
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={cat.image_url}
                  alt={cat.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />

              {/* Hover Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white text-2xl font-medium tracking-wide uppercase">
                  {cat.title}
                </p>
                <p className="text-[#a0a0a0] text-sm mt-2">{cat.subtitle}</p>
              </div>

              {/* Bottom Label */}
              <div className="absolute bottom-6 left-6 md:opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-white text-xl font-medium tracking-wide uppercase">
                  {cat.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
