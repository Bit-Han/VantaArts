// // 'use client'

// // import { useState } from 'react'
// // import {
// //   Save, Plus, Trash2, Loader2, ChevronRight,
// //   Clock, Shield, Users, Sparkles,
// // } from 'lucide-react'
// // import ImageUploader from '@/components/ImageUploader';

// // // ── Mock Data ────────────────────────────────────────────

// // const CATEGORIES = [
// //   { value: 'ink', label: 'Ink', description: 'Tattoo artistry' },
// //   { value: 'canvas', label: 'Canvas', description: 'Paintings & commissions' },
// //   { value: 'walls', label: 'Walls', description: 'Murals & public art' },
// //   { value: 'painting', label: 'Painting', description: 'Face & body art' },
// // ] as const

// // const ICON_OPTIONS = [
// //   { value: 'Clock', icon: <Clock size={14} />, label: 'Clock' },
// //   { value: 'Shield', icon: <Shield size={14} />, label: 'Shield' },
// //   { value: 'Users', icon: <Users size={14} />, label: 'Users' },
// //   { value: 'Sparkles', icon: <Sparkles size={14} />, label: 'Sparkles' },
// // ]

// // // ── Mock Services Data ────────────────────────────────────

// // const MOCK_SERVICES = [
// //   {
// //     id: '1',
// //     slug: 'ink',
// //     title: 'Ink',
// //     category: 'ink',
// //     pricing: [
// //       { id: 'p1', name: 'Small', price: '₦20,000', note: '1–2 hours' },
// //     ],
// //     details: [
// //       { id: 'd1', icon: 'Clock', text: 'Fast turnaround' },
// //     ],
// //     gallery: [
// //       { id: 'g1', image_url: '/demo.jpg', alt_text: 'Ink work' },
// //     ],
// //   },
// //   {
// //     id: '2',
// //     slug: 'canvas',
// //     title: 'Canvas',
// //     category: 'canvas',
// //     pricing: [],
// //     details: [],
// //     gallery: [],
// //   },
// // ]

// // // ── Main Component ────────────────────────────────────────

// // export default function AdminServices() {
// //   const [services] = useState(MOCK_SERVICES)
// //   const [selectedSlug, setSelectedSlug] = useState('ink')

// //   const [activeTab, setActiveTab] = useState<'Content' | 'Pricing' | 'Details' | 'Gallery'>('Content')

// //   const fullService = services.find(s => s.slug === selectedSlug)

// //   const [contentForm, setContentForm] = useState({
// //     title: fullService?.title ?? '',
// //     tagline: '',
// //     long_description: '',
// //     hero_image: '',
// //     detail_image: '',
// //     published: true,
// //     sort_order: 0,
// //   })

// //   if (!fullService) return null

// //   return (
// //     <div className="relative">

// //       <div className="mb-8">
// //         <h1 className="font-display text-[1.8rem] text-white">Services (Mock Mode)</h1>
// //         <p className="font-body text-[0.68rem] text-dust mt-1">
// //           UI preview without backend integration
// //         </p>
// //       </div>

// //       <div className="flex gap-6 items-start">

// //         {/* LEFT */}
// //         <div className="w-52 flex flex-col gap-2">
// //           {services.map(service => (
// //             <button
// //               key={service.id}
// //               onClick={() => setSelectedSlug(service.slug)}
// //               className={`p-3 border text-left ${
// //                 selectedSlug === service.slug
// //                   ? 'border-gold text-white'
// //                   : 'border-white/10 text-dust'
// //               }`}
// //             >
// //               {service.title}
// //             </button>
// //           ))}
// //         </div>

// //         {/* RIGHT */}
// //         <div className="flex-1">

// //           {/* Tabs */}
// //           <div className="flex gap-3 border-b border-white/10 mb-4">
// //             {['Content', 'Pricing', 'Details', 'Gallery'].map(tab => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`px-4 py-2 ${
// //                   activeTab === tab ? 'text-white border-b border-gold' : 'text-dust'
// //                 }`}
// //               >
// //                 {tab}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="bg-[#111] p-6 border border-white/10">

// //             {/* CONTENT */}
// //             {activeTab === 'Content' && (
// //               <div className="space-y-4">
// //                 <input
// //                   value={contentForm.title}
// //                   onChange={(e) => setContentForm(p => ({ ...p, title: e.target.value }))}
// //                   className="admin-input"
// //                   placeholder="Title"
// //                 />

// //                 <textarea
// //                   value={contentForm.long_description}
// //                   onChange={(e) => setContentForm(p => ({ ...p, long_description: e.target.value }))}
// //                   className="admin-input"
// //                   placeholder="Description"
// //                 />

// //                 <ImageUploader
// //                   value={contentForm.hero_image}
// //                   onChange={(url) => setContentForm(p => ({ ...p, hero_image: url }))}
// //                   folder="demo"
// //                   label="Hero Image"
// //                 />
// //               </div>
// //             )}

// //             {/* PRICING */}
// //             {activeTab === 'Pricing' && (
// //               <div className="text-dust text-sm">
// //                 {fullService.pricing.length === 0 ? (
// //                   'No pricing yet'
// //                 ) : (
// //                   fullService.pricing.map(p => (
// //                     <div key={p.id} className="border-b border-white/10 py-2">
// //                       {p.name} — {p.price}
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             )}

// //             {/* DETAILS */}
// //             {activeTab === 'Details' && (
// //               <div>
// //                 {fullService.details.map(d => (
// //                   <div key={d.id} className="flex gap-2 items-center py-2">
// //                     <span>{d.icon}</span>
// //                     <span className="text-dust">{d.text}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {/* GALLERY */}
// //             {activeTab === 'Gallery' && (
// //               <div className="grid grid-cols-2 gap-3">
// //                 {fullService.gallery.map(g => (
// //                   // eslint-disable-next-line @next/next/no-img-element
// //                   <img key={g.id} src={g.image_url} className="w-full h-40 object-cover" />
// //                 ))}
// //               </div>
// //             )}

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// 'use client'

// import { useState } from 'react'
// import {
//   Clock,
//   Shield,
//   Users,
//   Sparkles,
// } from 'lucide-react'
// import ImageUploader from '@/components/ImageUploader';

// // ── ICON TYPES ───────────────────────────────────────────

// type ServiceIcon = 'Clock' | 'Shield' | 'Users' | 'Sparkles'

// type IconOption = {
//   value: ServiceIcon
//   icon: React.ReactNode
//   label: string
// }

// // ── DATA TYPES (UI MOCK VERSION) ─────────────────────────

// type PricingItem = {
//   id: string
//   name: string
//   price: string
//   note?: string
// }

// type DetailItem = {
//   id: string
//   icon: ServiceIcon
//   text: string
// }

// type GalleryItem = {
//   id: string
//   image_url: string
//   alt_text: string
// }

// type Service = {
//   id: string
//   slug: string
//   title: string
//   category: 'ink' | 'canvas' | 'walls' | 'painting'
//   pricing: PricingItem[]
//   details: DetailItem[]
//   gallery: GalleryItem[]
// }

// // ── CONSTANTS ────────────────────────────────────────────

// const ICON_OPTIONS: IconOption[] = [
//   { value: 'Clock', icon: <Clock size={14} />, label: 'Clock' },
//   { value: 'Shield', icon: <Shield size={14} />, label: 'Shield' },
//   { value: 'Users', icon: <Users size={14} />, label: 'Users' },
//   { value: 'Sparkles', icon: <Sparkles size={14} />, label: 'Sparkles' },
// ]

// // ── MOCK DATA ────────────────────────────────────────────

// const MOCK_SERVICES: Service[] = [
//   {
//     id: '1',
//     slug: 'ink',
//     title: 'Ink',
//     category: 'ink',
//     pricing: [
//       {
//         id: 'p1',
//         name: 'Small',
//         price: '₦20,000',
//         note: '1–2 hours',
//       },
//     ],
//     details: [
//       {
//         id: 'd1',
//         icon: 'Clock',
//         text: 'Fast turnaround',
//       },
//     ],
//     gallery: [
//       {
//         id: 'g1',
//         image_url: '/demo.jpg',
//         alt_text: 'Ink work',
//       },
//     ],
//   },
//   {
//     id: '2',
//     slug: 'canvas',
//     title: 'Canvas',
//     category: 'canvas',
//     pricing: [],
//     details: [],
//     gallery: [],
//   },
// ]

// // ── COMPONENT ────────────────────────────────────────────

// export default function AdminServices() {
//   const [services] = useState<Service[]>(MOCK_SERVICES)
//   const [selectedSlug, setSelectedSlug] = useState<string>('ink')

//   const [activeTab, setActiveTab] =
//     useState<'Content' | 'Pricing' | 'Details' | 'Gallery'>('Content')

//   const fullService = services.find(
//     (s): s is Service => s.slug === selectedSlug
//   )

//   const [contentForm, setContentForm] = useState({
//     title: fullService?.title ?? '',
//     tagline: '',
//     long_description: '',
//     hero_image: '',
//     detail_image: '',
//     published: true,
//     sort_order: 0,
//   })

//   if (!fullService) return null

//   return (
// 		<div className="relative">
// 			<div className="mb-8">
// 				<h1 className="font-display text-[1.8rem] text-white">
// 					Services (Mock Mode)
// 				</h1>
// 				<p className="font-body text-[0.68rem] text-dust mt-1">
// 					UI preview without backend integration
// 				</p>
// 			</div>

// 			<div className="flex gap-6 items-start">
// 				{/* LEFT */}
// 				<div className="w-52 flex flex-col gap-2">
// 					{services.map((service: Service) => (
// 						<button
// 							key={service.id}
// 							onClick={() => setSelectedSlug(service.slug)}
// 							className={`p-3 border text-left ${
// 								selectedSlug === service.slug
// 									? "border-gold text-white"
// 									: "border-white/10 text-dust"
// 							}`}
// 						>
// 							{service.title}
// 						</button>
// 					))}
// 				</div>

// 				{/* RIGHT */}
// 				<div className="flex-1">
// 					{/* Tabs */}
// 					<div className="flex gap-3 border-b border-white/10 mb-4">
// 						{(["Content", "Pricing", "Details", "Gallery"] as const).map(
// 							(tab) => (
// 								<button
// 									key={tab}
// 									onClick={() => setActiveTab(tab)}
// 									className={`px-4 py-2 ${
// 										activeTab === tab
// 											? "text-white border-b border-gold"
// 											: "text-dust"
// 									}`}
// 								>
// 									{tab}
// 								</button>
// 							),
// 						)}
// 					</div>

// 					<div className="bg-[#111] p-6 border border-white/10">
// 						{/* CONTENT */}
// 						{activeTab === "Content" && (
// 							<div className="space-y-4">
// 								<input
// 									value={contentForm.title}
// 									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
// 										setContentForm((p) => ({ ...p, title: e.target.value }))
// 									}
// 									className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30"
// 									placeholder="Title"
// 								/>
// 								<textarea
// 									value={contentForm.long_description}
// 									onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
// 										setContentForm((p) => ({
// 											...p,
// 											long_description: e.target.value,
// 										}))
// 									}
// 									className="w-full bg-[#080808] border border-white/10 px-[14px] py-[10px] font-[Jost] font-light text-[0.82rem] text-white outline-none transition-colors duration-200 focus:border-white/30"
// 									placeholder="Description"
// 								/>

// 								<ImageUploader
// 									value={contentForm.hero_image}
// 									onChange={(url: string) =>
// 										setContentForm((p) => ({ ...p, hero_image: url }))
// 									}
// 									folder="demo"
// 									label="Hero Image"
// 								/>
// 							</div>
// 						)}

// 						{/* PRICING */}
// 						{activeTab === "Pricing" && (
// 							<div className="text-dust text-sm">
// 								{fullService.pricing.length === 0
// 									? "No pricing yet"
// 									: fullService.pricing.map((p: PricingItem) => (
// 											<div key={p.id} className="border-b border-white/10 py-2">
// 												{p.name} — {p.price}
// 											</div>
// 										))}
// 							</div>
// 						)}

// 						{/* DETAILS */}
// 						{activeTab === "Details" && (
// 							<div>
// 								{fullService.details.map((d: DetailItem) => (
// 									<div key={d.id} className="flex gap-2 items-center py-2">
// 										<span>{d.icon}</span>
// 										<span className="text-dust">{d.text}</span>
// 									</div>
// 								))}
// 							</div>
// 						)}

// 						{/* GALLERY */}
// 						{activeTab === "Gallery" && (
// 							<div className="grid grid-cols-2 gap-3">
// 								{fullService.gallery.map((g: GalleryItem) => (
// 									// eslint-disable-next-line @next/next/no-img-element
// 									<img
// 										key={g.id}
// 										src={g.image_url}
// 										className="w-full h-40 object-cover"
// 										alt={g.alt_text}
// 									/>
// 								))}
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }


"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import ImageUploader from "@/components/ImageUploader";
import SaveButton from "@/components/SaveButton";
import { Plus, Trash2 } from "lucide-react";
import type {
  ServiceWithRelationsAdmin,
  ServiceDetailRow,
  ServicePricingRow,
} from "@/lib/types/database";

// ─── Local form types ─────────────────────────────────────────────────────────

type DetailField = Pick<ServiceDetailRow, "icon" | "text">;
type PricingField = Pick<ServicePricingRow, "name" | "price" | "note">;

const INPUT_CLASS =
  "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS =
  "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";
const ICONS = ["Clock", "Shield", "Users", "Sparkles"] as const;
type IconName = (typeof ICONS)[number];

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceWithRelationsAdmin[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((data: ServiceWithRelationsAdmin[]) => {
        setServices(data);
        if (data.length > 0) setActive(data[0].id);
      });
  }, []);

  const handleSave = async (service: ServiceWithRelationsAdmin) => {
    setSaving(service.id);
    await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(service),
    });
    setSaving(null);
    setSaved(service.id);
    setTimeout(() => setSaved(null), 2000);
  };

  const update = (
    id: string,
    field: keyof ServiceWithRelationsAdmin,
    value: string
  ) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const updateDetail = (
    svcId: string,
    idx: number,
    field: keyof DetailField,
    value: string
  ) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== svcId) return s;
        const details = [...s.details];
        details[idx] = { ...details[idx], [field]: value };
        return { ...s, details };
      })
    );
  };

  const updatePricing = (
    svcId: string,
    idx: number,
    field: keyof PricingField,
    value: string
  ) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== svcId) return s;
        const pricing = [...s.pricing];
        pricing[idx] = { ...pricing[idx], [field]: value };
        return { ...s, pricing };
      })
    );
  };

  const addDetail = (svcId: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === svcId
          ? {
              ...s,
              details: [...s.details, { icon: "Clock", text: "" }],
            }
          : s
      )
    );
  };

  const removeDetail = (svcId: string, idx: number) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === svcId
          ? { ...s, details: s.details.filter((_, i) => i !== idx) }
          : s
      )
    );
  };

  const addPricing = (svcId: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === svcId
          ? {
              ...s,
              pricing: [
                ...s.pricing,
                { name: "", price: "", note: null },
              ],
            }
          : s
      )
    );
  };

  const removePricing = (svcId: string, idx: number) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === svcId
          ? { ...s, pricing: s.pricing.filter((_, i) => i !== idx) }
          : s
      )
    );
  };

  const activeService = services.find((s) => s.id === active) ?? null;

  return (
    <div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
      <SectionHeader
        title="Services"
        description="Edit each service page — content, pricing, and details."
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Service Tabs */}
        <div className="flex lg:flex-col gap-2 lg:w-48 flex-shrink-0">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="text-left px-4 py-3 rounded-lg text-sm transition-all duration-200"
              style={{
                background: active === s.id ? "#c17a53" : "#111",
                color: active === s.id ? "#0a0a0a" : "#a0a0a0",
                fontFamily: "'Outfit', sans-serif",
                border: active === s.id ? "none" : "1px solid #1e1e1e",
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Service Editor */}
        {activeService && (
          <div className="flex-1 bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-7">
            {/* Hero Image */}
            <ImageUploader
              currentUrl={activeService.hero_image_url}
              onUpload={(url) => update(activeService.id, "hero_image_url", url)}
              folder="services"
              aspectRatio="aspect-video"
              label="Hero Image"
            />

            {/* Core Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  value={activeService.title}
                  onChange={(e) =>
                    update(activeService.id, "title", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  className={LABEL_CLASS}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Tagline
                </label>
                <input
                  className={INPUT_CLASS}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  value={activeService.tagline}
                  onChange={(e) =>
                    update(activeService.id, "tagline", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  className={LABEL_CLASS}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Short Description
                </label>
                <textarea
                  className={INPUT_CLASS}
                  rows={3}
                  style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
                  value={activeService.description}
                  onChange={(e) =>
                    update(activeService.id, "description", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  className={LABEL_CLASS}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Long Description
                </label>
                <textarea
                  className={INPUT_CLASS}
                  rows={3}
                  style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
                  value={activeService.long_description}
                  onChange={(e) =>
                    update(activeService.id, "long_description", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Details Bullets */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  className={LABEL_CLASS}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Service Details (icon bullets)
                </label>
                <button
                  onClick={() => addDetail(activeService.id)}
                  className="text-[#c17a53] text-xs flex items-center gap-1 hover:underline"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Plus size={12} /> Add Detail
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {activeService.details.map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <select
                      className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-3 text-white text-sm outline-none focus:border-[#c17a53] w-32"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      value={d.icon}
                      onChange={(e) =>
                        updateDetail(
                          activeService.id,
                          i,
                          "icon",
                          e.target.value as IconName
                        )
                      }
                    >
                      {ICONS.map((ic) => (
                        <option key={ic} value={ic}>
                          {ic}
                        </option>
                      ))}
                    </select>
                    <input
                      className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      value={d.text}
                      onChange={(e) =>
                        updateDetail(activeService.id, i, "text", e.target.value)
                      }
                      placeholder="Detail description..."
                    />
                    <button
                      onClick={() => removeDetail(activeService.id, i)}
                      className="text-[#333] hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Tiers */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label
                  className={LABEL_CLASS}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Pricing Tiers
                </label>
                <button
                  onClick={() => addPricing(activeService.id)}
                  className="text-[#c17a53] text-xs flex items-center gap-1 hover:underline"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <Plus size={12} /> Add Tier
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {activeService.pricing.map((p, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 items-center">
                    <input
                      className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      value={p.name}
                      onChange={(e) =>
                        updatePricing(activeService.id, i, "name", e.target.value)
                      }
                      placeholder="Tier name"
                    />
                    <input
                      className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      value={p.price}
                      onChange={(e) =>
                        updatePricing(
                          activeService.id,
                          i,
                          "price",
                          e.target.value
                        )
                      }
                      placeholder="₦10,000"
                    />
                    <div className="flex gap-2 items-center">
                      <input
                        className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        value={p.note ?? ""}
                        onChange={(e) =>
                          updatePricing(
                            activeService.id,
                            i,
                            "note",
                            e.target.value
                          )
                        }
                        placeholder="Note (optional)"
                      />
                      <button
                        onClick={() => removePricing(activeService.id, i)}
                        className="text-[#333] hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end border-t border-[#1e1e1e] pt-5">
              <SaveButton
                saving={saving === activeService.id}
                saved={saved === activeService.id}
                onClick={() => handleSave(activeService)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}