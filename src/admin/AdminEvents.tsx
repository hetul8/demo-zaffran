import { useState } from "react";
import { X } from "lucide-react";
import type { BanquetInquiry } from "../types";

const A = { brown: "#2C1810", mid: "#5C3D2E", muted: "#9C7D6A", terra: "#C4552A", border: "rgba(44,24,16,0.1)", card: "#FFFFFF", input: "#EDE6DC" };

const EVT_STATUSES: BanquetInquiry["status"][] = ["new","contacted","quoted","booked","cancelled"];

const STATUS_META: Record<BanquetInquiry["status"], { bg: string; color: string; label: string }> = {
  new:       { bg: "rgba(196,85,42,0.12)",  color: "#C4552A",  label: "New" },
  contacted: { bg: "rgba(59,130,246,0.1)",  color: "#2563eb",  label: "Contacted" },
  quoted:    { bg: "rgba(139,105,20,0.1)",  color: "#8B6914",  label: "Quoted" },
  booked:    { bg: "rgba(22,163,74,0.1)",   color: "#16a34a",  label: "Booked" },
  cancelled: { bg: "rgba(185,28,28,0.1)",   color: "#b91c1c",  label: "Cancelled" },
};

const PACKAGE_NAMES: Record<string, string> = { silver: "Silver", gold: "Gold", platinum: "Platinum" };

function EventDetailModal({ inq, onClose, onUpdateStatus }: { inq: BanquetInquiry; onClose: () => void; onUpdateStatus: (s: BanquetInquiry["status"]) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(44,24,16,0.5)" }}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: A.card, borderRadius: "8px" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
          <div>
            <div className="text-sm font-semibold" style={{ color: A.brown }}>{inq.id} — {inq.eventType}</div>
            <div className="text-xs" style={{ color: A.muted }}>{inq.date} · {inq.guests} guests</div>
          </div>
          <button onClick={onClose} style={{ color: A.muted }}><X size={18} /></button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { l: "Name", v: inq.name },
              { l: "Phone", v: inq.phone },
              { l: "Email", v: inq.email ?? "—" },
              { l: "Event", v: inq.eventType },
              { l: "Date", v: inq.date },
              { l: "Guests", v: inq.guests },
              { l: "Package", v: PACKAGE_NAMES[inq.package] ?? inq.package },
            ].map((r) => (
              <div key={r.l}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: A.muted }}>{r.l}</div>
                <div className="text-sm font-medium" style={{ color: A.brown }}>{r.v}</div>
              </div>
            ))}
          </div>
          {inq.notes && (
            <div className="mb-6 p-4" style={{ background: "#F5F0E8", borderRadius: "4px" }}>
              <div className="text-xs uppercase tracking-wider mb-2" style={{ color: A.muted }}>Notes</div>
              <p className="text-sm" style={{ color: A.mid }}>{inq.notes}</p>
            </div>
          )}
          <div>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: A.muted }}>Pipeline Status</div>
            <div className="grid grid-cols-5 gap-2">
              {EVT_STATUSES.map((s) => {
                const m = STATUS_META[s];
                const active = inq.status === s;
                return (
                  <button key={s} onClick={() => onUpdateStatus(s)} className="py-2 text-xs transition-all duration-200"
                    style={{ background: active ? m.color : "transparent", border: `1.5px solid ${active ? m.color : A.border}`, color: active ? "#fff" : A.muted, borderRadius: "4px", fontWeight: active ? 600 : 400 }}>
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminEvents({ inquiries, onUpdate }: { inquiries: BanquetInquiry[]; onUpdate: (i: BanquetInquiry[]) => void }) {
  const [filter, setFilter] = useState<BanquetInquiry["status"] | "all">("all");
  const [selected, setSelected] = useState<BanquetInquiry | null>(null);

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  const updateStatus = (id: string, status: BanquetInquiry["status"]) => {
    const updated = inquiries.map((i) => i.id === id ? { ...i, status } : i);
    onUpdate(updated);
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="flex flex-col gap-6">
      {selected && <EventDetailModal inq={selected} onClose={() => setSelected(null)} onUpdateStatus={(s) => updateStatus(selected.id, s)} />}

      <div className="flex flex-wrap gap-2">
        {(["all", ...EVT_STATUSES] as const).map((s) => {
          const count = s === "all" ? inquiries.length : inquiries.filter((i) => i.status === s).length;
          const active = filter === s;
          return (
            <button key={s} onClick={() => setFilter(s)} className="px-3 py-1.5 text-xs capitalize transition-all duration-200"
              style={{ background: active ? A.terra : A.card, border: `1px solid ${active ? A.terra : A.border}`, color: active ? "#FAF7F2" : A.muted, borderRadius: "4px" }}>
              {s === "all" ? "All" : STATUS_META[s].label} ({count})
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((inq) => {
          const m = STATUS_META[inq.status];
          return (
            <div key={inq.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono" style={{ color: A.terra }}>{inq.id}</span>
                  <span className="px-2 py-0.5 rounded text-xs" style={{ background: m.bg, color: m.color, fontWeight: 500 }}>{m.label}</span>
                </div>
                <div className="text-sm font-medium mb-0.5" style={{ color: A.brown }}>{inq.name} — {inq.eventType}</div>
                <div className="text-xs" style={{ color: A.muted }}>
                  {inq.date} · {inq.guests} guests · {PACKAGE_NAMES[inq.package] ?? inq.package} Package · {inq.phone}
                </div>
                {inq.notes && <div className="text-xs mt-1 line-clamp-1" style={{ color: A.muted }}>{inq.notes}</div>}
              </div>
              <div className="flex gap-2 shrink-0">
                {EVT_STATUSES.filter((s) => s !== inq.status && s !== "cancelled").slice(0, 2).map((s) => (
                  <button key={s} onClick={() => updateStatus(inq.id, s)} className="text-xs px-3 py-1.5 transition-all duration-200"
                    style={{ border: `1px solid ${STATUS_META[s].color}`, color: STATUS_META[s].color, borderRadius: "4px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `${STATUS_META[s].color}12`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                    → {STATUS_META[s].label}
                  </button>
                ))}
                <button onClick={() => setSelected(inq)} className="text-xs px-3 py-1.5 transition-all duration-200"
                  style={{ border: `1px solid ${A.border}`, color: A.mid, borderRadius: "4px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.terra; (e.currentTarget as HTMLButtonElement).style.color = A.terra; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.border; (e.currentTarget as HTMLButtonElement).style.color = A.mid; }}>
                  View
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="py-16 text-center text-sm" style={{ color: A.muted }}>No inquiries found.</div>}
      </div>
    </div>
  );
}
