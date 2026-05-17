

// const INPUT_CLASS = "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
// const LABEL_CLASS = "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

// export default function CategoriesAdminPage() {
//   const [categories, setCategories] = useState<any[]>([]);
//   const [saving, setSaving] = useState<string | null>(null);
//   const [saved, setSaved] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("/api/admin/categories").then((r) => r.json()).then(setCategories);
//   }, []);

//   const handleSave = async (cat: any) => {
//     setSaving(cat.id);
//     await fetch("/api/admin/categories", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(cat),
//     });
//     setSaving(null);
//     setSaved(cat.id);
//     setTimeout(() => setSaved(null), 2000);
//   };

//   const update = (id: string, field: string, value: string) => {
//     setCategories((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c));
//   };

//   return (
//     <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
//       <SectionHeader title="Work Categories" description="Edit the 3 category cards shown on the homepage." />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {categories.map((cat) => (
//           <div key={cat.id} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5">
//             <p
//               className="text-[#c17a53] text-xs uppercase tracking-[0.2em]"
//               style={{ fontFamily: "'Outfit', sans-serif" }}
//             >
//               {cat.key}
//             </p>

//             <ImageUploader
//               currentUrl={cat.image_url}
//               onUpload={(url) => update(cat.id, "image_url", url)}
//               folder="categories"
//               aspectRatio="aspect-[3/4]"
//               label="Category Image"
//             />

//             <div>
//               <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Title</label>
//               <input
//                 className={INPUT_CLASS}
//                 style={{ fontFamily: "'Outfit', sans-serif" }}
//                 value={cat.title}
//                 onChange={(e) => update(cat.id, "title", e.target.value)}
//               />
//             </div>

//             <div>
//               <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Subtitle</label>
//               <input
//                 className={INPUT_CLASS}
//                 style={{ fontFamily: "'Outfit', sans-serif" }}
//                 value={cat.subtitle}
//                 onChange={(e) => update(cat.id, "subtitle", e.target.value)}
//               />
//             </div>

//             <SaveButton
//               saving={saving === cat.id}
//               saved={saved === cat.id}
//               onClick={() => handleSave(cat)}
//               label="Save Category"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ImageUploader from "@/components/ImageUploader";
import SaveButton from "@/components/SaveButton";
import type { CategoryRow } from "@/lib/types/database";

const INPUT_CLASS =
  "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS =
  "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

// Only the fields the form can edit
type EditableCategoryField = "title" | "subtitle" | "image_url";

export default function CategoriesAdminPage() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data: CategoryRow[]) => setCategories(data));
  }, []);

  const handleSave = async (cat: CategoryRow) => {
    setSaving(cat.id);
    await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cat),
    });
    setSaving(null);
    setSaved(cat.id);
    setTimeout(() => setSaved(null), 2000);
  };

  const update = (id: string, field: EditableCategoryField, value: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
      <SectionHeader
        title="Work Categories"
        description="Edit the 3 category cards shown on the homepage."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5"
          >
            <p
              className="text-[#c17a53] text-xs uppercase tracking-[0.2em]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {cat.key}
            </p>

            <ImageUploader
              currentUrl={cat.image_url}
              onUpload={(url) => update(cat.id, "image_url", url)}
              folder="categories"
              aspectRatio="aspect-[3/4]"
              label="Category Image"
            />

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
                value={cat.title}
                onChange={(e) => update(cat.id, "title", e.target.value)}
              />
            </div>

            <div>
              <label
                className={LABEL_CLASS}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Subtitle
              </label>
              <input
                className={INPUT_CLASS}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                value={cat.subtitle}
                onChange={(e) => update(cat.id, "subtitle", e.target.value)}
              />
            </div>

            <SaveButton
              saving={saving === cat.id}
              saved={saved === cat.id}
              onClick={() => handleSave(cat)}
              label="Save Category"
            />
          </div>
        ))}
      </div>
    </div>
  );
}