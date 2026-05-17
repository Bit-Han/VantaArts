"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navigation() {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
     const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}`
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 100);
		};

		window.addEventListener("scroll", handleScroll, {
			passive: true,
		});

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
    
	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const isHome = pathname === "/";

	const scrollToSection = (id: string) => {
		if (!isHome) return;

		const el = document.getElementById(id);

		if (el) {
			el.scrollIntoView({
				behavior: "smooth",
			});

			setMobileOpen(false);
		}
	};

	return (
		<>
			<header
				className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300"
				style={{
					background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
					backdropFilter: scrolled ? "blur(12px)" : "none",
					borderBottom: scrolled
						? "1px solid #2a2a2a"
						: "1px solid transparent",
				}}
			>
				<div className="container-main w-full flex items-center justify-between">
					<Link
						href="/"
						className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white hover:text-[#c17a53] transition-colors"
					>
						SHEFFEX ARTS
					</Link>

					{/* Desktop Nav */}
					<nav className="hidden md:flex items-center gap-8">
						<Link
							href="/portfolio"
							  onClick={() => setMobileOpen(false)}
							className="text-[13px] font-normal tracking-[0.06em] uppercase text-[#a0a0a0] hover:text-white transition-colors"
						>
							Portfolio
						</Link>

						<Link
							href="/services/inks"
							  onClick={() => setMobileOpen(false)}
							className="text-[13px] font-normal tracking-[0.06em] uppercase text-[#a0a0a0] hover:text-white transition-colors"
						>
							Services
						</Link>

						{isHome ? (
							<button
								onClick={() => scrollToSection("about")}
								className="text-[13px] font-normal tracking-[0.06em] uppercase text-[#a0a0a0] hover:text-white transition-colors"
							>
								About
							</button>
						) : (
							<Link
								href="/#about"
								onClick={() => setMobileOpen(false)}
								className="text-[13px] font-normal tracking-[0.06em] uppercase text-[#a0a0a0] hover:text-white transition-colors"
							>
								About
							</Link>
						)}

						<a
							href={whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-primary !py-[10px] !px-6"
						>
							Book Now
						</a>
					</nav>

					{/* Mobile Hamburger */}
					<button
						className="md:hidden text-white p-2"
						onClick={() => setMobileOpen(!mobileOpen)}
						aria-label="Toggle menu"
					>
						{mobileOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</header>

			{/* Mobile Menu Drawer */}
			<div
				className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden"
				style={{
					opacity: mobileOpen ? 1 : 0,
					pointerEvents: mobileOpen ? "auto" : "none",
				}}
			>
				<Link
					href="/portfolio"
					className="text-2xl font-body tracking-[0.06em] uppercase text-white hover:text-[#c17a53] transition-colors"
					onClick={() => setMobileOpen(false)}
				>
					Portfolio
				</Link>

				<Link
					href="/services/inks"
					className="text-2xl font-body tracking-[0.06em] uppercase text-white hover:text-[#c17a53] transition-colors"
					onClick={() => setMobileOpen(false)}
				>
					Services
				</Link>

				<Link
					href="/#about"
					className="text-2xl font-body tracking-[0.06em] uppercase text-white hover:text-[#c17a53] transition-colors"
					onClick={() => setMobileOpen(false)}
				>
					About
				</Link>

				<a
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="btn-primary mt-4"
					onClick={() => setMobileOpen(false)}
				>
					Book Now
				</a>
			</div>
		</>
	);
}