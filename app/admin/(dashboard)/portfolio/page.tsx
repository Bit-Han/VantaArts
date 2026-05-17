"use client";

import { useState } from "react";
import { Trash2, Edit2, Save, X, Loader2 } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type PortfolioWork = {
	id: string;
	title: string;
	category: string;
	image: string;
	description?: string;
	year?: string;
	medium?: string;
	featured: boolean;
	sort_order: number;
};

type PortfolioWorkForm = {
	title: string;
	category: string;
	image: string;
	description?: string;
	year?: string;
	medium?: string;
	featured: boolean;
	sort_order: number;
};

/* -------------------------------------------------------------------------- */
/* TEMP MOCK DATA                                                             */
/* -------------------------------------------------------------------------- */

const MOCK_WORKS: PortfolioWork[] = [
	{
		id: "1",
		title: "Ethereal Glow",
		category: "ink",
		image: "/assets/portfolio-1.jpg",
		description: "Fine line body artwork exploration.",
		year: "2025",
		medium: "Ink on Skin",
		featured: true,
		sort_order: 1,
	},
	{
		id: "2",
		title: "Frozen Momentum",
		category: "canvas",
		image: "/assets/portfolio-2.jpg",
		description: "Movement-inspired abstract form.",
		year: "2024",
		medium: "Acrylic on Canvas",
		featured: false,
		sort_order: 2,
	},
];

/* -------------------------------------------------------------------------- */
/* CONSTANTS                                                                  */
/* -------------------------------------------------------------------------- */

const EMPTY: PortfolioWorkForm = {
	title: "",
	category: "ink",
	image: "",
	description: "",
	year: new Date().getFullYear().toString(),
	medium: "",
	featured: false,
	sort_order: 0,
};

const CATEGORIES = ["ink", "canvas", "walls", "all"] as const;

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function AdminPortfolio() {
	const [works, setWorks] = useState<PortfolioWork[]>(MOCK_WORKS);

	const [form, setForm] = useState<PortfolioWorkForm>({
		...EMPTY,
	});

	const [editId, setEditId] = useState<string | null>(null);

	const [saving, setSaving] = useState(false);

	const [toast, setToast] = useState<string | null>(null);

	/* ---------------------------------------------------------------------- */
	/* HELPERS                                                                */
	/* ---------------------------------------------------------------------- */

	function showToast(msg: string) {
		setToast(msg);
		setTimeout(() => setToast(null), 2500);
	}

	function handleChange(
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) {
		const { name, value, type } = e.target;

		setForm((prev) => ({
			...prev,
			[name]:
				type === "checkbox"
					? (e.target as HTMLInputElement).checked
					: name === "sort_order"
						? parseInt(value) || 0
						: value,
		}));
	}

	/* ---------------------------------------------------------------------- */
	/* SAVE                                                                    */
	/* ---------------------------------------------------------------------- */

	async function handleSave() {
		if (!form.title.trim()) return;

		setSaving(true);

		await new Promise((resolve) => setTimeout(resolve, 700));

		if (editId) {
			setWorks((prev) =>
				prev.map((work) =>
					work.id === editId
						? {
								...work,
								...form,
							}
						: work,
				),
			);

			showToast("Work updated.");
			setEditId(null);
		} else {
			const newWork: PortfolioWork = {
				id: crypto.randomUUID(),
				...form,
			};

			setWorks((prev) => [...prev, newWork]);

			showToast("Work added.");
		}

		setForm({ ...EMPTY });

		setSaving(false);
	}

	/* ---------------------------------------------------------------------- */
	/* DELETE                                                                  */
	/* ---------------------------------------------------------------------- */

	function handleDelete(id: string) {
		const confirmed = confirm("Delete this work?");

		if (!confirmed) return;

		setWorks((prev) => prev.filter((w) => w.id !== id));

		showToast("Work deleted.");
	}

	/* ---------------------------------------------------------------------- */
	/* EDIT                                                                    */
	/* ---------------------------------------------------------------------- */

	function startEdit(work: PortfolioWork) {
		setEditId(work.id);

		setForm({
			title: work.title,
			category: work.category,
			image: work.image,
			description: work.description ?? "",
			year: work.year ?? "",
			medium: work.medium ?? "",
			featured: work.featured,
			sort_order: work.sort_order,
		});

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}

	function cancelEdit() {
		setEditId(null);
		setForm({ ...EMPTY });
	}

	/* ---------------------------------------------------------------------- */
	/* UI                                                                      */
	/* ---------------------------------------------------------------------- */

	return (
		<div className="relative">
			{/* TOAST */}
			{toast && (
				<div
					className="
            fixed top-5 right-5 z-[300]
            bg-[#111]
            border border-gold/40
            px-5 py-3
            font-body text-[0.72rem]
            text-gold tracking-widest uppercase
          "
				>
					{toast}
				</div>
			)}

			{/* HEADER */}
			<div className="flex items-center justify-between mb-8">
				<div>
					<h1 className="font-display text-[1.8rem] text-white">
						Portfolio Works
					</h1>

					<p className="font-body text-[0.68rem] text-dust mt-1">
						{works.length} works available
					</p>
				</div>
			</div>

			{/* FORM */}
			<div className="bg-[#111111] border border-white/[0.07] p-6 mb-8">
				<h2 className="font-display text-[1.1rem] text-white mb-6">
					{editId ? "Editing Work" : "Add New Work"}
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{/* TITLE */}
					<div className="md:col-span-2">
						<label className="block font-[Jost] text-[0.6rem] tracking-[0.15em] uppercase text-[#888888] mb-1.5">
							Title *
						</label>
						<input
							name="title"
							value={form.title}
							onChange={handleChange}
							placeholder="Work title"
							className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30"
						/>
					</div>

					{/* CATEGORY */}
					<div>
						<label className="block font-[Jost] text-[0.6rem] tracking-[0.15em] uppercase text-[#888888] mb-[6px]">
							Category *
						</label>

						<select
							name="category"
							value={form.category}
							onChange={handleChange}
							className="w-full border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30 bg-[#0a0a0a]"
						>
							{CATEGORIES.map((c) => (
								<option key={c} value={c}>
									{c.charAt(0).toUpperCase() + c.slice(1)}
								</option>
							))}
						</select>
					</div>

					{/* YEAR */}
					<div>
						<label className="block font-[Jost] text-[0.6rem] tracking-[0.15em] uppercase text-[#888888] mb-[6px]">
							Year
						</label>

						<input
							name="year"
							value={form.year ?? ""}
							onChange={handleChange}
							placeholder="2025"
							className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30"
						/>
					</div>

					{/* MEDIUM */}
					<div>
						<label className="block font-[Jost] text-[0.6rem] tracking-[0.15em] uppercase text-[#888888] mb-[6px]">
							Medium
						</label>

						<input
							name="medium"
							value={form.medium ?? ""}
							onChange={handleChange}
							placeholder="Oil on Canvas..."
							className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30"
						/>
					</div>

					{/* SORT */}
					<div>
						<label className="block font-[Jost] text-[0.6rem] tracking-[0.15em] uppercase text-[#888888] mb-[6px]">
							Sort Order
						</label>

						<input
							type="number"
							name="sort_order"
							value={form.sort_order}
							onChange={handleChange}
							className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30"
						/>
					</div>

					{/* DESCRIPTION */}
					<div className="md:col-span-2">
						<label className="block font-[Jost] text-[0.6rem] tracking-[0.15em] uppercase text-[#888888] mb-[6px]">
							Description
						</label>

						<textarea
							name="description"
							value={form.description ?? ""}
							onChange={handleChange}
							rows={3}
							placeholder="Short description..."
							className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30 resize-none"
						/>
					</div>

					{/* IMAGE */}
					<div className="md:col-span-2">
						<label className="block font-[Jost] text-[0.6rem] tracking-[0.15em] uppercase text-[#888888] mb-[6px]">
							Artwork Image URL
						</label>

						<input
							name="image"
							value={form.image}
							onChange={handleChange}
							placeholder="/assets/portfolio-1.jpg"
							className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30"
						/>

						{form.image && (
							<div className="mt-4 w-40 h-40 overflow-hidden bg-[#0a0a0a] border border-white/[0.06]">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={form.image}
									alt=""
									className="w-full h-full object-cover"
								/>
							</div>
						)}
					</div>

					{/* FEATURED */}
					<div className="md:col-span-2 flex items-center gap-2.5">
						<input
							type="checkbox"
							id="featured"
							name="featured"
							checked={form.featured}
							onChange={handleChange}
							className="accent-gold w-4 h-4"
						/>

						<label
							htmlFor="featured"
							className="
                font-body text-[0.65rem]
                tracking-[0.12em]
                uppercase text-dust
              "
						>
							Featured on Home Page
						</label>
					</div>
				</div>

				{/* BUTTONS */}
				<div className="flex gap-3 mt-6">
					<button
						onClick={handleSave}
						disabled={saving || !form.title.trim()}
						className="inline-flex items-center justify-center gap-2 border border-[#c9a96e] px-[26px] py-[11px] font-[Jost] font-light text-[0.68rem] tracking-[0.2em] uppercase text-[#c9a96e] bg-transparent cursor-pointer no-underline transition-colors duration-200 hover:bg-[#c9a96e] hover:text-black flex items-center gap-2 text-[0.65rem]"
					>
						{saving ? (
							<>
								<Loader2 size={13} className="animate-spin" />
								Saving...
							</>
						) : (
							<>
								<Save size={13} />
								{editId ? "Update Work" : "Add Work"}
							</>
						)}
					</button>

					{editId && (
						<button
							onClick={cancelEdit}
							className="inline-flex items-center justify-center gap-2 border border-white/25 px-[26px] py-[11px] font-[Jost] font-light text-[0.68rem] tracking-[0.2em] uppercase text-white bg-transparent cursor-pointer no-underline transition-colors duration-200 hover:border-white hover:text-white flex items-center gap-2 text-[0.65rem]"
						>
							<X size={13} />
							Cancel
						</button>
					)}
				</div>
			</div>

			{/* WORKS LIST */}
			<div className="flex flex-col gap-2">
				{works.map((work) => (
					<div
						key={work.id}
						className="
              bg-[#111111]
              border border-white/[0.07]
              p-4
              flex items-center gap-4
              hover:border-white/15
              transition-colors
            "
					>
						{/* THUMBNAIL */}
						<div className="w-14 h-14 flex-shrink-0 overflow-hidden bg-[#1a1a1a]">
							{work.image && (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={work.image}
									alt=""
									className="w-full h-full object-cover opacity-75"
								/>
							)}
						</div>

						{/* INFO */}
						<div className="flex-1 min-w-0">
							<p className="font-display text-white truncate">{work.title}</p>

							<p
								className="
                  font-body text-[0.6rem]
                  text-dust uppercase
                  tracking-[0.1em]
                  mt-0.5
                "
							>
								{work.category} · {work.medium} · {work.year}
								{work.featured && " · ⭐ featured"}
							</p>
						</div>

						{/* ACTIONS */}
						<div className="flex gap-1 flex-shrink-0">
							<button
								onClick={() => startEdit(work)}
								className="p-2 text-dust hover:text-white transition-colors"
								title="Edit"
							>
								<Edit2 size={13} />
							</button>

							<button
								onClick={() => handleDelete(work.id)}
								className="p-2 text-dust hover:text-red-400 transition-colors"
								title="Delete"
							>
								<Trash2 size={13} />
							</button>
						</div>
					</div>
				))}

				{works.length === 0 && (
					<div
						className="
              text-center py-12
              text-dust font-body text-sm
              tracking-widest uppercase
            "
					>
						No works available.
					</div>
				)}
			</div>
		</div>
	);
}
