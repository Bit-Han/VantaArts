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