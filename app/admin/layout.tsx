import AdminSidebar from "@/components/AdminSidebar";
import { Topbar } from "@/components/layout/Topbar";

export const metadata = { title: "Admin — Silent Curator CMS" };

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-[#080808] flex">
			<AdminSidebar />
			<div className="flex-1 md:ml-56 flex flex-col min-h-screen pt-14 md:pt-0">
				<Topbar />
				 <main className="flex-1 md:ml-6 min-h-screen p-4 md:p-8 overflow-y-auto">
				{children}
			</main>
			</div>
			{/* Main area — offset by sidebar width */}      
		</div>
	);
}
