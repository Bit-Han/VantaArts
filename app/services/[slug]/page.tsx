
// import { SERVICES } from "@/lib/data/constants";

// import ServiceDetailClient from "@/components/ServicesDetails";

// interface Props {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export async function generateStaticParams() {
//   return SERVICES.map((service) => ({
//     slug: service.slug,
//   }));
// }

// export default async function ServiceDetailPage({
//   params,
// }: Props) {
//   const { slug } = await params;

//   const service = SERVICES.find(
//     (s) => s.slug === slug
//   );

//   if (!service) {
//     return (
//       <main className="min-h-screen bg-black flex items-center justify-center text-white">
//         Service not found
//       </main>
//     );
//   }

//   return (
//     <ServiceDetailClient
//       service={service}
//     />
//   );
// }

import { notFound } from "next/navigation";
import { getServices, getServiceBySlug } from "@/lib/data/fetch";
import ServiceDetailClient from "@/components/ServicesDetails";

interface Props {
  params: Promise<{ slug: string }>;
}

// Tells Next.js which slugs exist so it can statically generate them
export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return notFound();

  return <ServiceDetailClient service={service} />;
}