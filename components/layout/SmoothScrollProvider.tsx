"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
	children: React.ReactNode;
}

export default function SmoothScrollProvider({
	children,
}: SmoothScrollProviderProps) {
	const pathname = usePathname();

	useEffect(() => {
		const lenis = new Lenis({
			lerp: 0.08,
			smoothWheel: true,
		});

		lenis.on("scroll", ScrollTrigger.update);

		const update = (time: number) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(update);

		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(update);
			lenis.destroy();
		};
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return <>{children}</>;
}
