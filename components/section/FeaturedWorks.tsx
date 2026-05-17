// "use client";

// import { useRef, useEffect } from "react";

// import Link from "next/link";
// import Image from "next/image";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const projects = [
// 	{
// 		category: "INKS",

// 		title: "The Ethereal Glow",

// 		description:
// 			"An exploration of negative space and the permanent nature of temporary marks. This piece challenges the canvas to find meaning in the absence of form.",

// 		image: "/assets/feat-ethereal-glow.jpg",

// 		link: "/services/face-painting",
// 	},

// 	{
// 		category: "CANVAS",

// 		title: "Frozen Momentum",

// 		description:
// 			"Capturing the raw energy of movement on a static surface. A study of how frozen motion can be visually preserved through luminous gradients.",

// 		image: "/assets/feat-frozen-momentum.jpg",

// 		link: "/services/body-painting",
// 	},
// ];

// export default function FeaturedWorks() {
// 	const sectionRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		const section = sectionRef.current;

// 		if (!section) return;

// 		const ctx = gsap.context(() => {
// 			// Header Animation
// 			gsap.fromTo(
// 				".feat-header > *",
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

// 			// Cards Animation
// 			section.querySelectorAll(".feat-card").forEach((card, i) => {
// 				const direction = i % 2 === 0 ? -40 : 40;

// 				gsap.fromTo(
// 					card,
// 					{
// 						x: direction,
// 						opacity: 0,
// 					},
// 					{
// 						x: 0,
// 						opacity: 1,
// 						duration: 0.9,
// 						ease: "power3.out",

// 						scrollTrigger: {
// 							trigger: card,
// 							start: "top 80%",
// 							toggleActions: "play none none none",
// 						},
// 					},
// 				);
// 			});
// 		}, section);

// 		return () => ctx.revert();
// 	}, []);

// 	return (
// 		<section ref={sectionRef} className="bg-[#111111] py-24 md:py-32">
// 			<div className="container-main">
// 				{/* Header */}
// 				<div className="feat-header mb-16">
// 					<p className="eyebrow mb-4">FEATURED WORKS</p>

// 					<h2
// 						className="text-white leading-[1.1] tracking-[-0.01em]"
// 						style={{
// 							fontFamily: "'Cormorant Garamond', Georgia, serif",

// 							fontSize: "clamp(36px, 5vw, 48px)",

// 							fontWeight: 400,
// 						}}
// 					>
// 						Selected Projects
// 					</h2>

// 					<p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[560px] leading-relaxed">
// 						Where emotions meet structure, a curated selection of pieces that
// 						transcend the ordinary.
// 					</p>
// 				</div>

// 				{/* Projects */}
// 				<div className="flex flex-col gap-16">
// 					{projects.map((project, i) => (
// 						<div
// 							key={project.title}
// 							className={`feat-card flex flex-col ${
// 								i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
// 							} gap-8 lg:gap-12 items-center`}
// 						>
// 							{/* Image */}
// 							<div className="w-full lg:w-1/2 overflow-hidden rounded-lg group">
// 								<div className="relative w-full aspect-[4/3]">
// 									<Image
// 										src={project.image}
// 										alt={project.title}
// 										fill
// 										loading="lazy"
// 										className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
// 									/>
// 								</div>
// 							</div>

// 							{/* Content */}
// 							<div className="w-full lg:w-1/2">
// 								<p className="eyebrow mb-3">{project.category}</p>

// 								<h3 className="text-white text-2xl md:text-[32px] font-medium leading-tight mb-4">
// 									{project.title}
// 								</h3>

// 								<p className="text-[#a0a0a0] text-base leading-relaxed mb-6">
// 									{project.description}
// 								</p>

// 								<Link
// 									href={project.link}
// 									className="text-[12px] tracking-[0.04em] uppercase text-white hover:text-[#c17a53] transition-colors inline-flex items-center gap-2"
// 								>
// 									VIEW PROJECT
// 									<span>&rarr;</span>
// 								</Link>
// 							</div>
// 						</div>
// 					))}
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
interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
}

interface Props {
  projects: Project[];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FeaturedWorks({ projects }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".feat-header > *",
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

      // Cards Animation
      section.querySelectorAll(".feat-card").forEach((card, i) => {
        const direction = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(
          card,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#111111] py-24 md:py-32">
      <div className="container-main">
        {/* Header */}
        <div className="feat-header mb-16">
          <p className="eyebrow mb-4">FEATURED WORKS</p>
          <h2
            className="text-white leading-[1.1] tracking-[-0.01em]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 48px)",
              fontWeight: 400,
            }}
          >
            Selected Projects
          </h2>
          <p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[560px] leading-relaxed">
            Where emotions meet structure, a curated selection of pieces that
            transcend the ordinary.
          </p>
        </div>

        {/* Projects — rendered from DB data */}
        <div className="flex flex-col gap-16">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`feat-card flex flex-col ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 overflow-hidden rounded-lg group">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <p className="eyebrow mb-3">{project.category}</p>
                <h3 className="text-white text-2xl md:text-[32px] font-medium leading-tight mb-4">
                  {project.title}
                </h3>
                <p className="text-[#a0a0a0] text-base leading-relaxed mb-6">
                  {project.description}
                </p>
                <Link
                  href={project.link}
                  className="text-[12px] tracking-[0.04em] uppercase text-white hover:text-[#c17a53] transition-colors inline-flex items-center gap-2"
                >
                  VIEW PROJECT
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}