import { useState } from "react";
import { ChevronDown, Truck, Package, X } from "lucide-react";
import type { Order } from "../types";

const A = { brown: "#2C1810", mid: "#5C3D2E", muted: "#9C7D6A", terra: "#C4552A", border: "rgba(44,24,16,0.1)", card: "#FFFFFF", input: "#EDE6DC", bg: "#F5F0E8" };

const ORDER_STATUSES: Order["status"][] = ["new", "confirmed", "preparing", "ready", "delivered", "cancelled"];

const STATUS_META: Record<Order["status"], { bg: string; color: string; label: string }> = {
  new: { bg: "rgba(196,85,42,0.12)", color: "#C4552A", label: "New" },
  confirmed: { bg: "rgba(22,163,74,0.1)", color: "#16a34a", label: "Confirmed" },
  preparing: { bg: "rgba(234,179,8,0.12)", color: "#ca8a04", label: "Preparing" },
  ready: { bg: "rgba(59,130,246,0.1)", color: "#2563eb", label: "Ready" },
  delivered: { bg: "rgba(22,163,74,0.08)", color: "#15803d", label: "Delivered" },
  cancelled: { bg: "rgba(185,28,28,0.1)", color: "#b91c1c", label: "Cancelled" },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function OrderDetailModal({ order, onClose, onUpdateStatus }: { order: Order; onClose: () => void; onUpdateStatus: (status: Order["status"]) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(44,24,16,0.5)" }}>
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto" style={{ background: A.card, borderRadius: "8px" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
          <div>
            <div className="text-sm font-semibold" style={{ color: A.brown }}>{order.id}</div>
            <div className="text-xs" style={{ color: A.muted }}>{timeAgo(order.createdAt)}</div>
          </div>
          <button onClick={onClose} style={{ color: A.muted }}><X size={18} /></button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[{ l: "Customer", v: order.name }, { l: "Phone", v: order.phone }, { l: "Type", v: order.type }, { l: "Address", v: order.address ?? "—" }].map((r) => (
              <div key={r.l}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: A.muted }}>{r.l}</div>
                <div className="text-sm font-medium" style={{ color: A.brown }}>{r.v}</div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: A.muted }}>Items Ordered</div>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-2" style={{ borderBottom: `1px solid ${A.border}` }}>
                <span className="text-sm" style={{ color: A.mid }}>{item.name} × {item.qty}</span>
                <span className="text-sm font-medium" style={{ color: A.brown }}>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3">
              <span className="text-sm font-semibold" style={{ color: A.brown }}>Total</span>
              <span className="text-sm font-semibold" style={{ color: A.terra }}>₹{order.total}</span>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: A.muted }}>Update Status</div>
            <div className="grid grid-cols-3 gap-2">
              {ORDER_STATUSES.map((s) => {
                const m = STATUS_META[s];
                const active = order.status === s;
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

export function AdminOrders({ orders, onUpdate }: { orders: Order[]; onUpdate: (o: Order[]) => void }) {
  const [filter, setFilter] = useState<Order["status"] | "all">("all");
  const [selected, setSelected] = useState<Order | null>(null);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => o.id === id ? { ...o, status } : o);
    onUpdate(updated);
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  return (
    <div className="flex flex-col gap-6">
      {selected && (
        <OrderDetailModal
          order={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={(s) => updateStatus(selected.id, s)}
        />
      )}

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {(["all", ...ORDER_STATUSES] as const).map((s) => {
          const count = s === "all" ? orders.length : orders.filter((o) => o.status === s).length;
          const active = filter === s;
          return (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-1.5 text-xs capitalize transition-all duration-200"
              style={{
                background: active ? A.terra : A.card,
                border: `1px solid ${active ? A.terra : A.border}`,
                color: active ? "#FAF7F2" : A.muted,
                borderRadius: "4px",
              }}>
              {s === "all" ? "All" : STATUS_META[s].label} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: `1px solid ${A.border}` }}>
                {["Order ID", "Customer", "Type", "Items", "Total", "Status", "Time", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-widest" style={{ color: A.muted, fontWeight: 500, letterSpacing: "0.08em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const m = STATUS_META[order.status];
                return (
                  <tr key={order.id} className="transition-colors" style={{ borderBottom: `1px solid ${A.border}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: A.terra }}>{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium" style={{ color: A.brown }}>{order.name}</div>
                      <div className="text-xs" style={{ color: A.muted }}>{order.phone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-xs" style={{ color: A.mid }}>
                        {order.type === "delivery" ? <Truck size={12} /> : <Package size={12} />}
                        {order.type}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: A.muted }}>{order.items.length} item{order.items.length !== 1 ? "s" : ""}</td>
                    <td className="px-4 py-3 text-sm font-semibold" style={{ color: A.terra }}>₹{order.total}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-xs capitalize" style={{ background: m.bg, color: m.color, fontWeight: 500 }}>{m.label}</span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: A.muted }}>{timeAgo(order.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(order)} className="text-xs px-3 py-1.5 transition-all duration-200"
                        style={{ border: `1px solid ${A.border}`, color: A.mid, borderRadius: "4px" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.terra; (e.currentTarget as HTMLButtonElement).style.color = A.terra; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = A.border; (e.currentTarget as HTMLButtonElement).style.color = A.mid; }}>
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-sm" style={{ color: A.muted }}>No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
