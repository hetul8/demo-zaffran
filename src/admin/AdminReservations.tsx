import { useState } from "react";
import { X } from "lucide-react";
import type { Reservation } from "../types";

const A = { brown: "#2C1810", mid: "#5C3D2E", muted: "#9C7D6A", terra: "#C4552A", border: "rgba(44,24,16,0.1)", card: "#FFFFFF", input: "#EDE6DC" };

const RES_STATUSES: Reservation["status"][] = ["pending","confirmed","seated","completed","cancelled","no-show"];

const STATUS_META: Record<Reservation["status"], { bg: string; color: string; label: string }> = {
  pending:   { bg: "rgba(234,179,8,0.12)",   color: "#ca8a04",  label: "Pending" },
  confirmed: { bg: "rgba(22,163,74,0.1)",    color: "#16a34a",  label: "Confirmed" },
  seated:    { bg: "rgba(59,130,246,0.1)",   color: "#2563eb",  label: "Seated" },
  completed: { bg: "rgba(107,114,128,0.1)",  color: "#6b7280",  label: "Completed" },
  cancelled: { bg: "rgba(185,28,28,0.1)",    color: "#b91c1c",  label: "Cancelled" },
  "no-show": { bg: "rgba(185,28,28,0.08)",   color: "#991b1b",  label: "No-Show" },
};

const OCCASION_LABELS: Record<string, string> = { birthday: "Birthday", anniversary: "Anniversary", business: "Business", proposal: "Proposal", other: "Other" };

function ResDetailModal({ res, onClose, onUpdateStatus }: { res: Reservation; onClose: () => void; onUpdateStatus: (s: Reservation["status"]) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(44,24,16,0.5)" }}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: A.card, borderRadius: "8px" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
          <div>
            <div className="text-sm font-semibold" style={{ color: A.brown }}>{res.id}</div>
            <div className="text-xs" style={{ color: A.muted }}>{res.date} · {res.time}</div>
          </div>
          <button onClick={onClose} style={{ color: A.muted }}><X size={18} /></button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { l: "Name", v: res.name },
              { l: "Phone", v: res.phone },
              { l: "Email", v: res.email ?? "—" },
              { l: "Date", v: res.date },
              { l: "Time", v: res.time },
              { l: "Guests", v: String(res.guests) },
              { l: "Occasion", v: res.occasion ? (OCCASION_LABELS[res.occasion] ?? res.occasion) : "—" },
            ].map((r) => (
              <div key={r.l}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: A.muted }}>{r.l}</div>
                <div className="text-sm font-medium" style={{ color: A.brown }}>{r.v}</div>
              </div>
            ))}
          </div>
          {res.requests && (
            <div className="mb-6 p-4" style={{ background: "#F5F0E8", borderRadius: "4px" }}>
              <div className="text-xs uppercase tracking-wider mb-2" style={{ color: A.muted }}>Special Requests</div>
              <p className="text-sm" style={{ color: A.mid }}>{res.requests}</p>
            </div>
          )}
          <div>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: A.muted }}>Update Status</div>
            <div className="grid grid-cols-3 gap-2">
              {RES_STATUSES.map((s) => {
                const m = STATUS_META[s];
                const active = res.status === s;
                return (
                  <button key={s} onClick={() => onUpdateStatus(s)}
                    className="py-2 text-xs transition-all duration-200"
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

export function AdminReservations({ reservations, onUpdate }: { reservations: Reservation[]; onUpdate: (r: Reservation[]) => void }) {
  const [filter, setFilter] = useState<Reservation["status"] | "all">("all");
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [search, setSearch] = useState("");

  const filtered = reservations
    .filter((r) => filter === "all" || r.status === filter)
    .filter((r) => !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search));

  const updateStatus = (id: string, status: Reservation["status"]) => {
    const updated = reservations.map((r) => r.id === id ? { ...r, status } : r);
    onUpdate(updated);
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="flex flex-col gap-6">
      {selected && <ResDetailModal res={selected} onClose={() => setSelected(null)} onUpdateStatus={(s) => updateStatus(selected.id, s)} />}

      <div className="flex flex-wrap gap-3 items-center">
        <input placeholder="Search by name or phone…" value={search} onChange={(e) => setSearch(e.target.value)}
          className="text-sm outline-none px-3 py-2"
          style={{ background: A.card, border: `1px solid ${A.border}`, borderRadius: "4px", color: A.brown, minWidth: "200px" }} />
        <div className="flex flex-wrap gap-2">
          {(["all", ...RES_STATUSES] as const).map((s) => {
            const count = s === "all" ? reservations.length : reservations.filter((r) => r.status === s).length;
            const active = filter === s;
            return (
              <button key={s} onClick={() => setFilter(s)} className="px-3 py-1.5 text-xs capitalize transition-all duration-200"
                style={{ background: active ? A.terra : A.card, border: `1px solid ${active ? A.terra : A.border}`, color: active ? "#FAF7F2" : A.muted, borderRadius: "4px" }}>
                {s === "all" ? "All" : STATUS_META[s].label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${A.border}` }}>
                {["ID", "Name", "Phone", "Date", "Time", "Guests", "Occasion", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest" style={{ color: A.muted, fontWeight: 500, letterSpacing: "0.08em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((res) => {
                const m = STATUS_META[res.status];
                return (
                  <tr key={res.id} style={{ borderBottom: `1px solid ${A.border}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: A.terra }}>{res.id}</td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: A.brown }}>{res.name}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: A.muted }}>{res.phone}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: A.mid }}>{res.date}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: A.mid }}>{res.time}</td>
                    <td className="px-4 py-3 text-sm text-center" style={{ color: A.mid }}>{res.guests}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: A.muted }}>
                      {res.occasion ? (OCCASION_LABELS[res.occasion] ?? res.occasion) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs" style={{ background: m.bg, color: m.color, fontWeight: 500 }}>{m.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(res)} className="text-xs px-3 py-1.5 transition-all duration-200"
                        style={{ border: `1px solid ${A.border}`, color: A.mid, borderRadius: "4px" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.terra; (e.currentTarget as HTMLButtonElement).style.color = A.terra; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.border; (e.currentTarget as HTMLButtonElement).style.color = A.mid; }}>
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="px-5 py-12 text-center text-sm" style={{ color: A.muted }}>No reservations found.</div>}
        </div>
      </div>
    </div>
  );
}
