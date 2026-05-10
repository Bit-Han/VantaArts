"use client";

import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Star } from "lucide-react";

import { TESTIMONIALS } from "@/lib/data/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
	const sectionRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const section = sectionRef.current;

		if (!section) return;

		const ctx = gsap.context(() => {
			// Header Animation
			gsap.fromTo(
				".testim-header",
				{
					y: 40,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",

					scrollTrigger: {
						trigger: section,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);

			// Accordion Items Animation
			gsap.fromTo(
				".accordion-item",
				{
					y: 30,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 0.6,
					stagger: 0.1,
					ease: "power3.out",

					scrollTrigger: {
						trigger: ".accordion-list",
						start: "top 85%",
						toggleActions: "play none none none",
					},
				},
			);
		}, section);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} className="bg-[#0a0a0a] py-24 md:py-32">
			<div className="container-main">
				{/* Header */}
				<div className="testim-header text-center mb-16">
					<h2
						className="text-white leading-[1.1] tracking-[-0.01em]"
						style={{
							fontFamily: "'Cormorant Garamond', Georgia, serif",

							fontSize: "clamp(36px, 5vw, 48px)",

							fontWeight: 400,
						}}
					>
						What Clients Say
					</h2>
				</div>

				{/* Testimonials */}
				<div className="accordion-list max-w-[800px] mx-auto">
					{TESTIMONIALS.map((t) => (
						<TestimonialItem key={t.id} testimonial={t} />
					))}
				</div>
			</div>
		</section>
	);
}

interface TestimonialItemProps {
	testimonial: (typeof TESTIMONIALS)[0];
}

function TestimonialItem({ testimonial }: TestimonialItemProps) {
	const contentRef = useRef<HTMLDivElement>(null);

	const innerRef = useRef<HTMLDivElement>(null);

	const handleEnter = () => {
		const content = contentRef.current;

		const inner = innerRef.current;

		if (!content || !inner) return;

		gsap.to(content, {
			height: inner.scrollHeight,
			autoAlpha: 1,
			duration: 0.5,
			ease: "power2.inOut",
		});
	};

	const handleLeave = () => {
		const content = contentRef.current;

		if (!content) return;

		gsap.to(content, {
			height: 0,
			autoAlpha: 0,
			duration: 0.5,
			ease: "power2.inOut",
		});
	};

	return (
		<div
			className="accordion-item border-b border-[#2a2a2a] cursor-pointer py-6"
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			onClick={handleEnter}
		>
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h4 className="text-white text-lg md:text-xl font-medium">
						{testimonial.name}
					</h4>

					<p className="text-[#666666] text-sm">{testimonial.role}</p>
				</div>

				{/* Stars */}
				<div className="flex gap-1">
					{Array.from({
						length: testimonial.rating,
					}).map((_, i) => (
						<Star key={i} size={16} className="fill-[#c17a53] text-[#c17a53]" />
					))}
				</div>
			</div>

			{/* Expandable Content */}
			<div
				ref={contentRef}
				className="overflow-hidden"
				style={{
					height: 0,
					opacity: 0,
					visibility: "hidden",
				}}
			>
				<div ref={innerRef} className="pt-4">
					<p className="text-[#a0a0a0] text-base leading-relaxed italic">
						&ldquo;
						{testimonial.quote}
						&rdquo;
					</p>
				</div>
			</div>
		</div>
	);
}
