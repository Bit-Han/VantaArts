// import HeroVideoSlider from "@/components/section/HeroVideoSlider";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import WorkCategories from "@/components/section/WorkCategories";
// import FeaturedWorks from "@/components/section/FeaturedWorks";
// import Testimonials from "@/components/section/Testimonials";
// import AboutSection from "@/components/section/AboutSection";
// import CTABanner from "@/components/section/CTABanner";

// export default function Home() {
// 	return (
// 		<main>
// 			<Navbar />
// 			<HeroVideoSlider />
// 			<WorkCategories />
// 			<FeaturedWorks />
// 			<Testimonials />
// 			<AboutSection />
// 			<CTABanner />
// 			<Footer />
// 		</main>
// 	);
// }

import HeroVideoSlider from "@/components/section/HeroVideoSlider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WorkCategories from "@/components/section/WorkCategories";
import FeaturedWorks from "@/components/section/FeaturedWorks";
import Testimonials from "@/components/section/Testimonials";
import AboutSection from "@/components/section/AboutSection";
import CTABanner from "@/components/section/CTABanner";

import {
  getHeroData,
  getCategories,
  getFeaturedWorks,
  getTestimonials,
  getAboutSection,
  getSettings,
} from "@/lib/data/fetch";

export default async function Home() {
  // All data fetched in parallel — one round-trip
  const [hero, categories, featuredWorks, testimonials, about, settings] =
    await Promise.all([
      getHeroData(),
      getCategories(),
      getFeaturedWorks(),
      getTestimonials(),
      getAboutSection(),
      getSettings(),
    ]);

  const whatsappUrl = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
    settings.whatsapp_message || ""
  )}`;

  return (
    <main>
      <Navbar />
      <HeroVideoSlider
        slides={hero.slides}
        heading={hero.content?.heading ?? "Where Art Meets Skin"}
        subtext={
          hero.content?.subtext ??
          "Face painting, body art & special effects for events, editorial, and the extraordinary."
        }
        whatsappUrl={whatsappUrl}
      />
      <WorkCategories categories={categories} />
      <FeaturedWorks projects={featuredWorks} />
      <Testimonials testimonials={testimonials} />
      <AboutSection data={about} />
      <CTABanner
        heading={settings.cta_heading ?? "Start a Session"}
        subtext={
          settings.cta_subtext ??
          "Whether it's a subtle accent or a full transformation, every story deserves to be painted with intention."
        }
        whatsappUrl={whatsappUrl}
      />
      <Footer />
    </main>
  );
}