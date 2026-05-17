"use client";

// import { useEffect, useState } from "react";
// import SectionHeader from "../_components/SectionHeader";
// import SaveButton from "../_components/SaveButton";
// import { Plus, Trash2, Star } from "lucide-react";

// const INPUT_CLASS = "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
// const LABEL_CLASS = "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";
// const BLANK = { name: "", role: "", quote: "", rating: 5 };

// export default function TestimonialsAdminPage() {
//   const [testimonials, setTestimonials] = useState<any[]>([]);
//   const [saving, setSaving] = useState<string | null>(null);
//   const [saved, setSaved] = useState<string | null>(null);
//   const [adding, setAdding] = useState(false);
//   const [newT, setNewT] = useState({ ...BLANK });

//   useEffect(() => {
//     fetch("/api/admin/testimonials").then((r) => r.json()).then(setTestimonials);
//   }, []);

//   const handleSave = async (t: any) => {
//     setSaving(t.id);
//     await fetch("/api/admin/testimonials", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(t),
//     });
//     setSaving(null);
//     setSaved(t.id);
//     setTimeout(() => setSaved(null), 2000);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this testimonial?")) return;
//     await fetch("/api/admin/testimonials", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });
//     setTestimonials((prev) => prev.filter((t) => t.id !== id));
//   };

//   const handleAdd = async () => {
//     await fetch("/api/admin/testimonials", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...newT, sort_order: testimonials.length }),
//     });
//     const res = await fetch("/api/admin/testimonials");
//     setTestimonials(await res.json());
//     setAdding(false);
//     setNewT({ ...BLANK });
//   };

//   const update = (id: string, field: string, value: any) => {
//     setTestimonials((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
//   };

//   return (
//     <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
//       <div className="flex items-start justify-between mb-2">
//         <SectionHeader title="Testimonials" description="Add, edit, or remove client reviews." />
//         <button
//           onClick={() => setAdding(true)}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wide uppercase text-[#c17a53] border border-[#c17a53] hover:bg-[#c17a53] hover:text-black transition-colors mt-8"
//           style={{ fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}
//         >
//           <Plus size={14} /> Add Review
//         </button>
//       </div>

//       {adding && (
//         <div className="bg-[#111] border border-[#c17a53]/30 rounded-xl p-6 mb-6">
//           <h3 className="text-white text-sm font-medium mb-5" style={{ fontFamily: "'Outfit', sans-serif" }}>New Testimonial</h3>
//           <TestimonialForm data={newT} onChange={(f, v) => setNewT((p) => ({ ...p, [f]: v }))} />
//           <div className="flex gap-3 mt-5">
//             <button onClick={handleAdd} className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-medium text-black" style={{ background: "#c17a53", fontFamily: "'Outfit', sans-serif" }}>Add Review</button>
//             <button onClick={() => setAdding(false)} className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-medium text-[#666] border border-[#2a2a2a]" style={{ fontFamily: "'Outfit', sans-serif" }}>Cancel</button>
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col gap-4">
//         {testimonials.map((t) => (
//           <div key={t.id} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6">
//             <div className="flex items-start justify-between mb-5">
//               <div>
//                 <p className="text-white text-sm font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>{t.name || "New Testimonial"}</p>
//                 <p className="text-[#555] text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>{t.role}</p>
//               </div>
//               <button onClick={() => handleDelete(t.id)} className="text-[#333] hover:text-red-400 transition-colors">
//                 <Trash2 size={15} />
//               </button>
//             </div>
//             <TestimonialForm data={t} onChange={(f, v) => update(t.id, f, v)} />
//             <div className="flex justify-end mt-5">
//               <SaveButton saving={saving === t.id} saved={saved === t.id} onClick={() => handleSave(t)} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function TestimonialForm({ data, onChange }: { data: any; onChange: (f: string, v: any) => void }) {
//   const INPUT_CLASS = "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
//   const LABEL_CLASS = "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//       <div>
//         <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Client Name</label>
//         <input className={INPUT_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }} value={data.name} onChange={(e) => onChange("name", e.target.value)} />
//       </div>
//       <div>
//         <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Role / Occasion</label>
//         <input className={INPUT_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }} value={data.role} onChange={(e) => onChange("role", e.target.value)} />
//       </div>
//       <div className="md:col-span-2">
//         <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Quote</label>
//         <textarea className={INPUT_CLASS} rows={3} style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }} value={data.quote} onChange={(e) => onChange("quote", e.target.value)} />
//       </div>
//       <div>
//         <label className={LABEL_CLASS} style={{ fontFamily: "'Outfit', sans-serif" }}>Rating</label>
//         <div className="flex items-center gap-2 mt-1">
//           {[1, 2, 3, 4, 5].map((n) => (
//             <button key={n} onClick={() => onChange("rating", n)}>
//               <Star size={20} className={n <= data.rating ? "fill-[#c17a53] text-[#c17a53]" : "text-[#333]"} />
//             </button>
//           ))}
//           <span className="text-[#666] text-xs ml-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{data.rating}/5</span>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import SaveButton from "@/components/SaveButton";
import { Plus, Trash2, Star } from "lucide-react";
import type { TestimonialRow } from "@/lib/types/database";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestimonialFormState {
	name: string;
	role: string;
	quote: string;
	rating: number;
}

type Testimonial = TestimonialRow;

const INPUT_CLASS =
	"w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS = "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

const BLANK: TestimonialFormState = {
	name: "",
	role: "",
	quote: "",
	rating: 5,
};

export default function TestimonialsAdminPage() {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [saving, setSaving] = useState<string | null>(null);
	const [saved, setSaved] = useState<string | null>(null);
	const [adding, setAdding] = useState(false);
	const [newT, setNewT] = useState<TestimonialFormState>({ ...BLANK });

	useEffect(() => {
		fetch("/api/admin/testimonials")
			.then((r) => r.json())
			.then((data: Testimonial[]) => setTestimonials(data));
	}, []);

	const handleSave = async (t: Testimonial) => {
		setSaving(t.id);
		await fetch("/api/admin/testimonials", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(t),
		});
		setSaving(null);
		setSaved(t.id);
		setTimeout(() => setSaved(null), 2000);
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Delete this testimonial?")) return;
		await fetch("/api/admin/testimonials", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		setTestimonials((prev) => prev.filter((t) => t.id !== id));
	};

	const handleAdd = async () => {
		await fetch("/api/admin/testimonials", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...newT, sort_order: testimonials.length }),
		});
		const res = await fetch("/api/admin/testimonials");
		const data: Testimonial[] = await res.json();
		setTestimonials(data);
		setAdding(false);
		setNewT({ ...BLANK });
	};

	const update = (
		id: string,
		field: keyof TestimonialFormState,
		value: string | number,
	) => {
		setTestimonials((prev) =>
			prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)),
		);
	};

	return (
		<div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
			<div className="flex items-start justify-between mb-2">
				<SectionHeader
					title="Testimonials"
					description="Add, edit, or remove client reviews."
				/>
				<button
					onClick={() => setAdding(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs tracking-wide uppercase text-[#c17a53] border border-[#c17a53] hover:bg-[#c17a53] hover:text-black transition-colors mt-8"
					style={{ fontFamily: "'Outfit', sans-serif", whiteSpace: "nowrap" }}
				>
					<Plus size={14} /> Add Review
				</button>
			</div>

			{/* Add New */}
			{adding && (
				<div className="bg-[#111] border border-[#c17a53]/30 rounded-xl p-6 mb-6">
					<h3
						className="text-white text-sm font-medium mb-5"
						style={{ fontFamily: "'Outfit', sans-serif" }}
					>
						New Testimonial
					</h3>
					<TestimonialForm
						data={newT}
						onChange={(field, value) =>
							setNewT((prev) => ({ ...prev, [field]: value }))
						}
					/>
					<div className="flex gap-3 mt-5">
						<button
							onClick={handleAdd}
							className="px-5 py-2.5 rounded-lg text-xs uppercase tracking-wide font-medium text-black"
							style={{
								background: "#c17a53",
								fontFamily: "'Outfit', sans-serif",
							}}
						>
							Add Review
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

			{/* List */}
			<div className="flex flex-col gap-4">
				{testimonials.map((t) => (
					<div
						key={t.id}
						className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6"
					>
						<div className="flex items-start justify-between mb-5">
							<div>
								<p
									className="text-white text-sm font-medium"
									style={{ fontFamily: "'Outfit', sans-serif" }}
								>
									{t.name || "New Testimonial"}
								</p>
								<p
									className="text-[#555] text-xs"
									style={{ fontFamily: "'Outfit', sans-serif" }}
								>
									{t.role}
								</p>
							</div>
							<button
								onClick={() => handleDelete(t.id)}
								className="text-[#333] hover:text-red-400 transition-colors"
							>
								<Trash2 size={15} />
							</button>
						</div>
						<TestimonialForm
							data={t}
							onChange={(field, value) => update(t.id, field, value)}
						/>
						<div className="flex justify-end mt-5">
							<SaveButton
								saving={saving === t.id}
								saved={saved === t.id}
								onClick={() => handleSave(t)}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

// ─── TestimonialForm ──────────────────────────────────────────────────────────

type TestimonialFormFields = keyof TestimonialFormState;

interface TestimonialFormProps {
	data: TestimonialFormState | Testimonial;
	onChange: (field: TestimonialFormFields, value: string | number) => void;
}

function TestimonialForm({ data, onChange }: TestimonialFormProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
			<div>
				<label
					className={LABEL_CLASS}
					style={{ fontFamily: "'Outfit', sans-serif" }}
				>
					Client Name
				</label>
				<input
					className={INPUT_CLASS}
					style={{ fontFamily: "'Outfit', sans-serif" }}
					value={data.name}
					onChange={(e) => onChange("name", e.target.value)}
				/>
			</div>
			<div>
				<label
					className={LABEL_CLASS}
					style={{ fontFamily: "'Outfit', sans-serif" }}
				>
					Role / Occasion
				</label>
				<input
					className={INPUT_CLASS}
					style={{ fontFamily: "'Outfit', sans-serif" }}
					value={data.role}
					onChange={(e) => onChange("role", e.target.value)}
				/>
			</div>
			<div className="md:col-span-2">
				<label
					className={LABEL_CLASS}
					style={{ fontFamily: "'Outfit', sans-serif" }}
				>
					Quote
				</label>
				<textarea
					className={INPUT_CLASS}
					rows={3}
					style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
					value={data.quote}
					onChange={(e) => onChange("quote", e.target.value)}
				/>
			</div>
			<div>
				<label
					className={LABEL_CLASS}
					style={{ fontFamily: "'Outfit', sans-serif" }}
				>
					Rating
				</label>
				<div className="flex items-center gap-2 mt-1">
					{[1, 2, 3, 4, 5].map((n) => (
						<button key={n} onClick={() => onChange("rating", n)}>
							<Star
								size={20}
								className={
									n <= data.rating
										? "fill-[#c17a53] text-[#c17a53]"
										: "text-[#333]"
								}
							/>
						</button>
					))}
					<span
						className="text-[#666] text-xs ml-1"
						style={{ fontFamily: "'Outfit', sans-serif" }}
					>
						{data.rating}/5
					</span>
				</div>
			</div>
		</div>
	);
}