import HeroVideoSlider from "@/components/section/HeroVideoSlider";
import WorkCategories from "@/components/section/WorkCategories";
import FeaturedWorks from "@/components/section/FeaturedWorks";
import Testimonials from "@/components/section/Testimonials";
import AboutSection from "@/components/section/AboutSection";
import CTABanner from "@/components/section/CTABanner";

export default function Home() {
	return (
		<main>
			<HeroVideoSlider />
			<WorkCategories />
			<FeaturedWorks />
			<Testimonials />
			<AboutSection />
			<CTABanner />
		</main>
	);
}
