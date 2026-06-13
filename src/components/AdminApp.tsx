"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingBag, CalendarDays, CalendarHeart,
  UtensilsCrossed, Settings, LogOut, Eye, Menu, X, Lock
} from "lucide-react";
import { useRestaurant } from "../context/RestaurantContext";
import { AdminDashboard } from "../admin/AdminDashboard";
import { AdminOrders } from "../admin/AdminOrders";
import { AdminReservations } from "../admin/AdminReservations";
import { AdminEvents } from "../admin/AdminEvents";
import { AdminMenuEditor } from "../admin/AdminMenuEditor";
import { AdminContentEditor } from "../admin/AdminContentEditor";

type Section = "dashboard" | "orders" | "reservations" | "events" | "menu" | "content";

const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode; badge?: (ctx: any) => number }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
  { id: "orders", label: "Orders", icon: <ShoppingBag size={16} />, badge: (ctx) => ctx.orders.filter((o: any) => o.status === "new").length },
  { id: "reservations", label: "Reservations", icon: <CalendarDays size={16} />, badge: (ctx) => ctx.reservations.filter((r: any) => r.status === "pending").length },
  { id: "events", label: "Events", icon: <CalendarHeart size={16} />, badge: (ctx) => ctx.inquiries.filter((i: any) => i.status === "new").length },
  { id: "menu", label: "Menu Editor", icon: <UtensilsCrossed size={16} /> },
  { id: "content", label: "Content Editor", icon: <Settings size={16} /> },
];

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { onLogin(); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-2)", fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "var(--terra)", boxShadow: "var(--shadow-terra)" }}>
            <Lock size={24} color="#fff" />
          </div>
          <h2 className="text-2xl mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--brown-deep)" }}>Admin Panel</h2>
          <p className="text-sm" style={{ color: "var(--brown-muted)" }}>Zaffran Restaurant Management</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-8" style={{ background: "#fff", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)" }}>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full mb-4 outline-none"
              style={{
                padding: "12px 16px",
                background: "var(--bg-2)",
                border: `1.5px solid ${error ? "#dc2626" : "var(--border)"}`,
                borderRadius: "var(--radius-input)",
                color: "var(--brown-deep)",
                fontSize: "0.9rem",
                fontFamily: "'Inter', sans-serif",
                transition: "all 0.2s",
              }}
            />
            {error && <p className="text-xs mb-4" style={{ color: "#dc2626" }}>Incorrect. Try: admin123</p>}
            <button type="submit"
              className="w-full py-3.5 text-sm font-semibold transition-all duration-200"
              style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-btn)", boxShadow: "var(--shadow-terra)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-xs mt-5" style={{ color: "var(--brown-muted)" }}>
          Demo: <strong style={{ color: "var(--terra)" }}>admin123</strong>
        </p>
      </div>
    </div>
  );
}

export function AdminApp() {
  const router = useRouter();
  const context = useRestaurant();
  const {
    orders,
    reservations,
    inquiries,
    menuItems,
    restaurantInfo,
    heroContent,
    setOrders,
    setReservations,
    setInquiries,
    setMenuItems,
    setRestaurantInfo,
    setHeroContent,
  } = context;

  const [authenticated, setAuthenticated] = useState(false);
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!authenticated) return <AdminLogin onLogin={() => setAuthenticated(true)} />;

  const newOrderCount = orders.filter((o) => o.status === "new").length;
  const pendingResCount = reservations.filter((r) => r.status === "pending").length;
  const newEventCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-2)", fontFamily: "'Inter', sans-serif" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" style={{ background: "rgba(26,12,6,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 flex flex-col w-60 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "var(--brown-deep)", minHeight: "100vh" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--terra)" }}>
              <UtensilsCrossed size={13} color="#fff" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: "rgba(240,234,224,0.9)", fontFamily: "'DM Serif Display', serif" }}>{restaurantInfo.name}</div>
              <div className="text-[10px]" style={{ color: "rgba(240,234,224,0.35)" }}>Restaurant Admin</div>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)} style={{ color: "rgba(240,234,224,0.35)" }}>
            <X size={17} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const badgeCount = item.badge ? item.badge(context) : 0;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); setSidebarOpen(false); }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left w-full transition-all duration-200"
                style={{
                  background: active ? "rgba(191,79,40,0.15)" : "transparent",
                  color: active ? "rgba(240,234,224,0.95)" : "rgba(240,234,224,0.4)",
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.8)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = active ? "rgba(240,234,224,0.95)" : "rgba(240,234,224,0.4)"; }}
              >
                <span style={{ color: active ? "var(--terra-hover)" : "rgba(240,234,224,0.3)" }}>{item.icon}</span>
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {badgeCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "var(--terra)", color: "#fff", minWidth: "18px", textAlign: "center" }}>
                    {badgeCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-5 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
          <button onClick={() => router.push("/")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200"
            style={{ color: "rgba(240,234,224,0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.8)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.35)"; }}>
            <Eye size={16} />
            <span className="text-sm">View Website</span>
          </button>
          <button onClick={() => setAuthenticated(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all duration-200"
            style={{ color: "rgba(240,234,224,0.35)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.1)"; (e.currentTarget as HTMLElement).style.color = "#f87171"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.35)"; }}>
            <LogOut size={16} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-5 lg:px-8 h-16 shrink-0"
          style={{ background: "#fff", boxShadow: "0 1px 0 var(--border)" }}>
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)} style={{ color: "var(--brown-muted)" }}>
            <Menu size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--brown-deep)" }}>
              {NAV_ITEMS.find((n) => n.id === section)?.label}
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {newOrderCount > 0 && (
              <div className="px-3 py-1.5 text-xs font-semibold rounded-full" style={{ background: "var(--terra-dim)", color: "var(--terra)" }}>
                {newOrderCount} new order{newOrderCount > 1 ? "s" : ""}
              </div>
            )}
            {pendingResCount > 0 && (
              <div className="px-3 py-1.5 text-xs font-semibold rounded-full" style={{ background: "rgba(22,163,74,0.08)", color: "#16a34a" }}>
                {pendingResCount} pending
              </div>
            )}
            {newEventCount > 0 && (
              <div className="px-3 py-1.5 text-xs font-semibold rounded-full" style={{ background: "rgba(139,105,20,0.08)", color: "#8B6914" }}>
                {newEventCount} inquiry
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-5 lg:p-8">
          {section === "dashboard" && <AdminDashboard orders={orders} reservations={reservations} inquiries={inquiries} menuItems={menuItems} onNavigate={setSection} />}
          {section === "orders" && <AdminOrders orders={orders} onUpdate={setOrders} />}
          {section === "reservations" && <AdminReservations reservations={reservations} onUpdate={setReservations} />}
          {section === "events" && <AdminEvents inquiries={inquiries} onUpdate={setInquiries} />}
          {section === "menu" && <AdminMenuEditor menuItems={menuItems} onUpdate={setMenuItems} />}
          {section === "content" && <AdminContentEditor restaurantInfo={restaurantInfo} heroContent={heroContent} onUpdateInfo={setRestaurantInfo} onUpdateHero={setHeroContent} />}
        </main>
      </div>
    </div>
  );
}
