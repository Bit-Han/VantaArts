

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