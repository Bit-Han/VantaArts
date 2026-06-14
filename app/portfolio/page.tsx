import { getGalleryItems } from "@/lib/data/fetch";
import PortfolioClient from "@/components/PortfolioClient";

export default async function PortfolioPage() {
  // Fetch all gallery items from Supabase
  const items = await getGalleryItems();

  return <PortfolioClient items={items} />;
}