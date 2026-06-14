"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	LayoutDashboard,
	Image,
	ShoppingBag,
	Users,
	Settings,
	ExternalLink,
	LogOut,
	Menu,
	X,
	Layers,
} from "lucide-react";

const NAV = [
	{ label: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ label: "Projects", href: "/admin/projects", icon: Layers },
	{ label: "Gallery", href: "/admin/gallery", icon: Image },
	{ label: "Services", href: "/admin/services", icon: ShoppingBag },
	{ label: "About", href: "/admin/about", icon: Users },
	{ label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	async function logout() {
		await fetch("/api/auth", { method: "DELETE" });
		router.push("/login");
		router.refresh();
	}

	return (
		<>
			{/* Mobile top bar with toggle button */}
			<div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0a0a] border-b border-white/[0.06] flex items-center px-4 z-50">
				<button
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle sidebar"
					className="text-white p-1.5 -ml-1.5"
				>
					{isOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
				<p className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white ml-3">
					SHEFFEX ARTS
				</p>
			</div>

			{/* Overlay backdrop (mobile only, shown when sidebar open) */}
			{isOpen && (
				<div
					onClick={() => setIsOpen(false)}
					className="md:hidden fixed inset-0 bg-black/60 z-30"
				/>
			)}

			<aside
				className={`fixed top-0 left-0 h-screen w-56 bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col z-40
                     transition-transform duration-300 ease-in-out
                     ${isOpen ? "translate-x-0" : "-translate-x-full"}
                     md:translate-x-0`}
			>
				{/* Brand */}
				<div className="px-5 py-6 border-b border-white/[0.06]">
					<p className="font-body text-[13px] font-medium tracking-[0.1em] uppercase text-white hover:text-[#c17a53] transition-colors">
						SHEFFEX ARTS
					</p>
					<p className="font-body text-[0.55rem] tracking-[0.15em] uppercase text-dust mt-0.5">
						Content Studio
					</p>
				</div>

				{/* Nav */}
				<nav className="flex-1 mt-30 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
					{NAV.map(({ label, href, icon: Icon }) => {
						const active =
							href === "/admin"
								? pathname === "/admin"
								: pathname.startsWith(href);

						return (
							<Link
								key={href}
								href={href}
								onClick={() => setIsOpen(false)}
								className={`flex items-center gap-3 px-3 py-2.5
                            font-body text-[0.68rem] tracking-[0.1em] uppercase
                            transition-all duration-200
                            ${
															active
																? "text-white bg-white/[0.05] border-l-2 border-gold pl-[10px]"
																: "text-dust hover:text-white hover:bg-white/[0.03] border-l-2 border-transparent pl-[10px]"
														}`}
							>
								<Icon size={13} className="flex-shrink-0" />
								{label}
							</Link>
						);
					})}
				</nav>

				{/* Footer actions */}
				<div className="px-3 pb-6 border-t border-white/[0.06] pt-4 flex flex-col gap-0.5">
					<Link
						href="/"
						target="_blank"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 px-3 py-2.5
                       font-body text-[0.68rem] tracking-[0.1em] uppercase
                       text-dust hover:text-white transition-colors"
					>
						<ExternalLink size={13} />
						View Site
					</Link>
					<button
						onClick={logout}
						className="flex items-center gap-3 px-3 py-2.5
                       font-body text-[0.68rem] tracking-[0.1em] uppercase
                       text-dust hover:text-red-400 transition-colors text-left"
					>
						<LogOut size={13} />
						Log Out
					</button>
				</div>
			</aside>
		</>
	);
}