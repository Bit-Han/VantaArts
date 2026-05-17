import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface Props {
	label: string;
	value: string | number;
	icon?: LucideIcon;
	href: string;
}

export default function StatCard({ label, value, icon: Icon, href}: Props) {
	return (
		<Link
		 href={href}
			className="bg-[#111111] border border-white/[0.07] p-5
                 hover:border-gold/30 transition-all duration-300 group"
		>
			<div className="flex justify-between items-start mb-5">
				{/* ICON IS OPTIONAL FOR MOCK MODE */}
				{Icon ? (
					<Icon
						size={15}
						className="text-dust group-hover:text-gold transition-colors"
					/>
				) : (
					<div className="w-[15px] h-[15px] bg-white/10 rounded-sm" />
				)}
			</div>

			<p className="font-display text-2xl text-white mb-1">{value}</p>

			<p className="font-body text-[0.6rem] tracking-[0.12em] uppercase text-dust">
				{label}
			</p>
		</Link>
	);
}
