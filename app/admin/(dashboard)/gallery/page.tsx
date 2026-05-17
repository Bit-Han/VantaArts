// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import SectionHeader from "../_components/SectionHeader";
// import { Plus, Trash2, Upload, Loader } from "lucide-react";

// const CATEGORIES = ["inks", "canvas", "walls"] as const;

// export default function GalleryAdminPage() {
// 	const [items, setItems] = useState<any[]>([]);
// 	const [filter, setFilter] = useState("all");
// 	const [uploading, setUploading] = useState(false);
// 	const [deleting, setDeleting] = useState<string | null>(null);

// 	useEffect(() => {
// 		fetch("/api/admin/gallery")
// 			.then((r) => r.json())
// 			.then(setItems);
// 	}, []);

// 	const handleUpload = async (files: FileList | null) => {
// 		if (!files) return;
// 		setUploading(true);

// 		for (const file of Array.from(files)) {
// 			const fd = new FormData();
// 			fd.append("file", file);
// 			fd.append("folder", "gallery");

// 			const res = await fetch("/api/admin/upload", {
// 				method: "POST",
// 				body: fd,
// 			});
// 			const { url } = await res.json();

// 			if (url) {
// 				await fetch("/api/admin/gallery", {
// 					method: "POST",
// 					headers: { "Content-Type": "application/json" },
// 					body: JSON.stringify({
// 						image_url: url,
// 						category: "inks",
// 						title: file.name.split(".")[0],
// 						sort_order: items.length,
// 					}),
// 				});
// 			}
// 		}

// 		const res = await fetch("/api/admin/gallery");
// 		setItems(await res.json());
// 		setUploading(false);
// 	};

// 	const handleDelete = async (id: string) => {
// 		if (!confirm("Remove this gallery image?")) return;
// 		setDeleting(id);
// 		await fetch("/api/admin/gallery", {
// 			method: "DELETE",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ id }),
// 		});
// 		setItems((prev) => prev.filter((i) => i.id !== id));
// 		setDeleting(null);
// 	};

// 	const updateCategory = async (id: string, category: string) => {
// 		setItems((prev) => prev.map((i) => (i.id === id ? { ...i, category } : i)));
// 		await fetch("/api/admin/gallery", {
// 			method: "PUT",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({ id, category }),
// 		});
// 	};

// 	const updateTitle = async (id: string, title: string) => {
// 		setItems((prev) => prev.map((i) => (i.id === id ? { ...i, title } : i)));
// 	};

// 	const saveTitle = async (item: any) => {
// 		await fetch("/api/admin/gallery", {
// 			method: "PUT",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(item),
// 		});
// 	};

// 	const filtered =
// 		filter === "all" ? items : items.filter((i) => i.category === filter);

// 	return (
// 		<div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
// 			<div className="flex items-start justify-between mb-2">
// 				<SectionHeader
// 					title="Gallery"
// 					description="Upload and manage portfolio images."
// 				/>

// 				{/* Upload Button */}
// 				<label
// 					className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wide uppercase cursor-pointer transition-colors mt-8"
// 					style={{
// 						background: "#c17a53",
// 						color: "#0a0a0a",
// 						fontFamily: "'Outfit', sans-serif",
// 						whiteSpace: "nowrap",
// 					}}
// 				>
// 					{uploading ? (
// 						<Loader size={14} className="animate-spin" />
// 					) : (
// 						<Upload size={14} />
// 					)}
// 					{uploading ? "Uploading..." : "Upload Images"}
// 					<input
// 						type="file"
// 						multiple
// 						accept="image/*"
// 						className="hidden"
// 						onChange={(e) => handleUpload(e.target.files)}
// 						disabled={uploading}
// 					/>
// 				</label>
// 			</div>

// 			{/* Filter Tabs */}
// 			<div className="flex gap-2 mb-8">
// 				{["all", ...CATEGORIES].map((f) => (
// 					<button
// 						key={f}
// 						onClick={() => setFilter(f)}
// 						className="px-4 py-2 rounded-full text-xs tracking-wide uppercase transition-all duration-200"
// 						style={{
// 							background: filter === f ? "#c17a53" : "#111",
// 							color: filter === f ? "#0a0a0a" : "#666",
// 							fontFamily: "'Outfit', sans-serif",
// 							border: filter === f ? "none" : "1px solid #1e1e1e",
// 						}}
// 					>
// 						{f}
// 					</button>
// 				))}
// 				<span
// 					className="ml-auto text-[#444] text-xs self-center"
// 					style={{ fontFamily: "'Outfit', sans-serif" }}
// 				>
// 					{filtered.length} items
// 				</span>
// 			</div>

// 			{/* Grid */}
// 			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// 				{filtered.map((item) => (
// 					<div
// 						key={item.id}
// 						className="group relative rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-[#c17a53]/30 transition-colors"
// 						style={{ background: "#111" }}
// 					>
// 						{/* Image */}
// 						<div className="relative aspect-square">
// 							<Image
// 								src={item.image_url}
// 								alt={item.title}
// 								fill
// 								className="object-cover"
// 							/>
// 							{deleting === item.id && (
// 								<div className="absolute inset-0 flex items-center justify-center bg-black/60">
// 									<Loader size={20} className="animate-spin text-white" />
// 								</div>
// 							)}
// 							{/* Delete button */}
// 							<button
// 								onClick={() => handleDelete(item.id)}
// 								className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
// 							>
// 								<Trash2 size={12} className="text-white" />
// 							</button>
// 						</div>

// 						{/* Controls */}
// 						<div className="p-3 flex flex-col gap-2">
// 							<input
// 								className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs outline-none focus:border-[#c17a53]"
// 								style={{ fontFamily: "'Outfit', sans-serif" }}
// 								value={item.title}
// 								onChange={(e) => updateTitle(item.id, e.target.value)}
// 								onBlur={() => saveTitle(item)}
// 								placeholder="Title..."
// 							/>
// 							<select
// 								className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs outline-none focus:border-[#c17a53]"
// 								style={{ fontFamily: "'Outfit', sans-serif" }}
// 								value={item.category}
// 								onChange={(e) => updateCategory(item.id, e.target.value)}
// 							>
// 								{CATEGORIES.map((c) => (
// 									<option key={c} value={c}>
// 										{c}
// 									</option>
// 								))}
// 							</select>
// 						</div>
// 					</div>
// 				))}

// 				{/* Empty upload slot */}
// 				<label
// 					className="relative rounded-xl overflow-hidden border-2 border-dashed border-[#2a2a2a] hover:border-[#c17a53] transition-colors cursor-pointer flex items-center justify-center aspect-square"
// 					style={{ background: "#0a0a0a" }}
// 				>
// 					<div className="flex flex-col items-center gap-2 text-[#555]">
// 						<Plus size={20} />
// 						<span
// 							className="text-xs"
// 							style={{ fontFamily: "'Outfit', sans-serif" }}
// 						>
// 							Add Image
// 						</span>
// 					</div>
// 					<input
// 						type="file"
// 						multiple
// 						accept="image/*"
// 						className="hidden"
// 						onChange={(e) => handleUpload(e.target.files)}
// 						disabled={uploading}
// 					/>
// 				</label>
// 			</div>
// 		</div>
// 	);
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { Plus, Trash2, Upload, Loader } from "lucide-react";
import type { GalleryItemRow } from "@/lib/types/database";

const CATEGORIES = ["inks", "canvas", "walls"] as const;
type Category = (typeof CATEGORIES)[number];

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItemRow[]>([]);
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then((data: GalleryItemRow[]) => setItems(data));
  }, []);

  const handleUpload = async (files: FileList | null) => {
    if (!files) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "gallery");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const { url }: { url: string } = await res.json();

      if (url) {
        await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: url,
            category: "inks" as Category,
            title: file.name.split(".")[0],
            sort_order: items.length,
          }),
        });
      }
    }

    const res = await fetch("/api/admin/gallery");
    const data: GalleryItemRow[] = await res.json();
    setItems(data);
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this gallery image?")) return;
    setDeleting(id);
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleting(null);
  };

  const updateCategory = async (id: string, category: Category) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, category } : i))
    );
    await fetch("/api/admin/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, category }),
    });
  };

  const updateTitle = (id: string, title: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, title } : i)));
  };

  const saveTitle = async (item: GalleryItemRow) => {
    await fetch("/api/admin/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
  };

  const filtered: GalleryItemRow[] =
    filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
      <div className="flex items-start justify-between mb-2">
        <SectionHeader
          title="Gallery"
          description="Upload and manage portfolio images."
        />

        {/* Upload Button */}
        <label
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wide uppercase cursor-pointer transition-colors mt-8"
          style={{
            background: "#c17a53",
            color: "#0a0a0a",
            fontFamily: "'Outfit', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {uploading ? (
            <Loader size={14} className="animate-spin" />
          ) : (
            <Upload size={14} />
          )}
          {uploading ? "Uploading..." : "Upload Images"}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        {(["all", ...CATEGORIES] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-full text-xs tracking-wide uppercase transition-all duration-200"
            style={{
              background: filter === f ? "#c17a53" : "#111",
              color: filter === f ? "#0a0a0a" : "#666",
              fontFamily: "'Outfit', sans-serif",
              border: filter === f ? "none" : "1px solid #1e1e1e",
            }}
          >
            {f}
          </button>
        ))}
        <span
          className="ml-auto text-[#444] text-xs self-center"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {filtered.length} items
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-[#c17a53]/30 transition-colors"
            style={{ background: "#111" }}
          >
            {/* Image */}
            <div className="relative aspect-square">
              <Image
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
              />
              {deleting === item.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Loader size={20} className="animate-spin text-white" />
                </div>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 size={12} className="text-white" />
              </button>
            </div>

            {/* Controls */}
            <div className="p-3 flex flex-col gap-2">
              <input
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs outline-none focus:border-[#c17a53]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                value={item.title}
                onChange={(e) => updateTitle(item.id, e.target.value)}
                onBlur={() => saveTitle(item)}
                placeholder="Title..."
              />
              <select
                className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-2 py-1.5 text-white text-xs outline-none focus:border-[#c17a53]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
                value={item.category}
                onChange={(e) =>
                  updateCategory(item.id, e.target.value as Category)
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {/* Empty upload slot */}
        <label
          className="relative rounded-xl overflow-hidden border-2 border-dashed border-[#2a2a2a] hover:border-[#c17a53] transition-colors cursor-pointer flex items-center justify-center aspect-square"
          style={{ background: "#0a0a0a" }}
        >
          <div className="flex flex-col items-center gap-2 text-[#555]">
            <Plus size={20} />
            <span className="text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Add Image
            </span>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}