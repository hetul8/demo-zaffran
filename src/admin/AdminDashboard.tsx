import { ShoppingBag, CalendarDays, CalendarHeart, UtensilsCrossed, TrendingUp, Clock } from "lucide-react";
import type { Order, Reservation, BanquetInquiry, MenuItem } from "../types";

const A = { brown: "#2C1810", mid: "#5C3D2E", muted: "#9C7D6A", terra: "#C4552A", border: "rgba(44,24,16,0.1)", card: "#FFFFFF", input: "#EDE6DC", bg: "#F5F0E8" };

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new: { bg: "rgba(196,85,42,0.12)", color: "#C4552A" },
  confirmed: { bg: "rgba(22,163,74,0.1)", color: "#16a34a" },
  preparing: { bg: "rgba(234,179,8,0.12)", color: "#ca8a04" },
  ready: { bg: "rgba(59,130,246,0.1)", color: "#2563eb" },
  delivered: { bg: "rgba(22,163,74,0.1)", color: "#16a34a" },
  completed: { bg: "rgba(107,114,128,0.1)", color: "#6b7280" },
  cancelled: { bg: "rgba(185,28,28,0.1)", color: "#b91c1c" },
  pending: { bg: "rgba(234,179,8,0.12)", color: "#ca8a04" },
  seated: { bg: "rgba(59,130,246,0.1)", color: "#2563eb" },
  "no-show": { bg: "rgba(185,28,28,0.1)", color: "#b91c1c" },
  contacted: { bg: "rgba(59,130,246,0.1)", color: "#2563eb" },
  quoted: { bg: "rgba(139,105,20,0.1)", color: "#8B6914" },
  booked: { bg: "rgba(22,163,74,0.1)", color: "#16a34a" },
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

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? { bg: "#eee", color: "#666" };
  return (
    <span className="px-2 py-0.5 rounded text-xs capitalize" style={{ background: s.bg, color: s.color, fontWeight: 500 }}>
      {status}
    </span>
  );
}

export function AdminDashboard({ orders, reservations, inquiries, menuItems, onNavigate }: {
  orders: Order[];
  reservations: Reservation[];
  inquiries: BanquetInquiry[];
  menuItems: MenuItem[];
  onNavigate: (s: "orders" | "reservations" | "events" | "menu" | "content") => void;
}) {
  const todayStr = new Date().toISOString().split("T")[0];
  const todayRevenue = orders.filter((o) => o.status !== "cancelled" && o.createdAt.startsWith(todayStr)).reduce((s, o) => s + o.total, 0);
  const newOrders = orders.filter((o) => o.status === "new").length;
  const todayRes = reservations.filter((r) => r.date === todayStr).length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;

  const stats = [
    { label: "Today's Revenue", value: `₹${todayRevenue.toLocaleString()}`, icon: <TrendingUp size={20} />, color: "#16a34a", onClick: () => onNavigate("orders") },
    { label: "New Orders", value: String(newOrders), icon: <ShoppingBag size={20} />, color: "#C4552A", onClick: () => onNavigate("orders") },
    { label: "Today's Reservations", value: String(todayRes), icon: <CalendarDays size={20} />, color: "#2563eb", onClick: () => onNavigate("reservations") },
    { label: "New Event Inquiries", value: String(newInquiries), icon: <CalendarHeart size={20} />, color: "#8B6914", onClick: () => onNavigate("events") },
    { label: "Active Menu Items", value: String(menuItems.filter((m) => !m.hidden).length), icon: <UtensilsCrossed size={20} />, color: "#7A6555", onClick: () => onNavigate("menu") },
    { label: "Total Reservations", value: String(reservations.length), icon: <Clock size={20} />, color: "#9C7D6A", onClick: () => onNavigate("reservations") },
  ];

  const recentOrders = [...orders].slice(0, 5);
  const todayReservations = reservations.filter((r) => r.date === todayStr || r.status === "pending").slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <button key={stat.label} onClick={stat.onClick}
            className="p-5 text-left transition-all duration-200 hover:shadow-sm"
            style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(44,24,16,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = A.border)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Lora', serif", color: A.brown }}>{stat.value}</div>
            <div className="text-xs" style={{ color: A.muted }}>{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
            <span className="text-sm font-medium" style={{ color: A.brown }}>Recent Orders</span>
            <button onClick={() => onNavigate("orders")} className="text-xs transition-colors" style={{ color: A.muted }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.terra)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.muted)}>
              View all →
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: A.border }}>
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <div className="text-sm font-medium" style={{ color: A.brown }}>{order.name}</div>
                  <div className="text-xs" style={{ color: A.muted }}>{order.id} · {order.type} · {timeAgo(order.createdAt)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold" style={{ color: A.terra }}>₹{order.total}</span>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Reservations */}
        <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
            <span className="text-sm font-medium" style={{ color: A.brown }}>Upcoming Reservations</span>
            <button onClick={() => onNavigate("reservations")} className="text-xs transition-colors" style={{ color: A.muted }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.terra)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = A.muted)}>
              View all →
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: A.border }}>
            {todayReservations.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm" style={{ color: A.muted }}>No upcoming reservations</div>
            ) : todayReservations.map((res) => (
              <div key={res.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <div className="text-sm font-medium" style={{ color: A.brown }}>{res.name}</div>
                  <div className="text-xs" style={{ color: A.muted }}>{res.date} · {res.time} · {res.guests} guests</div>
                </div>
                <StatusBadge status={res.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
          <span className="text-sm font-medium" style={{ color: A.brown }}>Quick Actions</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5">
          {[
            { label: "Manage Orders", onClick: () => onNavigate("orders"), color: "#C4552A" },
            { label: "Manage Reservations", onClick: () => onNavigate("reservations"), color: "#2563eb" },
            { label: "Edit Menu", onClick: () => onNavigate("menu"), color: "#7A6555" },
            { label: "Edit Content", onClick: () => onNavigate("content"), color: "#8B6914" },
          ].map((action) => (
            <button key={action.label} onClick={action.onClick}
              className="py-3 text-xs tracking-wide text-center transition-all duration-200"
              style={{ border: `1.5px solid ${action.color}`, color: action.color, borderRadius: "4px" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = `${action.color}10`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
