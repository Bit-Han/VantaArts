import type { Metadata } from "next";
import "./globals.css";

import WhatsAppButton from "@/components/WhatappButton";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
	title: "Sheffex Arts",
	description: "Creative portfolio website",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<SmoothScrollProvider>
					{children}
					<WhatsAppButton />
				</SmoothScrollProvider>
			</body>
		</html>
	);
}