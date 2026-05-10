import Link from "next/link";
import { Camera, PinIcon, Music } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-[#111111] border-t border-[#2a2a2a]">
			<div className="container-main py-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					{/* Brand */}
					<div>
						<p className="text-[14px] font-medium tracking-[0.08em] uppercase text-[#666666] mb-4">
							POSH &amp; PAINTED
						</p>
						<p className="text-[12px] text-[#666666] leading-relaxed mb-6">
							Transforming faces, one masterpiece at a time.
						</p>
						<div className="flex gap-4">
							<a
								href="#"
								className="text-[#666666] hover:text-[#c17a53] transition-colors"
								aria-label="Instagram"
							>
								<Camera size={20} />
							</a>
							<a
								href="#"
								className="text-[#666666] hover:text-[#c17a53] transition-colors"
								aria-label="Pinterest"
							>
								<PinIcon size={20} />
							</a>
							<a
								href="#"
								className="text-[#666666] hover:text-[#c17a53] transition-colors"
								aria-label="TikTok"
							>
								<Music size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<p className="text-[14px] font-medium tracking-[0.08em] uppercase text-[#666666] mb-4">
							EXPLORE
						</p>
						<div className="flex flex-col gap-3">
							<Link
								href="/portfolio"
								className="text-[16px] text-[#a0a0a0] hover:text-white transition-colors"
							>
								Portfolio
							</Link>
							<Link
								href="/services/face-painting"
								className="text-[16px] text-[#a0a0a0] hover:text-white transition-colors"
							>
								Services
							</Link>
							<Link
								href="/#about"
								className="text-[16px] text-[#a0a0a0] hover:text-white transition-colors"
							>
								About
							</Link>
							<a
								href="https://wa.me/15552345678"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[16px] text-[#a0a0a0] hover:text-white transition-colors"
							>
								Book Now
							</a>
						</div>
					</div>

					{/* Contact */}
					<div>
						<p className="text-[14px] font-medium tracking-[0.08em] uppercase text-[#666666] mb-4">
							GET IN TOUCH
						</p>
						<div className="flex flex-col gap-3">
							<a
								href="https://wa.me/15552345678"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[16px] text-[#a0a0a0] hover:text-white transition-colors"
							>
								+1 (555) 234-5678
							</a>
							<p className="text-[16px] text-[#a0a0a0]">
								hello@poshandpainted.com
							</p>
							<p className="text-[16px] text-[#a0a0a0]">Los Angeles, CA</p>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 pt-6 border-t border-[#2a2a2a] flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-[12px] text-[#666666]">
						&copy; 2025 Posh &amp; Painted. All rights reserved.
					</p>
					<div className="flex gap-4">
						<span className="text-[12px] text-[#666666] cursor-pointer hover:text-[#a0a0a0]">
							Privacy Policy
						</span>
						<span className="text-[12px] text-[#666666]">&middot;</span>
						<span className="text-[12px] text-[#666666] cursor-pointer hover:text-[#a0a0a0]">
							Terms of Service
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
