import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-[#555] text-xs hover:text-[#c17a53] transition-colors mb-4"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <ChevronLeft size={14} /> Dashboard
      </Link>
      <h1
        className="text-white"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(28px, 3vw, 40px)",
          fontWeight: 400,
        }}
      >
        {title}
      </h1>
      <p className="text-[#555] text-sm mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {description}
      </p>
      <div className="w-12 h-px bg-[#c17a53] mt-4" />
    </div>
  );
}