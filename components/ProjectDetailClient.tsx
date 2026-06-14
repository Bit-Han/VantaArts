"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageLightbox from "@/components/ImageLightBox";
import type { ProjectWithRelations } from "@/lib/types/database";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: ProjectWithRelations;
  whatsappUrl: string;
}

export default function ProjectDetailClient({ project, whatsappUrl }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Real gallery images from gallery_items linked to this project
  // Falls back to just the featured image if no gallery images are linked yet
  const galleryImages = useMemo<{ src: string; alt: string }[]>(() => {
    if (project.gallery.length > 0) {
      return project.gallery.map((g) => ({
        src: g.image_url,
        alt: g.title || project.title,
      }));
    }
    if (project.featured_image_url) {
      return [{ src: project.featured_image_url, alt: project.title }];
    }
    return [];
  }, [project]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-detail-content > *",
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
    }, section);

    return () => ctx.revert();
  }, [project]);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[60vh] min-h-[450px] overflow-hidden">
        {project.featured_image_url ? (
          <Image
            src={project.featured_image_url}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.8) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-[2] container-main pb-16">
          {/* Back link */}
          <Link
            href={`/services/${project.category}`}
            className="text-[#a0a0a0] hover:text-white text-xs tracking-[0.15em] uppercase transition-colors inline-flex items-center gap-2 mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            ← Back to {project.category}
          </Link>
          <p className="eyebrow mb-3">{project.category.toUpperCase()}</p>
          <h1
            className="text-white leading-[1.0] tracking-[-0.02em]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(48px, 8vw, 80px)",
              fontWeight: 400,
            }}
          >
            {project.title}
          </h1>
          <p className="text-[#a0a0a0] text-lg font-light mt-4 max-w-[500px]">
            {project.description}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex"
          >
            BOOK THIS PROJECT →
          </a>
        </div>
      </section>

      {/* ── Details + Pricing ─────────────────────────────────────────────── */}
      <section ref={sectionRef} className="py-20 md:py-28">
        <div className="container-main">
          <div className="project-detail-content flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* Left — About */}
            <div className="w-full lg:w-[60%]">
              <p className="eyebrow mb-4">THE PROJECT</p>
              <h2
                className="text-white leading-[1.1] tracking-[-0.01em] mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(36px, 5vw, 48px)",
                  fontWeight: 400,
                }}
              >
                About This Work
              </h2>
              <p className="text-[#a0a0a0] text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Right — Pricing */}
            <div className="w-full lg:w-[40%]">
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-8 lg:p-10 sticky top-24">
                <h3 className="text-white text-2xl font-medium mb-8">
                  Pricing
                </h3>

                {project.pricing.length > 0 ? (
                  <div className="flex flex-col gap-6">
                    {project.pricing.map((tier, i) => (
                      <div
                        key={tier.id ?? i}
                        className="flex flex-col gap-2 pb-6 border-b border-[#2a2a2a] last:border-0 last:pb-0"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white text-base">
                            {tier.name}
                          </span>
                          <span className="text-[#c17a53] text-xl font-medium">
                            {tier.price}
                          </span>
                        </div>
                        {tier.note && (
                          <p className="text-[#666666] text-sm">{tier.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#666] text-sm mb-6">
                    Contact us for pricing details.
                  </p>
                )}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full mt-8 block text-center !rounded-lg"
                >
                  BOOK NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="container-main">
            <h3 className="text-white text-2xl font-medium mb-8">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
                  onClick={() => {
                    setLightboxIndex(i);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ImageLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </main>
  );
}