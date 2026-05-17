"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import SaveButton from "@/components/SaveButton";

const INPUT_CLASS =
	"w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors";
const LABEL_CLASS = "block text-[#666] text-xs tracking-[0.1em] uppercase mb-2";

export default function SettingsAdminPage() {
	const [settings, setSettings] = useState<Record<string, string>>({});
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		fetch("/api/admin/settings")
			.then((r) => r.json())
			.then(setSettings);
	}, []);

	const handleSave = async () => {
		setSaving(true);
		await fetch("/api/admin/settings", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(settings),
		});
		setSaving(false);
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	const whatsappUrl = settings.whatsapp_number
		? `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(settings.whatsapp_message || "")}`
		: "";

	return (
		<div className="p-6 md:p-10 min-h-screen" style={{ background: "#0a0a0a" }}>
			<SectionHeader
				title="Site Settings"
				description="Manage global configuration — WhatsApp, CTA, and more."
			/>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl">
				{/* WhatsApp Settings */}
				<div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5">
					<div className="flex items-center gap-3 mb-2">
						<div
							className="w-8 h-8 rounded-lg flex items-center justify-center"
							style={{ background: "#25D36618" }}
						>
							<span style={{ color: "#25D366", fontSize: "14px" }}>💬</span>
						</div>
						<h2
							className="text-white text-base font-medium"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							WhatsApp Booking
						</h2>
					</div>

					<div>
						<label
							className={LABEL_CLASS}
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							WhatsApp Number
						</label>
						<input
							className={INPUT_CLASS}
							style={{ fontFamily: "'Outfit', sans-serif" }}
							value={settings.whatsapp_number || ""}
							onChange={(e) =>
								setSettings({ ...settings, whatsapp_number: e.target.value })
							}
							placeholder="2348094221721 (with country code, no +)"
						/>
						<p
							className="text-[#444] text-xs mt-1"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Include country code without the + sign. e.g. 2348094221721
						</p>
					</div>

					<div>
						<label
							className={LABEL_CLASS}
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Pre-filled Message
						</label>
						<textarea
							className={INPUT_CLASS}
							rows={3}
							style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
							value={settings.whatsapp_message || ""}
							onChange={(e) =>
								setSettings({ ...settings, whatsapp_message: e.target.value })
							}
							placeholder="Hi! I'm interested in booking a session."
						/>
					</div>

					{whatsappUrl && (
						<a
							href={whatsappUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-xs text-[#25D366] hover:underline"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Test WhatsApp Link →
						</a>
					)}
				</div>

				{/* CTA Section Settings */}
				<div className="bg-[#111] border border-[#1e1e1e] rounded-xl p-6 flex flex-col gap-5">
					<div className="flex items-center gap-3 mb-2">
						<div
							className="w-8 h-8 rounded-lg flex items-center justify-center"
							style={{ background: "#c17a5318" }}
						>
							<span style={{ color: "#c17a53", fontSize: "14px" }}>📣</span>
						</div>
						<h2
							className="text-white text-base font-medium"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							CTA Banner
						</h2>
					</div>

					<div>
						<label
							className={LABEL_CLASS}
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Heading
						</label>
						<input
							className={INPUT_CLASS}
							style={{ fontFamily: "'Outfit', sans-serif" }}
							value={settings.cta_heading || ""}
							onChange={(e) =>
								setSettings({ ...settings, cta_heading: e.target.value })
							}
						/>
					</div>

					<div>
						<label
							className={LABEL_CLASS}
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Subtext
						</label>
						<textarea
							className={INPUT_CLASS}
							rows={4}
							style={{ fontFamily: "'Outfit', sans-serif", resize: "none" }}
							value={settings.cta_subtext || ""}
							onChange={(e) =>
								setSettings({ ...settings, cta_subtext: e.target.value })
							}
						/>
					</div>
				</div>
			</div>

			{/* Save */}
			<div className="flex justify-start mt-6">
				<SaveButton saving={saving} saved={saved} onClick={handleSave} />
			</div>
		</div>
	);
}
