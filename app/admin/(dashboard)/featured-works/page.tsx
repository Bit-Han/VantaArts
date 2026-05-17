

"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ImageUploader from "@/components/ImageUploader";
import SaveButton from "@/components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { FeaturedWorkRow } from "@/lib/types/database";

// ─── Types ────────────────────────────────────────────────────────────────────

// What the form manages (no DB-only fields like created_at)
interface FeaturedWorkFormState {
  category: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  sort_order: number;
}

// Full row shape including id (for saved works from DB)
type FeaturedWork = FeaturedWorkRow;

const INPUT_CLASS =
  "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS =
  "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

const BLANK_WORK: FeaturedWorkFormState = {
  category: "INKS",
  title: "",
  description: "",
  image_url: "",
  link: "",
  sort_order: 0,
};

export default function FeaturedWorksAdminPage() {
  const [works, setWorks] = useState<FeaturedWork[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newWork, setNewWork] = useState<FeaturedWorkFormState>({
    ...BLANK_WORK,
  });

  useEffect(() => {
    fetch("/api/admin/featured-works")
      .then((r) => r.json())
      .then((data: FeaturedWork[]) => setWorks(data));
  }, []);

  const handleSave = async (work: FeaturedWork) => {
    setSaving(work.id);
    await fetch("/api/admin/featured-works", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(work),
    });
    setSaving(null);
    setSaved(work.id);
    setTimeout(() => setSaved(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this featured work?")) return;
    await fetch("/api/admin/featured-works", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setWorks((prev) => prev.filter((w) => w.id !== id));
  };

  const handleAdd = async () => {
    await fetch("/api/admin/featured-works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newWork, sort_order: works.length }),
    });
    const res = await fetch("/api/admin/featured-works");
    const data: FeaturedWork[] = await res.json();
    setWorks(data);
    setAdding(false);
    setNewWork({ ...BLANK_WORK });
  };

  const update = (id: string, field: keyof FeaturedWork, value: string) => {
    setWorks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  return (
    <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
      <div className="flex items-start justify-between mb-2">
        <SectionHeader
          title="Featured Works"
          description="Manage the selected projects shown on the homepage."
        />
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wide uppercase text-[#c17a53] border border-[#c17a53] hover:bg-[#c17a53] hover:text-black transition-colors mt-8"
          style={{ fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}
        >
          <Plus size={14} /> Add Work
        </button>
      </div>

      {/* Add New Form */}
      {adding && (
        <div className="bg-[#111] border border-[#c17a53]/30 rounded-xl p-6 mb-6">
          <h3
            className="text-white text-sm font-medium mb-5"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            New Featured Work
          </h3>
          <WorkForm
            work={newWork}
            onChange={(field, value) =>
              setNewWork((prev) => ({ ...prev, [field]: value }))
            }
          />
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleAdd}
              className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-medium text-black"
              style={{ background: "#c17a53", fontFamily: "'Outfit', sans-serif" }}
            >
              Add Work
            </button>
            <button
              onClick={() => setAdding(false)}
              className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-medium text-[#666] border border-[#2a2a2a]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Works List */}
      <div className="flex flex-col gap-4">
        {works.map((work, i) => (
          <div
            key={work.id}
            className="bg-[#111] border border-[#1e1e1e] rounded-xl overflow-hidden"
          >
            {/* Accordion Header */}
            <div
              className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#151515] transition-colors"
              onClick={() =>
                setExpanded(expanded === work.id ? null : work.id)
              }
            >
              <div className="flex items-center gap-4">
                <span
                  className="text-[#555] text-xs"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  #{i + 1}
                </span>
                <div>
                  <p
                    className="text-white text-sm font-medium"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {work.title || "Untitled"}
                  </p>
                  <p
                    className="text-[#555] text-xs"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {work.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(work.id);
                  }}
                  className="text-[#333] hover:text-red-400 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
                {expanded === work.id ? (
                  <ChevronUp size={16} className="text-[#555]" />
                ) : (
                  <ChevronDown size={16} className="text-[#555]" />
                )}
              </div>
            </div>

            {/* Accordion Body */}
            {expanded === work.id && (
              <div className="p-5 pt-0 border-t border-[#1e1e1e]">
                <div className="pt-5">
                  <WorkForm
                    work={work}
                    onChange={(field, value) => update(work.id, field, value)}
                  />
                  <div className="flex justify-end mt-5">
                    <SaveButton
                      saving={saving === work.id}
                      saved={saved === work.id}
                      onClick={() => handleSave(work)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── WorkForm ─────────────────────────────────────────────────────────────────
// Accepts either a full FeaturedWork (saved) or FeaturedWorkFormState (new)
// The onChange only needs the editable string fields so keyof covers both.

type WorkFormFields = keyof FeaturedWorkFormState;

interface WorkFormProps {
  work: FeaturedWorkFormState | FeaturedWork;
  onChange: (field: WorkFormFields, value: string) => void;
}

function WorkForm({ work, onChange }: WorkFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ImageUploader
        currentUrl={work.image_url}
        onUpload={(url) => onChange("image_url", url)}
        folder="featured"
        aspectRatio="aspect-[4/3]"
        label="Project Image"
      />
      <div className="flex flex-col gap-4">
        <div>
          <label
            className={LABEL_CLASS}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Category Label
          </label>
          <select
            className={INPUT_CLASS}
            style={{ fontFamily: "'Outfit', sans-serif" }}
            value={work.category}
            onChange={(e) => onChange("category", e.target.value)}
          >
            <option value="INKS">INKS</option>
            <option value="CANVAS">CANVAS</option>
            <option value="WALLS">WALLS</option>
          </select>
        </div>
        <div>
          <label
            className={LABEL_CLASS}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Title
          </label>
          <input
            className={INPUT_CLASS}
            style={{ fontFamily: "'Outfit', sans-serif" }}
            value={work.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </div>
        <div>
          <label
            className={LABEL_CLASS}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Description
          </label>
          <textarea
            className={INPUT_CLASS}
            rows={3}
            style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
            value={work.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </div>
        <div>
          <label
            className={LABEL_CLASS}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Link (e.g. /services/inks)
          </label>
          <input
            className={INPUT_CLASS}
            style={{ fontFamily: "'Outfit', sans-serif" }}
            value={work.link}
            onChange={(e) => onChange("link", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}