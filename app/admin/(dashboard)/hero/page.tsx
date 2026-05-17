"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ImageUploader from "@/components/ImageUploader";
import SaveButton from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";

interface HeroSlide {
  id: string;
  video_url: string;
  poster_url: string;
  sort_order: number;
  is_active: boolean;
}

interface HeroContent {
  id: string;
  heading: string;
  subtext: string;
}

const INPUT_CLASS =
  "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS =
  "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";
const CARD_CLASS = "bg-[#111] border border-[#1e1e1e] rounded-xl p-6 mb-4";

export default function HeroAdminPage() {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [savingContent, setSavingContent] = useState(false);
  const [savedContent, setSavedContent] = useState(false);
  const [savingSlide, setSavingSlide] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/hero").then((r) => r.json()).then((d) => {
      setContent(d.content);
      setSlides(d.slides || []);
    });
  }, []);

  const saveContent = async () => {
    if (!content) return;
    setSavingContent(true);
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "content", ...content }),
    });
    setSavingContent(false);
    setSavedContent(true);
    setTimeout(() => setSavedContent(false), 2000);
  };

  const saveSlide = async (slide: HeroSlide) => {
    setSavingSlide(slide.id);
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "slide", ...slide }),
    });
    setSavingSlide(null);
  };

  const deleteSlide = async (id: string) => {
    if (!confirm("Remove this video slide?")) return;
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "delete_slide", id }),
    });
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const addSlide = async () => {
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "new_slide", video_url: "", poster_url: "", sort_order: slides.length }),
    });
    const res = await fetch("/api/admin/hero");
    const d = await res.json();
    setSlides(d.slides || []);
  };

  if (!content) return <LoadingState />;

  return (
    <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
      <SectionHeader title="Hero Section" description="Manage videos, heading, and subtext shown in the hero." />

      {/* Text Content Card */}
      <div className={CARD_CLASS}>
        <h2 className="text-white text-base font-medium mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Hero Text Content
        </h2>

        <div className="flex flex-col gap-5">
          <div>
            <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Main Heading</label>
            <input
              className={INPUT_CLASS}
              style={{ fontFamily: "'Outfit', sans-serif" }}
              value={content.heading}
              onChange={(e) => setContent({ ...content, heading: e.target.value })}
            />
          </div>

          <div>
            <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Subtext</label>
            <textarea
              className={INPUT_CLASS}
              rows={3}
              style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
              value={content.subtext}
              onChange={(e) => setContent({ ...content, subtext: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <SaveButton saving={savingContent} saved={savedContent} onClick={saveContent} />
          </div>
        </div>
      </div>

      {/* Video Slides */}
      <div className={CARD_CLASS}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-base font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Video Slides ({slides.length})
          </h2>
          <button
            onClick={addSlide}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wide uppercase text-[#c17a53] border border-[#c17a53] hover:bg-[#c17a53] hover:text-black transition-colors"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <Plus size={14} /> Add Slide
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {slides.map((slide, i) => (
            <div key={slide.id} className="border border-[#2a2a2a] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#666] text-xs uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Slide {i + 1}
                </p>
                <button
                  onClick={() => deleteSlide(slide.id)}
                  className="text-[#444] hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImageUploader
                  currentUrl={slide.poster_url}
                  onUpload={(url) => {
                    const updated = slides.map((s) => s.id === slide.id ? { ...s, poster_url: url } : s);
                    setSlides(updated);
                  }}
                  folder="hero"
                  label="Poster / Thumbnail Image"
                />

                <div className="flex flex-col gap-4">
                  <div>
                    <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Video URL or Path</label>
                    <input
                      className={INPUT_CLASS}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      value={slide.video_url}
                      onChange={(e) => {
                        const updated = slides.map((s) => s.id === slide.id ? { ...s, video_url: e.target.value } : s);
                        setSlides(updated);
                      }}
                      placeholder="/assets/hero-video-1.mp4"
                    />
                    <p className="text-[#444] text-xs mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      For large videos, upload them to Supabase Storage and paste the public URL here.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={slide.is_active}
                      onChange={(e) => {
                        const updated = slides.map((s) => s.id === slide.id ? { ...s, is_active: e.target.checked } : s);
                        setSlides(updated);
                      }}
                      className="accent-[#c17a53]"
                    />
                    <label className="text-[#666] text-xs uppercase tracking-wider" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Active (visible on site)
                    </label>
                  </div>

                  <div className="flex justify-end mt-auto">
                    <SaveButton
                      saving={savingSlide === slide.id}
                      saved={false}
                      onClick={() => saveSlide(slide)}
                      label="Save Slide"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="p-10 min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
      <div className="text-center">
        <div className="w-6 h-6 border-2 border-[#c17a53] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-[#555] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>Loading...</p>
      </div>
    </div>
  );
}