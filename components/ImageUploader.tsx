"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader } from "lucide-react";

interface Props {
	currentUrl: string;
	onUpload: (url: string) => void;
	folder?: string;
	aspectRatio?: string;
	label?: string;
}

export default function ImageUploader({
	currentUrl,
	onUpload,
	folder = "general",
	aspectRatio = "aspect-video",
	label = "Image",
}: Props) {
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState(currentUrl);
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFile = async (file: File) => {
		if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
			setError("Only images and videos are accepted.");
			return;
		}

		setUploading(true);
		setError("");

		const fd = new FormData();
		fd.append("file", file);
		fd.append("folder", folder);

		const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
		const data = await res.json();

		if (data.url) {
			setPreview(data.url);
			onUpload(data.url);
		} else {
			setError(data.error || "Upload failed");
		}

		setUploading(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) handleFile(file);
	};

	return (
		<div>
			<label
				className="block text-[#666] text-xs tracking-[0.1em] uppercase mb-2"
				style={{ fontFamily: "'Outfit', sans-serif" }}
			>
				{label}
			</label>

			<div
				className={`relative ${aspectRatio} w-full rounded-lg border-2 border-dashed border-[#2a2a2a] overflow-hidden cursor-pointer group hover:border-[#c17a53] transition-colors`}
				onClick={() => inputRef.current?.click()}
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
			>
				{/* Preview */}
				{preview && (
					<Image src={preview} alt="Preview" fill className="object-cover" />
				)}

				{/* Overlay */}
				<div
					className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
						preview ? "opacity-0 group-hover:opacity-100" : "opacity-100"
					}`}
					style={{ background: preview ? "rgba(10,10,10,0.7)" : "#111" }}
				>
					{uploading ? (
						<Loader size={24} className="text-[#c17a53] animate-spin" />
					) : (
						<>
							<Upload size={20} className="text-[#c17a53] mb-2" />
							<p
								className="text-white text-xs text-center px-4"
								style={{ fontFamily: "'Outfit', sans-serif" }}
							>
								Click or drag to upload
							</p>
						</>
					)}
				</div>

				{/* Clear button */}
				{preview && !uploading && (
					<button
						className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center hover:bg-red-600 transition-colors z-10"
						onClick={(e) => {
							e.stopPropagation();
							setPreview("");
							onUpload("");
						}}
					>
						<X size={12} className="text-white" />
					</button>
				)}
			</div>

			{error && (
				<p
					className="text-red-400 text-xs mt-1"
					style={{ fontFamily: "'Outfit', sans-serif" }}
				>
					{error}
				</p>
			)}

			<input
				ref={inputRef}
				type="file"
				accept="image/*,video/*"
				className="hidden"
				onChange={(e) => {
					const f = e.target.files?.[0];
					if (f) handleFile(f);
				}}
			/>
		</div>
	);
}