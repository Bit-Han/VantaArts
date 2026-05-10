"use client";

import { useRef, useEffect } from "react";

import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;

		if (!section) return;

		const ctx = gsap.context(() => {
			// Image Reveal
			gsap.fromTo(
				".about-image",
				{
					clipPath: "inset(100% 0 0 0)",
				},
				{
					clipPath: "inset(0% 0 0 0)",
					duration: 1.2,
					ease: "power3.inOut",

					scrollTrigger: {
						trigger: section,
						start: "top 70%",
						toggleActions: "play none none none",
					},
				},
			);

			// Text Entrance
			gsap.fromTo(
				".about-text > *",
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
						start: "top 75%",
						toggleActions: "play none none none",
					},
				},
			);
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section
			id="about"
			ref={sectionRef}
			className="bg-[#111111] py-24 md:py-32"
		>
			<div className="container-main">
				<div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
					{/* Text Column */}
					<div className="w-full lg:w-[55%] about-text">
						<p className="eyebrow mb-4">THE ARTIST</p>

						<h2
							className="text-white leading-[1.05] tracking-[-0.015em] mb-8"
							style={{
								fontFamily: "'Cormorant Garamond', Georgia, serif",

								fontSize: "clamp(36px, 5vw, 64px)",

								fontWeight: 400,
							}}
						>
							Silent Voices,
							<br />
							Painted in Light.
						</h2>

						<div className="flex flex-col gap-5">
							<p className="text-[#a0a0a0] text-base leading-relaxed">
								Art is not a performance, but a slow excavation of the self.
								Behind every stroke of the brush and every line of paint lies a
								quiet rebellion against the noise of the digital age.
							</p>

							<p className="text-[#a0a0a0] text-base leading-relaxed">
								I am a curator of shadows. My work bridges the visceral intimacy
								of fine-line artistry with the bold, imposing geometry of
								organic forms. It is a dialogue between the temporary flesh and
								the permanent mark.
							</p>

							<p className="text-[#a0a0a0] text-base leading-relaxed">
								Whether it&apos;s ink on skin or pigment on canvas, every story
								deserves to be told with intention. Let&apos;s build something
								beautiful together.
							</p>
						</div>
					</div>

					{/* Image Column */}
					<div className="w-full lg:w-[45%]">
						<div className="about-image overflow-hidden rounded-lg">
							<div className="relative w-full aspect-[3/4]">
								<Image
									src="/assets/about-artist.jpg"
									alt="The artist at work"
									fill
									loading="lazy"
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
