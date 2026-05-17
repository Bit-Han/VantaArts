// import Link from "next/link";
// import Image from "next/image";
// import StatCard from "@/components/StatsCard";
// import { ShoppingBag, CheckCircle, Users, Images } from "lucide-react";


// export const dynamic = "force-dynamic";

// // -----------------------------
// // RAW MOCK DATA (TEMPORARY CMS)
// // -----------------------------
// const works = [
// 	{
// 		id: "1",
// 		title: "Golden Aura Face Paint",
// 		category: "Face Painting",
// 		year: "2025",
// 		image: "/assets/portfolio-1.jpg",
// 	},
// 	{
// 		id: "2",
// 		title: "Neon Body Flow",
// 		category: "Body Painting",
// 		year: "2025",
// 		image: "/assets/portfolio-2.jpg",
// 	},
// 	{
// 		id: "3",
// 		title: "Dark FX Skull",
// 		category: "Special Effects",
// 		year: "2024",
// 		image: "/assets/portfolio-3.jpg",
// 	},
// ];

// const products = [
// 	{
// 		id: "p1",
// 		name: "Starter Face Paint Kit",
// 		available: true,
// 	},
// 	{
// 		id: "p2",
// 		name: "Pro FX Makeup Set",
// 		available: false,
// 	},
// 	{
// 		id: "p3",
// 		name: "Body Paint Neon Pack",
// 		available: true,
// 	},
// ];

// // -----------------------------

// export default async function AdminDashboard() {
// 	const stats = [
// 		{
// 			label: "Portfolio Works",
// 			value: works.length,
// 			icon: Images,
// 			href: "/admin/portfolio",
// 		},
// 		{
// 			label: "Shop Products",
// 			value: products.length,
// 			icon: ShoppingBag,
// 			href: "/admin/services",
// 		},
// 		{
// 			label: "Available Products",
// 			value: products.filter((p) => p.available).length,
// 			icon: CheckCircle,
// 			href: "/admin/services",
// 		},
// 		{
// 			label: "Studio Page",
// 			value: "1 page",
// 			icon: Users,
// 			href: "/admin/studio",
// 		},
// 	];

// 	return (
// 		<div>
// 			<div className="mb-10">
// 				<h1 className="font-display text-[2rem] text-white mb-1">Dashboard</h1>
// 				<p className="font-body text-[0.72rem] text-dust">
// 					Manage your content, images and website copy from one place.
// 				</p>
// 			</div>

// 			{/* Stats */}
// 			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
// 				{stats.map((s) => (
// 					<StatCard key={s.label} {...s} href={s.href} />
// 				))}
// 			</div>

// 			{/* Quick Actions */}
// 			<div className="bg-[#111111] border border-white/[0.07] p-6 mb-8 rounded-md">
// 				<h2 className="font-display text-lg text-white mb-5">Quick Actions</h2>

// 				<div className="flex flex-wrap gap-3">
// 					<Link
// 						href="/admin/portfolio"
// 						className="btn-outline text-[0.63rem] py-2 px-4"
// 					>
// 						+ Add Portfolio Work
// 					</Link>
// 					<Link
// 						href="/admin/shop"
// 						className="btn-outline text-[0.63rem] py-2 px-4"
// 					>
// 						+ Add Shop Product
// 					</Link>
// 					<Link
// 						href="/admin/studio"
// 						className="btn-outline text-[0.63rem] py-2 px-4"
// 					>
// 						Edit Studio Page
// 					</Link>
// 					<Link
// 						href="/admin/home"
// 						className="btn-outline text-[0.63rem] py-2 px-4"
// 					>
// 						Edit Home Page
// 					</Link>
// 				</div>
// 			</div>

// 			{/* Recent works preview */}
// 			<div className="bg-[#111111] border border-white/[0.07] p-6 rounded-md">
// 				<div className="flex justify-between items-center mb-5">
// 					<h2 className="font-display text-lg text-white">
// 						Recent Portfolio Additions
// 					</h2>

// 					<Link
// 						href="/admin/portfolio"
// 						className="font-body text-[0.62rem] tracking-[0.15em] uppercase text-dust hover:text-gold transition-colors"
// 					>
// 						View All →
// 					</Link>
// 				</div>

// 				<div className="flex flex-col gap-2">
// 					{works.slice(0, 5).map((w) => (
// 						<div
// 							key={w.id}
// 							className="flex items-center gap-4 py-2.5 border-b border-white/[0.05] last:border-0"
// 						>
// 							<div className="w-10 h-10 bg-[#1a1a1a] flex-shrink-0 overflow-hidden">
// 								{w.image?.trim() ?(
// 									<Image
// 										src={w.image}
// 										alt={w.title}
// 										width={100}
// 										height={100}
// 										className="w-full h-full object-cover opacity-70"
// 									/>
// 								) : (
//   <div className="w-full h-full bg-white/5 flex items-center justify-center text-[10px] text-dust">
//     No Image
//   </div>
// )}
// 							</div>

// 							<div className="flex-1 min-w-0">
// 								<p className="font-display text-white text-sm truncate">
// 									{w.title}
// 								</p>
// 								<p className="font-body text-[0.6rem] text-dust uppercase tracking-[0.1em]">
// 									{w.category} · {w.year}
// 								</p>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }



"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/modules/supabase/client";
import {
  Image as ImageIcon, FileText, Star, Layers,
  Settings, Video, User, LayoutGrid
} from "lucide-react";

interface Stats {
  gallery: number;
  services: number;
  testimonials: number;
  featured: number;
}

const SECTIONS = [
  { href: "/admin/hero", label: "Hero Section", description: "Edit videos, heading & subtext", icon: Video, color: "#c17a53" },
  { href: "/admin/about", label: "About Section", description: "Edit artist bio & photo", icon: User, color: "#9b7ec8" },
  { href: "/admin/categories", label: "Work Categories", description: "Edit the 3 category cards", icon: LayoutGrid, color: "#5b9bd5" },
  { href: "/admin/featured-works", label: "Featured Works", description: "Manage selected projects", icon: ImageIcon, color: "#e07b6a" },
  { href: "/admin/testimonials", label: "Testimonials", description: "Add & edit client reviews", icon: Star, color: "#f0b85a" },
  { href: "/admin/services", label: "Services", description: "Edit service pages & pricing", icon: Layers, color: "#5bbd8a" },
  { href: "/admin/gallery", label: "Gallery", description: "Manage portfolio images", icon: FileText, color: "#d05ac5" },
  { href: "/admin/settings", label: "Site Settings", description: "WhatsApp, CTA, global config", icon: Settings, color: "#aaa" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ gallery: 0, services: 0, testimonials: 0, featured: 0 });
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const [gallery, services, testimonials, featured] = await Promise.all([
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("featured_works").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        gallery: gallery.count || 0,
        services: services.count || 0,
        testimonials: testimonials.count || 0,
        featured: featured.count || 0,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#c17a53] text-xs tracking-[0.2em] uppercase mb-2"
          style={{ fontFamily: "'Outfit', sans-serif" }}>
          Welcome back
        </p>
        <h1
          className="text-white"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 400,
          }}
        >
          Studio Dashboard
        </h1>
        <p className="text-[#666] text-sm mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Manage your artist website content from here.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Gallery Items", value: stats.gallery, color: "#c17a53" },
          { label: "Services", value: stats.services, color: "#5bbd8a" },
          { label: "Testimonials", value: stats.testimonials, color: "#f0b85a" },
          { label: "Featured Works", value: stats.featured, color: "#5b9bd5" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-5 border border-[#1e1e1e]"
            style={{ background: "#111" }}
          >
            <p className="text-4xl font-light" style={{ color: s.color, fontFamily: "'Cormorant Garamond', serif" }}>
              {s.value}
            </p>
            <p className="text-[#666] text-xs mt-1 tracking-wide uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-xl p-6 border border-[#1e1e1e] hover:border-[#2a2a2a] transition-all duration-300 block"
              style={{ background: "#111" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${section.color}18`, color: section.color }}
              >
                <Icon size={18} />
              </div>
              <h3
                className="text-white text-base font-medium mb-1"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {section.label}
              </h3>
              <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {section.description}
              </p>
              <div
                className="mt-4 text-[10px] tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
                style={{ color: section.color, fontFamily: "'Outfit', sans-serif" }}
              >
                Edit section <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}