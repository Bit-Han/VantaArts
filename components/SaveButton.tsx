"use client";
import { Loader, Check } from "lucide-react";

interface Props {
  saving: boolean;
  saved: boolean;
  onClick: () => void;
  label?: string;
}

export default function SaveButton({ saving, saved, onClick, label = "Save Changes" }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm tracking-[0.05em] uppercase font-medium transition-all duration-300"
      style={{
        background: saved ? "#2a5a3a" : saving ? "#8a5a3a" : "#c17a53",
        color: "white",
        fontFamily: "'Outfit', sans-serif",
        cursor: saving ? "not-allowed" : "pointer",
        minWidth: "160px",
        justifyContent: "center",
      }}
    >
      {saving ? (
        <><Loader size={14} className="animate-spin" /> Saving...</>
      ) : saved ? (
        <><Check size={14} /> Saved!</>
      ) : (
        label
      )}
    </button>
  );
}