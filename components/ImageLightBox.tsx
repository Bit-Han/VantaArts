"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
	images: {
		src: string;
		alt: string;
	}[];
	currentIndex: number;
	isOpen: boolean;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

export default function ImageLightbox({
	images,
	currentIndex,
	isOpen,
	onClose,
	onNavigate,
}: ImageLightboxProps) {
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!isOpen) return;

			if (e.key === "Escape") {
				onClose();
			}

			if (e.key === "ArrowLeft") {
				onNavigate(Math.max(0, currentIndex - 1));
			}

			if (e.key === "ArrowRight") {
				onNavigate(Math.min(images.length - 1, currentIndex + 1));
			}
		},
		[isOpen, onClose, onNavigate, currentIndex, images.length],
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		if (isOpen) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [handleKeyDown, isOpen]);

	if (!isOpen || images.length === 0) {
		return null;
	}

	const current = images[currentIndex];

	return (
		<div
			className="fixed inset-0 z-200 flex items-center justify-center"
			onClick={onClose}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

			{/* Close Button */}
			<button
				onClick={onClose}
				className="absolute top-6 right-6 z-10 text-white hover:text-[#c17a53] transition-colors"
				aria-label="Close lightbox"
			>
				<X size={32} />
			</button>

			{/* Image */}
			<div
				className="relative z-10 w-[90vw] h-[90vh]"
				onClick={(e) => e.stopPropagation()}
			>
				<Image
					src={current.src}
					alt={current.alt}
					fill
					priority
					className="object-contain rounded-lg"
				/>
			</div>

			{/* Navigation */}
			{images.length > 1 && (
				<>
					<button
						onClick={(e) => {
							e.stopPropagation();
							onNavigate(Math.max(0, currentIndex - 1));
						}}
						className="absolute left-6 z-10 text-white hover:text-[#c17a53] transition-colors disabled:opacity-30"
						disabled={currentIndex === 0}
						aria-label="Previous image"
					>
						<ChevronLeft size={40} />
					</button>

					<button
						onClick={(e) => {
							e.stopPropagation();
							onNavigate(Math.min(images.length - 1, currentIndex + 1));
						}}
						className="absolute right-6 z-10 text-white hover:text-[#c17a53] transition-colors disabled:opacity-30"
						disabled={currentIndex === images.length - 1}
						aria-label="Next image"
					>
						<ChevronRight size={40} />
					</button>
				</>
			)}

			{/* Counter */}
			<div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#a0a0a0] text-sm">
				{currentIndex + 1} / {images.length}
			</div>
		</div>
	);
}
