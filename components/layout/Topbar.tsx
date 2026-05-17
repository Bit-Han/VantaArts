"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  LogOut,
  Video,
  User,
  LayoutGrid,
  ImageIcon,
  Star,
  Layers,
  FileText,
  Settings,
  X,
} from "lucide-react";
import { createClient } from "@/lib/modules/supabase/client";

// ─── All searchable admin sections ───────────────────────────────────────────
const SEARCHABLE_SECTIONS = [
  {
    label: "Hero Section",
    description: "Edit videos, heading & subtext",
    href: "/admin/hero",
    icon: Video,
    keywords: ["hero", "video", "heading", "subtext", "slides", "banner"],
  },
  {
    label: "About Section",
    description: "Edit artist bio & photo",
    href: "/admin/about",
    icon: User,
    keywords: ["about", "bio", "artist", "photo", "paragraph", "profile"],
  },
  {
    label: "Work Categories",
    description: "Edit the 3 category cards",
    href: "/admin/categories",
    icon: LayoutGrid,
    keywords: ["categories", "inks", "canvas", "walls", "collection", "cards"],
  },
  {
    label: "Featured Works",
    description: "Manage selected projects",
    href: "/admin/featured-works",
    icon: ImageIcon,
    keywords: ["featured", "works", "projects", "portfolio", "selected"],
  },
  {
    label: "Testimonials",
    description: "Add & edit client reviews",
    href: "/admin/testimonials",
    icon: Star,
    keywords: ["testimonials", "reviews", "clients", "quotes", "rating"],
  },
  {
    label: "Services",
    description: "Edit service pages & pricing",
    href: "/admin/services",
    icon: Layers,
    keywords: ["services", "pricing", "tiers", "face painting", "body art"],
  },
  {
    label: "Gallery",
    description: "Manage portfolio images",
    href: "/admin/gallery",
    icon: FileText,
    keywords: ["gallery", "images", "portfolio", "upload", "photos"],
  },
  {
    label: "Site Settings",
    description: "WhatsApp, CTA, global config",
    href: "/admin/settings",
    icon: Settings,
    keywords: ["settings", "whatsapp", "cta", "config", "global", "number"],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminUser {
  email: string;
  initials: string;
  displayName: string;
}

interface SiteSettings {
  site_name: string;
}

interface SearchResult {
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(email: string): string {
  const local = email.split("@")[0];
  const parts = local.split(/[._-]/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return local.slice(0, 2).toUpperCase();
}

function getDisplayName(email: string): string {
  const local = email.split("@")[0];
  const parts = local.split(/[._-]/);
  return parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function searchSections(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return SEARCHABLE_SECTIONS.filter(
    (s) =>
      s.label.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.includes(q))
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Topbar() {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [siteName, setSiteName] = useState("Sheffex Arts");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Fetch auth user ──────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email ?? "";
      if (email) {
        setUser({
          email,
          initials: getInitials(email),
          displayName: getDisplayName(email),
        });
      }
    });
  }, []);

  // ── Fetch site name from settings ────────────────────────────────────────
  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((s: SiteSettings) => {
        if (s.site_name) setSiteName(s.site_name);
      })
      .catch(() => {
        // silently fall back to default
      });
  }, []);

  // ── Search logic ────────────────────────────────────────────────────────
const results = useMemo(()=> searchSections(query), [query]);

  // ── Close dropdown on outside click ──────────────────────────────────────
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Keyboard shortcut: Cmd/Ctrl + K ──────────────────────────────────────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleResultClick = (href: string) => {
    router.push(href);
    setSearchOpen(false);
    setQuery("");
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header
      className="sticky top-0 z-30 border-b"
      style={{
        background: "#0a0a0a",
        borderColor: "#1a1a1a",
      }}
    >
      <div className="flex items-center justify-between h-16 px-6 md:px-8">

        {/* ── Search Bar ─────────────────────────────────────────────────── */}
        <div className="flex-1 max-w-xl" ref={searchRef}>
          <div className="relative">
            {/* Icon */}
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: "#555" }}
            />

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search sections… (⌘K)"
              className="w-full pl-9 pr-10 py-2 rounded-lg text-sm outline-none transition-colors"
              style={{
                background: "#111",
                border: "1px solid #1e1e1e",
                color: "#fff",
                fontFamily: "'Outfit', sans-serif",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results.length > 0) {
                  handleResultClick(results[0].href);
                }
              }}
            />

            {/* Clear button */}
            {query && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "#555" }}
                onClick={() => {
                  setQuery("");
                  setSearchOpen(false);
                  inputRef.current?.focus();
                }}
              >
                <X size={14} />
              </button>
            )}

            {/* ── Dropdown Results ─────────────────────────────────────── */}
            {searchOpen && results.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden shadow-2xl"
                style={{
                  background: "#111",
                  border: "1px solid #1e1e1e",
                  zIndex: 50,
                }}
              >
                {results.map((result) => {
                  const Icon = result.icon;
                  return (
                    <button
                      key={result.href}
                      onClick={() => handleResultClick(result.href)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors group"
                      style={{ borderBottom: "1px solid #1a1a1a" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "#161616";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: "#c17a5318",
                          color: "#c17a53",
                        }}
                      >
                        <Icon size={15} />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{
                            color: "#fff",
                            fontFamily: "'Outfit', sans-serif",
                          }}
                        >
                          {result.label}
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            color: "#555",
                            fontFamily: "'Outfit', sans-serif",
                          }}
                        >
                          {result.description}
                        </p>
                      </div>
                      <span
                        className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          color: "#c17a53",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        Go →
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* No results state */}
            {searchOpen && query.trim() && results.length === 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 rounded-xl px-4 py-5 text-center"
                style={{
                  background: "#111",
                  border: "1px solid #1e1e1e",
                  zIndex: 50,
                }}
              >
                <p
                  className="text-sm"
                  style={{
                    color: "#555",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  No sections found for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Side ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 ml-4">

          {/* Site name badge */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg mr-2"
            style={{
              background: "#c17a5312",
              border: "1px solid #c17a5330",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#c17a53" }}
            />
            <span
              className="text-xs tracking-wide"
              style={{
                color: "#c17a53",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {siteName}
            </span>
          </div>

          {/* Notification bell */}
          <button
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: "#555" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#c17a53")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#555")
            }
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#c17a53" }}
            />
          </button>

          {/* Divider */}
          <div
            className="w-px h-6 mx-1"
            style={{ background: "#1e1e1e" }}
          />

          {/* User profile + sign out */}
          <div className="flex items-center gap-3 pl-1">
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: "#c17a5322",
                color: "#c17a53",
                fontFamily: "'Outfit', sans-serif",
                border: "1px solid #c17a5340",
              }}
            >
              {user?.initials ?? "—"}
            </div>

            {/* Name + email */}
            <div className="hidden md:flex flex-col">
              <span
                className="text-xs font-medium leading-tight"
                style={{
                  color: "#fff",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {user?.displayName ?? "Admin"}
              </span>
              <span
                className="text-[10px] leading-tight"
                style={{
                  color: "#555",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {user?.email ?? ""}
              </span>
            </div>

            {/* Sign out */}
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="p-2 rounded-lg transition-colors ml-1"
              style={{ color: "#555" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "#555")
              }
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut
                className={`w-4 h-4 ${signingOut ? "animate-pulse" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}