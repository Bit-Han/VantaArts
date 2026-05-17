// "use client";

// import { useRef, useEffect, useState, useCallback } from "react";

// import Link from "next/link";

// import { ChevronDown } from "lucide-react";

// const VIDEOS = ["/assets/hero-video-1.mp4", "/assets/hero-video-2.mp4"];

// export default function HeroVideoSlider() {
// 	const [activeIndex, setActiveIndex] = useState(0);

// 	const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

// 	const containerRef = useRef<HTMLDivElement>(null);

// 	const isScrubbing = useRef(false);

// 	const startX = useRef(0);

// 	const scrubRate = useRef(0);

// 	const rafId = useRef(0);

// 	const setVideoRef = useCallback(
// 		(el: HTMLVideoElement | null, index: number) => {
// 			videoRefs.current[index] = el;
// 		},
// 		[],
// 	);

// 	useEffect(() => {
// 		const videos = videoRefs.current;

// 		videos.forEach((video, i) => {
// 			if (video) {
// 				video.muted = true;
// 				video.playsInline = true;
// 				video.loop = false;

// 				if (i === 0) {
// 					video.play().catch(() => {});
// 				}
// 			}
// 		});

// 		const handleEnded = () => {
// 			const current = videoRefs.current[activeIndex];

// 			const nextIdx = (activeIndex + 1) % VIDEOS.length;

// 			const next = videoRefs.current[nextIdx];

// 			if (current && next) {
// 				current.pause();

// 				next.currentTime = 0;

// 				setActiveIndex(nextIdx);

// 				next.play().catch(() => {});
// 			}
// 		};

// 		const activeVideo = videoRefs.current[activeIndex];

// 		if (activeVideo) {
// 			activeVideo.addEventListener("ended", handleEnded);
// 		}

// 		return () => {
// 			if (activeVideo) {
// 				activeVideo.removeEventListener("ended", handleEnded);
// 			}
// 		};
// 	}, [activeIndex]);

// 	useEffect(() => {
// 		const container = containerRef.current;

// 		if (!container) return;

// 		const onPointerDown = (e: PointerEvent) => {
// 			isScrubbing.current = true;

// 			startX.current = e.clientX;

// 			scrubRate.current = 0;

// 			videoRefs.current[activeIndex]?.pause();
// 		};

// 		const onPointerMove = (e: PointerEvent) => {
// 			if (!isScrubbing.current) return;

// 			const delta = e.clientX - startX.current;

// 			scrubRate.current = delta * 0.01;

// 			startX.current = e.clientX;
// 		};

// 		const onPointerUp = () => {
// 			if (!isScrubbing.current) return;

// 			isScrubbing.current = false;

// 			scrubRate.current = 0;

// 			videoRefs.current[activeIndex]?.play().catch(() => {});
// 		};

// 		const loop = () => {
// 			if (isScrubbing.current) {
// 				const video = videoRefs.current[activeIndex];

// 				if (video) {
// 					video.currentTime = Math.max(
// 						0,
// 						Math.min(
// 							video.duration || 0,
// 							video.currentTime + scrubRate.current,
// 						),
// 					);
// 				}
// 			}

// 			rafId.current = requestAnimationFrame(loop);
// 		};

// 		container.addEventListener("pointerdown", onPointerDown);

// 		window.addEventListener("pointermove", onPointerMove);

// 		window.addEventListener("pointerup", onPointerUp);

// 		rafId.current = requestAnimationFrame(loop);

// 		return () => {
// 			container.removeEventListener("pointerdown", onPointerDown);

// 			window.removeEventListener("pointermove", onPointerMove);

// 			window.removeEventListener("pointerup", onPointerUp);

// 			cancelAnimationFrame(rafId.current);
// 		};
// 	}, [activeIndex]);

// 	return (
// 		<section
// 			ref={containerRef}
// 			className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
// 			style={{
// 				touchAction: "pan-y",
// 			}}
// 		>
// 			{/* Video Container */}
// 			<div className="absolute inset-0">
// 				{VIDEOS.map((src, i) => (
// 					<video
// 						key={src}
// 						ref={(el) => setVideoRef(el, i)}
// 						src={src}
// 						poster="/assets/hero-video-poster.jpg"
// 						className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
// 						style={{
// 							opacity: i === activeIndex ? 1 : 0,
// 						}}
// 						muted
// 						playsInline
// 						preload={i === 0 ? "auto" : "metadata"}
// 					/>
// 				))}
// 			</div>

// 			{/* Gradient Overlay */}
// 			<div
// 				className="absolute inset-0 z-[1] pointer-events-none"
// 				style={{
// 					background:
// 						"linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.6) 100%)",
// 				}}
// 			/>

// 			{/* Content */}
// 			<div className="relative z-[2] h-full flex flex-col justify-end container-main pb-24 md:pb-32">
// 				<h1
// 					className="text-white max-w-[700px] leading-[1.0] tracking-[-0.02em]"
// 					style={{
// 						fontFamily: "'Cormorant Garamond', Georgia, serif",

// 						fontSize: "clamp(48px, 8vw, 80px)",

// 						fontWeight: 400,
// 					}}
// 				>
// 					Where Art Meets Skin
// 				</h1>

// 				<p
// 					className="text-[#a0a0a0] max-w-[560px] mt-6 leading-[1.6] tracking-[0.01em]"
// 					style={{
// 						fontFamily: "'Outfit', sans-serif",

// 						fontSize: "clamp(16px, 2vw, 18px)",

// 						fontWeight: 300,
// 					}}
// 				>
// 					Face painting, body art &amp; special effects for events, editorial,
// 					and the extraordinary.
// 				</p>

// 				<div className="flex flex-wrap gap-4 mt-10">
// 					<Link href="/portfolio" className="btn-outline">
// 						VIEW PORTFOLIO
// 					</Link>

// 					<a
// 						href="https://wa.me/15552345678?text=Hi!%20I'm%20interested%20in%20booking%20a%20session."
// 						target="_blank"
// 						rel="noopener noreferrer"
// 						className="btn-primary"
// 					>
// 						BOOK NOW
// 					</a>
// 				</div>
// 			</div>

// 			{/* Scroll Indicator */}
// 			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] bounce-subtle">
// 				<ChevronDown className="text-[#666666]" size={24} />
// 			</div>

// 			{/* Video Indicators */}
// 			<div className="absolute bottom-8 right-8 z-[2] flex gap-2">
// 				{VIDEOS.map((_, i) => (
// 					<button
// 						key={i}
// 						onClick={() => {
// 							const current = videoRefs.current[activeIndex];

// 							const next = videoRefs.current[i];

// 							if (current && next && i !== activeIndex) {
// 								current.pause();

// 								next.currentTime = 0;

// 								setActiveIndex(i);

// 								next.play().catch(() => {});
// 							}
// 						}}
// 						className="w-2 h-2 rounded-full transition-all duration-300"
// 						style={{
// 							background:
// 								i === activeIndex ? "#c17a53" : "rgba(255,255,255,0.3)",

// 							transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
// 						}}
// 						aria-label={`Go to video ${i + 1}`}
// 					/>
// 				))}
// 			</div>
// 		</section>
// 	);
// }


"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
  id: string;
  video_url: string;
  poster_url: string;
  sort_order: number;
}

interface Props {
  slides: Slide[];
  heading: string;
  subtext: string;
  whatsappUrl: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroVideoSlider({
  slides,
  heading,
  subtext,
  whatsappUrl,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrubbing = useRef(false);
  const startX = useRef(0);
  const scrubRate = useRef(0);
  const rafId = useRef(0);

  // Derive video URLs from slides prop (same shape VIDEOS array had)
  const videoUrls = slides.map((s) => s.video_url);
  const posterUrls = slides.map((s) => s.poster_url);

  const setVideoRef = useCallback(
    (el: HTMLVideoElement | null, index: number) => {
      videoRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const videos = videoRefs.current;
    videos.forEach((video, i) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.loop = false;
        if (i === 0) video.play().catch(() => {});
      }
    });

    const handleEnded = () => {
      const current = videoRefs.current[activeIndex];
      const nextIdx = (activeIndex + 1) % videoUrls.length;
      const next = videoRefs.current[nextIdx];
      if (current && next) {
        current.pause();
        next.currentTime = 0;
        setActiveIndex(nextIdx);
        next.play().catch(() => {});
      }
    };

    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) activeVideo.addEventListener("ended", handleEnded);
    return () => {
      if (activeVideo) activeVideo.removeEventListener("ended", handleEnded);
    };
  }, [activeIndex, videoUrls.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onPointerDown = (e: PointerEvent) => {
      isScrubbing.current = true;
      startX.current = e.clientX;
      scrubRate.current = 0;
      videoRefs.current[activeIndex]?.pause();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isScrubbing.current) return;
      const delta = e.clientX - startX.current;
      scrubRate.current = delta * 0.01;
      startX.current = e.clientX;
    };

    const onPointerUp = () => {
      if (!isScrubbing.current) return;
      isScrubbing.current = false;
      scrubRate.current = 0;
      videoRefs.current[activeIndex]?.play().catch(() => {});
    };

    const loop = () => {
      if (isScrubbing.current) {
        const video = videoRefs.current[activeIndex];
        if (video) {
          video.currentTime = Math.max(
            0,
            Math.min(video.duration || 0, video.currentTime + scrubRate.current)
          );
        }
      }
      rafId.current = requestAnimationFrame(loop);
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    rafId.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      cancelAnimationFrame(rafId.current);
    };
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
      style={{ touchAction: "pan-y" }}
    >
      {/* Video Container */}
      <div className="absolute inset-0">
        {videoUrls.map((src, i) => (
          <video
            key={src}
            ref={(el) => setVideoRef(el, i)}
            src={src}
            poster={posterUrls[i] || "/assets/hero-video-poster.jpg"}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
            muted
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.4) 40%, rgba(10,10,10,0.6) 100%)",
        }}
      />

      {/* Content — heading and subtext now come from DB */}
      <div className="relative z-2 h-full flex flex-col justify-end container-main pb-24 md:pb-32">
        <h1
          className="text-white max-w-[700px] leading-[1.0] tracking-[-0.02em]"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(48px, 8vw, 80px)",
            fontWeight: 400,
          }}
        >
          {heading}
        </h1>

        <p
          className="text-[#a0a0a0] max-w-[560px] mt-6 leading-[1.6] tracking-[0.01em]"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "clamp(16px, 2vw, 18px)",
            fontWeight: 300,
          }}
        >
          {subtext}
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link href="/portfolio" className="btn-outline">
            VIEW PORTFOLIO
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            BOOK NOW
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] bounce-subtle">
        <ChevronDown className="text-[#666666]" size={24} />
      </div>

      {/* Video Indicators — driven by slides length */}
      <div className="absolute bottom-8 right-8 z-[2] flex gap-2">
        {videoUrls.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const current = videoRefs.current[activeIndex];
              const next = videoRefs.current[i];
              if (current && next && i !== activeIndex) {
                current.pause();
                next.currentTime = 0;
                setActiveIndex(i);
                next.play().catch(() => {});
              }
            }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === activeIndex ? "#c17a53" : "rgba(255,255,255,0.3)",
              transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}