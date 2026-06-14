// import { getProjectBySlug, getSettings } from "@/lib/data/fetch";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// const VALID_CATEGORIES = ["inks", "canvas", "walls"];

// export default async function ProjectPage({
//   params,
// }: {
//   params: { category: string; slug: string };
// }) {
//   // Guard against invalid categories
//   if (!VALID_CATEGORIES.includes(params.category)) notFound();

//   // Fetch project + settings in parallel
//   const [project, settings] = await Promise.all([
//     getProjectBySlug(params.category, params.slug),
//     getSettings(),
//   ]);

//   if (!project) notFound();

//   // Build WhatsApp booking URL from site settings
//   const whatsappUrl = settings.whatsapp_number
//     ? `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
//         settings.whatsapp_message ?? `Hi! I'm interested in booking a ${project.title} session.`
//       )}`
//     : "#";

//   return (
//     <main className="min-h-screen" style={{ background: "#0a0a0a" }}>

//       {/* ── Hero Image ───────────────────────────────────────────────────── */}
//       <div className="relative w-full aspect-video max-h-[70vh] overflow-hidden">
//         {project.featured_image_url ? (
//           <Image
//             src={project.featured_image_url}
//             alt={project.title}
//             fill
//             className="object-cover"
//             priority
//           />
//         ) : (
//           <div className="w-full h-full bg-[#111]" />
//         )}
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

//         {/* Back link */}
//         <div className="absolute top-6 left-6">
//           <Link
//             href="/"
//             className="text-white/70 hover:text-white text-xs tracking-[0.15em] uppercase transition-colors"
//             style={{ fontFamily: "'Outfit', sans-serif" }}
//           >
//             ← Back
//           </Link>
//         </div>

//         {/* Category badge */}
//         <div className="absolute top-6 right-6">
//           <span
//             className="text-[#c17a53] text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[#c17a53]/30"
//             style={{ fontFamily: "'Outfit', sans-serif", background: "#c17a5318" }}
//           >
//             {project.category}
//           </span>
//         </div>
//       </div>

//       {/* ── Content: Description + Pricing ───────────────────────────────── */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 md:px-12 py-10">

//         {/* Left: About the project */}
//         <div className="lg:col-span-2">
//           <p
//             className="text-[#c17a53] text-xs tracking-[0.2em] uppercase mb-3"
//             style={{ fontFamily: "'Outfit', sans-serif" }}
//           >
//             {project.category}
//           </p>
//           <h1
//             className="text-white mb-6"
//             style={{
//               fontFamily: "'Cormorant Garamond', Georgia, serif",
//               fontSize: "clamp(28px, 4vw, 52px)",
//               fontWeight: 400,
//               lineHeight: 1.15,
//             }}
//           >
//             {project.title}
//           </h1>
//           <p
//             className="text-[#999] leading-relaxed"
//             style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem" }}
//           >
//             {project.description}
//           </p>
//         </div>

//         {/* Right: Pricing + Book Me */}
//         <aside
//           className="rounded-xl p-6 border border-[#1e1e1e] h-fit"
//           style={{ background: "#111" }}
//         >
//           <h2
//             className="text-white text-xs tracking-[0.2em] uppercase mb-5"
//             style={{ fontFamily: "'Outfit', sans-serif" }}
//           >
//             Pricing
//           </h2>

//           {project.pricing.length > 0 ? (
//             <div className="flex flex-col gap-3 mb-6">
//               {project.pricing.map((tier) => (
//                 <div
//                   key={tier.id}
//                   className="flex items-start justify-between py-3 border-b border-white/[0.06]"
//                 >
//                   <div>
//                     <p
//                       className="text-white text-sm"
//                       style={{ fontFamily: "'Outfit', sans-serif" }}
//                     >
//                       {tier.name}
//                     </p>
//                     {tier.note && (
//                       <p
//                         className="text-[#555] text-xs mt-0.5"
//                         style={{ fontFamily: "'Outfit', sans-serif" }}
//                       >
//                         {tier.note}
//                       </p>
//                     )}
//                   </div>
//                   <span
//                     className="text-[#c17a53] text-sm font-medium ml-4 shrink-0"
//                     style={{ fontFamily: "'Outfit', sans-serif" }}
//                   >
//                     {tier.price}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p
//               className="text-[#555] text-xs mb-6"
//               style={{ fontFamily: "'Outfit', sans-serif" }}
//             >
//               Contact us for pricing details.
//             </p>
//           )}

//           {/* Book Me button */}
//           <a
//             href={whatsappUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block w-full text-center py-3 rounded-lg text-xs tracking-[0.15em] uppercase font-medium transition-colors"
//             style={{
//               background: "#c17a53",
//               color: "#0a0a0a",
//               fontFamily: "'Outfit', sans-serif",
//             }}
//           >
//             Book Me
//           </a>
//         </aside>
//       </div>

//       {/* ── Related Gallery ───────────────────────────────────────────────── */}
//       {project.gallery.length > 0 && (
//         <div className="px-6 md:px-12 pb-16">
//           <div className="border-t border-white/[0.06] pt-10">
//             <h2
//               className="text-white text-xs tracking-[0.2em] uppercase mb-6"
//               style={{ fontFamily: "'Outfit', sans-serif" }}
//             >
//               Gallery
//             </h2>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {project.gallery.map((image) => (
//                 <div
//                   key={image.id}
//                   className="relative aspect-square rounded-xl overflow-hidden border border-[#1e1e1e] hover:border-[#c17a53]/30 transition-colors"
//                 >
//                   <Image
//                     src={image.image_url}
//                     alt={image.title}
//                     fill
//                     className="object-cover hover:scale-105 transition-transform duration-500"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

import { getServices, getProjectBySlug, getSettings } from "@/lib/data/fetch";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

// Generate static params from all projects across all services
export async function generateStaticParams() {
  const services = await getServices();
  const { createServiceClient } = await import("@/lib/modules/supabase/server");
  const db = createServiceClient();
  const { data } = await db
    .from("projects")
    .select("category, slug")
    .eq("is_active", true);

  return (data ?? []).map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { category, slug } = await params;

  const VALID_CATEGORIES = ["inks", "canvas", "walls"];
  if (!VALID_CATEGORIES.includes(category)) notFound();

  const [project, settings] = await Promise.all([
    getProjectBySlug(category, slug),
    getSettings(),
  ]);

  if (!project) notFound();

  const whatsappUrl = settings.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
        settings.whatsapp_message ??
          `Hi! I'm interested in booking a ${project.title} session.`
      )}`
    : "#";

  return (
    <ProjectDetailClient
      project={project}
      whatsappUrl={whatsappUrl}
    />
  );
}