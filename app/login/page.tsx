"use client";

import { useState } from "react";
import { createClient } from "@/lib/modules/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const supabase = createClient();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setError("Invalid credentials. Only the admin may enter.");
			setLoading(false);
			return;
		}

		router.push("/admin");
		router.refresh();
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center"
			style={{ background: "#0a0a0a" }}
		>
			<div className="w-full max-w-md px-8">
				{/* Logo / Brand */}
				<div className="text-center mb-12">
					<p
						className="text-[#c17a53] text-xs tracking-[0.3em] uppercase mb-4"
						style={{ fontFamily: "'Outfit', sans-serif" }}
					>
						Admin Access
					</p>
					<h1
						className="text-white"
						style={{
							fontFamily: "'Cormorant Garamond', Georgia, serif",
							fontSize: "clamp(36px, 5vw, 48px)",
							fontWeight: 400,
							lineHeight: 1.1,
						}}
					>
						Sheffex CMS
					</h1>
					<div className="w-12 h-px bg-[#c17a53] mx-auto mt-4" />
				</div>

				{/* Form */}
				<form onSubmit={handleLogin} className="flex flex-col gap-5">
					<div>
						<label
							className="block text-[#666] text-xs tracking-[0.1em] uppercase mb-2"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Email
						</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors"
							style={{ fontFamily: "'Outfit', sans-serif" }}
							placeholder="admin@sheffex.com"
						/>
					</div>

					<div>
						<label
							className="block text-[#666] text-xs tracking-[0.1em] uppercase mb-2"
							style={{ fontFamily: "'Outfit', sans-serif" }}
						>
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-[#c17a53] transition-colors"
							style={{ fontFamily: "'Outfit', sans-serif" }}
							placeholder="••••••••"
						/>
					</div>

					{error && <p className="text-red-400 text-sm text-center">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 rounded-lg text-[#0a0a0a] text-sm tracking-[0.1em] uppercase font-medium transition-all duration-300 mt-2"
						style={{
							background: loading ? "#8a5a3a" : "#c17a53",
							fontFamily: "'Outfit', sans-serif",
							cursor: loading ? "not-allowed" : "pointer",
						}}
					>
						{loading ? "Entering..." : "Enter Studio"}
					</button>
				</form>
			</div>
		</div>
	);
}