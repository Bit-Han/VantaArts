// "use client";

// import { useEffect, useState } from "react";
// import SectionHeader from "@/components/SectionHeader";
// import ImageUploader from "@/components/ImageUploader";
// import SaveButton from "@/components/SaveButton";

// const INPUT_CLASS =
// 	"w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
// const LABEL_CLASS = "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

// export default function AboutAdminPage() {
// 	const [data, setData] = useState<any>(null);
// 	const [saving, setSaving] = useState(false);
// 	const [saved, setSaved] = useState(false);

// 	useEffect(() => {
// 		fetch("/api/admin/about")
// 			.then((r) => r.json())
// 			.then(setData);
// 	}, []);

// 	const handleSave = async () => {
// 		setSaving(true);
// 		await fetch("/api/admin/about", {
// 			method: "PUT",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(data),
// 		});
// 		setSaving(false);
// 		setSaved(true);
// 		setTimeout(() => setSaved(false), 2000);
// 	};

// 	if (!data)
// 		return (
// 			<div
// 				className="p-10 min-h-screen flex items-center justify-center"
// 				style={{ background: "#0a0a0a" }}
// 			>
// 				<div className="w-6 h-6 border-2 border-[#c17a53] border-t-transparent rounded-full animate-spin" />
// 			</div>
// 		);

// 	return (
// 		<div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
// 			<SectionHeader
// 				title="About Section"
// 				description="Edit the artist bio, headings, and profile photo."
// 			/>

// 			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// 				{/* Left: Text Fields */}
// 				<div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5">
// 					<h2
// 						className="text-white text-base font-medium"
// 						style={{ fontFamily: "'Outfit', sans-serif" }}
// 					>
// 						Text Content
// 					</h2>

// 					<div>
// 						<label
// 							className={LABEL_CLASS}
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Eyebrow Label
// 						</label>
// 						<input
// 							className={INPUT_CLASS}
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 							value={data.eyebrow || ""}
// 							onChange={(e) => setData({ ...data, eyebrow: e.target.value })}
// 						/>
// 					</div>

// 					<div>
// 						<label
// 							className={LABEL_CLASS}
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Main Heading
// 						</label>
// 						<textarea
// 							className={INPUT_CLASS}
// 							rows={2}
// 							style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
// 							value={data.heading || ""}
// 							onChange={(e) => setData({ ...data, heading: e.target.value })}
// 						/>
// 						<p
// 							className="text-[#444] text-xs mt-1"
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Use a line break to split the heading across two lines.
// 						</p>
// 					</div>

// 					<div>
// 						<label
// 							className={LABEL_CLASS}
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Paragraph 1
// 						</label>
// 						<textarea
// 							className={INPUT_CLASS}
// 							rows={4}
// 							style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
// 							value={data.paragraph_1 || ""}
// 							onChange={(e) =>
// 								setData({ ...data, paragraph_1: e.target.value })
// 							}
// 						/>
// 					</div>

// 					<div>
// 						<label
// 							className={LABEL_CLASS}
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Paragraph 2
// 						</label>
// 						<textarea
// 							className={INPUT_CLASS}
// 							rows={4}
// 							style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
// 							value={data.paragraph_2 || ""}
// 							onChange={(e) =>
// 								setData({ ...data, paragraph_2: e.target.value })
// 							}
// 						/>
// 					</div>

// 					<div>
// 						<label
// 							className={LABEL_CLASS}
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Paragraph 3
// 						</label>
// 						<textarea
// 							className={INPUT_CLASS}
// 							rows={4}
// 							style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
// 							value={data.paragraph_3 || ""}
// 							onChange={(e) =>
// 								setData({ ...data, paragraph_3: e.target.value })
// 							}
// 						/>
// 					</div>
// 				</div>

// 				{/* Right: Image */}
// 				<div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5">
// 					<h2
// 						className="text-white text-base font-medium"
// 						style={{ fontFamily: "'Outfit', sans-serif" }}
// 					>
// 						Artist Photo
// 					</h2>

// 					<ImageUploader
// 						currentUrl={data.image_url}
// 						onUpload={(url) => setData({ ...data, image_url: url })}
// 						folder="about"
// 						aspectRatio="aspect-[3/4]"
// 						label="Profile / Artist Image"
// 					/>

// 					{/* Preview of current values */}
// 					<div className="mt-auto p-4 rounded-lg bg-[#0a0a0a] border border-[#1e1e1e]">
// 						<p
// 							className="text-[#555] text-xs uppercase tracking-wider mb-2"
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Preview
// 						</p>
// 						<p
// 							className="text-[#c17a53] text-xs mb-1"
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							{data.eyebrow}
// 						</p>
// 						<p
// 							className="text-white text-base"
// 							style={{ fontFamily: "'Cormorant Garamond', serif" }}
// 						>
// 							{data.heading}
// 						</p>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Save Bar */}
// 			<div className="flex justify-end mt-6">
// 				<SaveButton saving={saving} saved={saved} onClick={handleSave} />
// 			</div>
// 		</div>
// 	);
// }
"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ImageUploader from "@/components/ImageUploader";
import SaveButton from "@/components/SaveButton";
import type { AboutSectionRow } from "@/lib/types/database";

const INPUT_CLASS =
  "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS =
  "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

// Only the fields the form can edit
type EditableAboutField =
  | "eyebrow"
  | "heading"
  | "paragraph_1"
  | "paragraph_2"
  | "paragraph_3"
  | "image_url";

export default function AboutAdminPage() {
  const [data, setData] = useState<AboutSectionRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((row: AboutSectionRow) => setData(row));
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (field: EditableAboutField, value: string) => {
    setData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (!data) {
    return (
      <div
        className="p-10 min-h-screen flex items-center justify-center"
        style={{ background: "#0a0a0a" }}
      >
        <div className="w-6 h-6 border-2 border-[#c17a53] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
      <SectionHeader
        title="About Section"
        description="Edit the artist bio, headings, and profile photo."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Text Fields */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5">
          <h2
            className="text-white text-base font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Text Content
          </h2>

          <div>
            <label
              className={LABEL_CLASS}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Eyebrow Label
            </label>
            <input
              className={INPUT_CLASS}
              style={{ fontFamily: "'Outfit', sans-serif" }}
              value={data.eyebrow}
              onChange={(e) => update("eyebrow", e.target.value)}
            />
          </div>

          <div>
            <label
              className={LABEL_CLASS}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Main Heading
            </label>
            <textarea
              className={INPUT_CLASS}
              rows={2}
              style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
              value={data.heading}
              onChange={(e) => update("heading", e.target.value)}
            />
            <p
              className="text-[#444] text-xs mt-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Use a line break to split the heading across two lines.
            </p>
          </div>

          <div>
            <label
              className={LABEL_CLASS}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Paragraph 1
            </label>
            <textarea
              className={INPUT_CLASS}
              rows={4}
              style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
              value={data.paragraph_1}
              onChange={(e) => update("paragraph_1", e.target.value)}
            />
          </div>

          <div>
            <label
              className={LABEL_CLASS}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Paragraph 2
            </label>
            <textarea
              className={INPUT_CLASS}
              rows={4}
              style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
              value={data.paragraph_2 ?? ""}
              onChange={(e) => update("paragraph_2", e.target.value)}
            />
          </div>

          <div>
            <label
              className={LABEL_CLASS}
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Paragraph 3
            </label>
            <textarea
              className={INPUT_CLASS}
              rows={4}
              style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
              value={data.paragraph_3 ?? ""}
              onChange={(e) => update("paragraph_3", e.target.value)}
            />
          </div>
        </div>

        {/* Right: Image */}
        <div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5">
          <h2
            className="text-white text-base font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Artist Photo
          </h2>

          <ImageUploader
            currentUrl={data.image_url}
            onUpload={(url) => update("image_url", url)}
            folder="about"
            aspectRatio="aspect-[3/4]"
            label="Profile / Artist Image"
          />

          {/* Preview of current values */}
          <div className="mt-auto p-4 rounded-lg bg-[#0a0a0a] border border-[#1e1e1e]">
            <p
              className="text-[#555] text-xs uppercase tracking-wider mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Preview
            </p>
            <p
              className="text-[#c17a53] text-xs mb-1"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {data.eyebrow}
            </p>
            <p
              className="text-white text-base"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {data.heading}
            </p>
          </div>
        </div>
      </div>

      {/* Save Bar */}
      <div className="flex justify-end mt-6">
        <SaveButton saving={saving} saved={saved} onClick={handleSave} />
      </div>
    </div>
  );
}