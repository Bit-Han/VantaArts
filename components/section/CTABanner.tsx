"use client";

import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { WHATSAPP_URL } from "@/lib/data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;

		if (!section) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				section.querySelectorAll("h2, p, a"),
				{
					y: 40,
					opacity: 0,
				},
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
	}, []);

	return (
		<section
			ref={sectionRef}
			className="bg-[#0a0a0a] py-20 md:py-28 text-center"
		>
			<div className="container-main">
				<h2
					className="text-white leading-[1.1] tracking-[-0.01em]"
					style={{
						fontFamily: "'Cormorant Garamond', Georgia, serif",

						fontSize: "clamp(36px, 5vw, 48px)",

						fontWeight: 400,
					}}
				>
					Start a Session
				</h2>

				<p className="text-[#a0a0a0] text-lg font-light max-w-[600px] mx-auto mt-6 leading-relaxed">
					Whether it&apos;s a subtle accent or a full transformation, every
					story deserves to be painted with intention. Let&apos;s create your
					masterpiece.
				</p>

				<a
					href={WHATSAPP_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="btn-primary inline-flex mt-10 !px-10 !py-4 hover:shadow-[0_0_30px_rgba(193,122,83,0.3)]"
				>
					BOOK VIA WHATSAPP
				</a>
			</div>
		</section>
	);
}
