"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ImageUploader from "@/components/ImageUploader";
import SaveButton from "@/components/SaveButton";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import type { ProjectRow, ProjectPricingRow } from "@/lib/types/database";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectAdmin extends ProjectRow {
	pricing: ProjectPricingRow[];
}

interface PricingItem {
	name: string;
	price: string;
	note: string | null;
}

interface ProjectFormState {
	slug: string;
	title: string;
	category: "inks" | "canvas" | "walls";
	description: string;
	featured_image_url: string;
	is_featured: boolean;
	is_active: boolean;
	sort_order: number;
	pricing: PricingItem[];
}

const INPUT_CLASS =
	"w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS = "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

const BLANK: ProjectFormState = {
	slug: "",
	title: "",
	category: "inks",
	description: "",
	featured_image_url: "",
	is_featured: false,
	is_active: true,
	sort_order: 0,
	pricing: [],
};

function slugify(title: string) {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsAdminPage() {
	const [projects, setProjects] = useState<ProjectAdmin[]>([]);
	const [expanded, setExpanded] = useState<string | null>(null);
	const [saving, setSaving] = useState<string | null>(null);
	const [saved, setSaved] = useState<string | null>(null);
	const [adding, setAdding] = useState(false);
	const [newProject, setNewProject] = useState<ProjectFormState>({ ...BLANK });

	useEffect(() => {
		fetch("/api/admin/projects")
			.then((r) => r.json())
			.then((data: ProjectAdmin[] | { error: string }) =>
				setProjects(Array.isArray(data) ? data : []),
			);
	}, []);

	const handleSave = async (project: ProjectAdmin) => {
		setSaving(project.id);
		await fetch("/api/admin/projects", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(project),
		});
		setSaving(null);
		setSaved(project.id);
		setTimeout(() => setSaved(null), 2000);
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this project? This cannot be undone.")) return;
		await fetch("/api/admin/projects", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		setProjects((prev) => prev.filter((p) => p.id !== id));
	};

	const handleAdd = async () => {
		await fetch("/api/admin/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...newProject, sort_order: projects.length }),
		});
		const res = await fetch("/api/admin/projects");
		const data: ProjectAdmin[] | { error: string } = await res.json();
		setProjects(Array.isArray(data) ? data : []);
		setAdding(false);
		setNewProject({ ...BLANK });
	};

	function update<K extends keyof ProjectAdmin>(
		id: string,
		field: K,
		value: ProjectAdmin[K],
	) {
		setProjects((prev) =>
			prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
		);
	}

	const updatePricing = (
		projId: string,
		idx: number,
		field: keyof PricingItem,
		value: string,
	) => {
		setProjects((prev) =>
			prev.map((p) => {
				if (p.id !== projId) return p;
				const pricing = [...p.pricing];
				pricing[idx] = { ...pricing[idx], [field]: value };
				return { ...p, pricing };
			}),
		);
	};

	const addPricing = (projId: string) => {
		setProjects((prev) =>
			prev.map((p) =>
				p.id === projId
					? {
							...p,
							pricing: [
								...p.pricing,
								{
									id: crypto.randomUUID(),
									project_id: projId,
									name: "",
									price: "",
									note: null,
									sort_order: p.pricing.length,
								},
							],
						}
					: p,
			),
		);
	};

	const removePricing = (projId: string, idx: number) => {
		setProjects((prev) =>
			prev.map((p) =>
				p.id === projId
					? { ...p, pricing: p.pricing.filter((_, i) => i !== idx) }
					: p,
			),
		);
	};

	return (
		<div className="p-6 md:p-10 min-h-screen bg-[#0a0a0a]">
			<div className="flex items-start justify-between mb-6">
				<SectionHeader
					title="Projects"
					description="Manage all portfolio projects, pricing, and featured selection."
				/>
				<button
					onClick={() => setAdding(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wide uppercase text-[#c17a53] border border-[#c17a53] hover:bg-[#c17a53] hover:text-black transition-colors mt-8"
					style={{ fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}
				>
					<Plus size={14} /> Add Project
				</button>
			</div>

			{/* ── Add New Form ───────────────────────────────────────────────────── */}
			{adding && (
				<div className="bg-[#111] border border-[#c17a53]/30 rounded-xl p-6 mb-6">
					<h3
						className="text-white text-sm font-medium mb-5"
						style={{ fontFamily: "'Outfit', sans-serif" }}
					>
						New Project
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<ImageUploader
							currentUrl={newProject.featured_image_url}
							onUpload={(url) =>
								setNewProject((p) => ({ ...p, featured_image_url: url }))
							}
							folder="projects"
							aspectRatio="aspect-video"
							label="Featured Image"
						/>

						<div className="flex flex-col gap-4">
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
									value={newProject.title}
									onChange={(e) => {
										const title = e.target.value;
										setNewProject((p) => ({
											...p,
											title,
											slug:
												p.slug === "" || p.slug === slugify(p.title)
													? slugify(title)
													: p.slug,
										}));
									}}
								/>
							</div>

							<div>
								<label
									className={LABEL_CLASS}
									style={{ fontFamily: "'Outfit', sans-serif" }}
								>
									URL Slug (/{newProject.category}/{newProject.slug || "..."})
								</label>
								<input
									className={INPUT_CLASS}
									style={{ fontFamily: "'Outfit', sans-serif" }}
									value={newProject.slug}
									onChange={(e) =>
										setNewProject((p) => ({
											...p,
											slug: slugify(e.target.value),
										}))
									}
								/>
							</div>

							<div>
								<label
									className={LABEL_CLASS}
									style={{ fontFamily: "'Outfit', sans-serif" }}
								>
									Category
								</label>
								<select
									className={INPUT_CLASS}
									style={{ fontFamily: "'Outfit', sans-serif" }}
									value={newProject.category}
									onChange={(e) =>
										setNewProject((p) => ({
											...p,
											category: e.target.value as ProjectFormState["category"],
										}))
									}
								>
									<option value="inks">Inks</option>
									<option value="canvas">Canvas</option>
									<option value="walls">Walls</option>
								</select>
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
									value={newProject.description}
									onChange={(e) =>
										setNewProject((p) => ({
											...p,
											description: e.target.value,
										}))
									}
								/>
							</div>

							{/* ── Fixed: uses newProject not project ── */}
							<div className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={newProject.is_featured}
									onChange={(e) =>
										setNewProject((p) => ({
											...p,
											is_featured: e.target.checked,
										}))
									}
									className="accent-[#c17a53]"
								/>
								<label
									className="text-[#666] text-xs uppercase tracking-wider"
									style={{ fontFamily: "'Outfit', sans-serif" }}
								>
									Featured on homepage
								</label>
							</div>

							<div className="flex items-center gap-3">
								<input
									type="checkbox"
									checked={newProject.is_active}
									onChange={(e) =>
										setNewProject((p) => ({
											...p,
											is_active: e.target.checked,
										}))
									}
									className="accent-[#c17a53]"
								/>
								<label
									className="text-[#666] text-xs uppercase tracking-wider"
									style={{ fontFamily: "'Outfit', sans-serif" }}
								>
									Active (visible on site)
								</label>
							</div>
						</div>
					</div>

					{/* Pricing for new project */}
					<div className="mb-5">
						<div className="flex items-center justify-between mb-3">
							<label
								className={LABEL_CLASS}
								style={{ fontFamily: "'Outfit', sans-serif" }}
							>
								Pricing Tiers
							</label>
							<button
								onClick={() =>
									setNewProject((p) => ({
										...p,
										pricing: [
											...p.pricing,
											{ name: "", price: "", note: null },
										],
									}))
								}
								className="text-[#c17a53] text-xs flex items-center gap-1 hover:underline"
								style={{ fontFamily: "'Outfit', sans-serif" }}
							>
								<Plus size={12} /> Add Tier
							</button>
						</div>
						<div className="flex flex-col gap-3">
							{newProject.pricing.map((p, i) => (
								<div key={i} className="grid grid-cols-3 gap-3 items-center">
									<input
										className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
										style={{ fontFamily: "'Outfit', sans-serif" }}
										placeholder="Tier name"
										value={p.name}
										onChange={(e) => {
											const pricing = [...newProject.pricing];
											pricing[i] = { ...pricing[i], name: e.target.value };
											setNewProject((prev) => ({ ...prev, pricing }));
										}}
									/>
									<input
										className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
										style={{ fontFamily: "'Outfit', sans-serif" }}
										placeholder="₦10,000"
										value={p.price}
										onChange={(e) => {
											const pricing = [...newProject.pricing];
											pricing[i] = { ...pricing[i], price: e.target.value };
											setNewProject((prev) => ({ ...prev, pricing }));
										}}
									/>
									<div className="flex gap-2 items-center">
										<input
											className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
											style={{ fontFamily: "'Outfit', sans-serif" }}
											placeholder="Note (optional)"
											value={p.note ?? ""}
											onChange={(e) => {
												const pricing = [...newProject.pricing];
												pricing[i] = { ...pricing[i], note: e.target.value };
												setNewProject((prev) => ({ ...prev, pricing }));
											}}
										/>
										<button
											onClick={() =>
												setNewProject((prev) => ({
													...prev,
													pricing: prev.pricing.filter((_, idx) => idx !== i),
												}))
											}
											className="text-[#333] hover:text-red-400 transition-colors flex-shrink-0"
										>
											<Trash2 size={14} />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="flex gap-3">
						<button
							onClick={handleAdd}
							className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-medium text-black"
							style={{
								background: "#c17a53",
								fontFamily: "'Outfit', sans-serif",
							}}
						>
							Add Project
						</button>
						<button
							onClick={() => {
								setAdding(false);
								setNewProject({ ...BLANK });
							}}
							className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-medium text-[#666] border border-[#2a2a2a]"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* ── Projects List ──────────────────────────────────────────────────── */}
			<div className="flex flex-col gap-4">
				{projects.map((project, i) => (
					<div
						key={project.id}
						className="bg-[#111] border border-[#1e1e1e] rounded-xl overflow-hidden"
					>
						{/* Accordion Header */}
						<div
							className="flex items-center justify-between p-5 cursor-pointer hover:bg-[#151515] transition-colors"
							onClick={() =>
								setExpanded(expanded === project.id ? null : project.id)
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
										{project.title || "Untitled"}
										{project.is_featured && (
											<span className="ml-2 text-[#c17a53] text-[10px] uppercase tracking-wider">
												★ Featured
											</span>
										)}
									</p>
									<p
										className="text-[#555] text-xs"
										style={{ fontFamily: "'Outfit', sans-serif" }}
									>
										{project.category} · /{project.category}/{project.slug}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(project.id);
									}}
									className="text-[#333] hover:text-red-400 transition-colors"
								>
									<Trash2 size={15} />
								</button>
								{expanded === project.id ? (
									<ChevronUp size={16} className="text-[#555]" />
								) : (
									<ChevronDown size={16} className="text-[#555]" />
								)}
							</div>
						</div>

						{/* Accordion Body */}
						{expanded === project.id && (
							<div className="p-5 pt-0 border-t border-[#1e1e1e]">
								<div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
									<ImageUploader
										currentUrl={project.featured_image_url}
										onUpload={(url) =>
											update(project.id, "featured_image_url", url)
										}
										folder="projects"
										aspectRatio="aspect-video"
										label="Featured Image"
									/>

									<div className="flex flex-col gap-4">
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
												value={project.title}
												onChange={(e) =>
													update(project.id, "title", e.target.value)
												}
											/>
										</div>

										<div>
											<label
												className={LABEL_CLASS}
												style={{ fontFamily: "'Outfit', sans-serif" }}
											>
												URL Slug (/{project.category}/{project.slug})
											</label>
											<input
												className={INPUT_CLASS}
												style={{ fontFamily: "'Outfit', sans-serif" }}
												value={project.slug}
												onChange={(e) =>
													update(project.id, "slug", slugify(e.target.value))
												}
											/>
										</div>

										<div>
											<label
												className={LABEL_CLASS}
												style={{ fontFamily: "'Outfit', sans-serif" }}
											>
												Category
											</label>
											<select
												className={INPUT_CLASS}
												style={{ fontFamily: "'Outfit', sans-serif" }}
												value={project.category}
												onChange={(e) =>
													update(
														project.id,
														"category",
														e.target.value as ProjectRow["category"],
													)
												}
											>
												<option value="inks">Inks</option>
												<option value="canvas">Canvas</option>
												<option value="walls">Walls</option>
											</select>
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
												rows={4}
												style={{
													fontFamily: "'Outfit', sans-serif",
													resize: "none",
												}}
												value={project.description}
												onChange={(e) =>
													update(project.id, "description", e.target.value)
												}
											/>
										</div>

										{/* ── Fixed: no featuredCount, no disabled ── */}
										<div className="flex items-center gap-3">
											<input
												type="checkbox"
												checked={project.is_featured}
												onChange={(e) =>
													update(project.id, "is_featured", e.target.checked)
												}
												className="accent-[#c17a53]"
											/>
											<label
												className="text-[#666] text-xs uppercase tracking-wider"
												style={{ fontFamily: "'Outfit', sans-serif" }}
											>
												Featured on homepage
											</label>
										</div>

										<div className="flex items-center gap-3">
											<input
												type="checkbox"
												checked={project.is_active}
												onChange={(e) =>
													update(project.id, "is_active", e.target.checked)
												}
												className="accent-[#c17a53]"
											/>
											<label
												className="text-[#666] text-xs uppercase tracking-wider"
												style={{ fontFamily: "'Outfit', sans-serif" }}
											>
												Active (visible on site)
											</label>
										</div>
									</div>
								</div>

								{/* Pricing */}
								<div className="mb-5">
									<div className="flex items-center justify-between mb-3">
										<label
											className={LABEL_CLASS}
											style={{ fontFamily: "'Outfit', sans-serif" }}
										>
											Pricing Tiers
										</label>
										<button
											onClick={() => addPricing(project.id)}
											className="text-[#c17a53] text-xs flex items-center gap-1 hover:underline"
											style={{ fontFamily: "'Outfit', sans-serif" }}
										>
											<Plus size={12} /> Add Tier
										</button>
									</div>
									<div className="flex flex-col gap-3">
										{project.pricing.map((p, idx) => (
											<div
												key={p.id ?? idx}
												className="grid grid-cols-3 gap-3 items-center"
											>
												<input
													className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
													style={{ fontFamily: "'Outfit', sans-serif" }}
													placeholder="Tier name"
													value={p.name}
													onChange={(e) =>
														updatePricing(
															project.id,
															idx,
															"name",
															e.target.value,
														)
													}
												/>
												<input
													className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
													style={{ fontFamily: "'Outfit', sans-serif" }}
													placeholder="₦10,000"
													value={p.price}
													onChange={(e) =>
														updatePricing(
															project.id,
															idx,
															"price",
															e.target.value,
														)
													}
												/>
												<div className="flex gap-2 items-center">
													<input
														className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
														style={{ fontFamily: "'Outfit', sans-serif" }}
														placeholder="Note (optional)"
														value={p.note ?? ""}
														onChange={(e) =>
															updatePricing(
																project.id,
																idx,
																"note",
																e.target.value,
															)
														}
													/>
													<button
														onClick={() => removePricing(project.id, idx)}
														className="text-[#333] hover:text-red-400 transition-colors flex-shrink-0"
													>
														<Trash2 size={14} />
													</button>
												</div>
											</div>
										))}
									</div>
								</div>

								<div className="flex justify-end">
									<SaveButton
										saving={saving === project.id}
										saved={saved === project.id}
										onClick={() => handleSave(project)}
									/>
								</div>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}