import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed, Phone } from "lucide-react";
import type { RestaurantInfo } from "../types";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Reserve", href: "#reserve" },
  { label: "Order", href: "#order" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#info" },
];

export function Header({ cartCount, restaurantInfo }: { cartCount: number; restaurantInfo: RestaurantInfo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(253,250,247,0.95)" : "rgba(253,250,247,0.0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(26,12,6,0.06), 0 4px 24px rgba(26,12,6,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20" style={{ height: "72px" }}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: "var(--terra)", boxShadow: "0 4px 12px rgba(191,79,40,0.3)" }}
            >
              <UtensilsCrossed size={15} color="#fff" strokeWidth={2.2} />
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.35rem", color: "var(--brown-deep)", letterSpacing: "-0.02em" }}>
              {restaurantInfo.name}
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => nav(l.href)}
                className="px-4 py-2 text-sm rounded-full transition-all duration-200"
                style={{ color: "var(--brown-soft)", fontWeight: 500 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--bg-2)";
                  (e.currentTarget as HTMLElement).style.color = "var(--brown-deep)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--brown-soft)";
                }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-sm transition-colors duration-200"
              style={{ color: "var(--brown-muted)", fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terra)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--brown-muted)")}
            >
              <Phone size={13} /> {restaurantInfo.phone}
            </a>
            <button
              onClick={() => nav("#reserve")}
              className="px-5 py-2.5 text-sm font-medium transition-all duration-200"
              style={{
                background: "var(--terra)",
                color: "#fff",
                borderRadius: "var(--radius-btn)",
                boxShadow: "var(--shadow-terra)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--terra-hover)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--terra)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Book a Table
            </button>
            {cartCount > 0 && (
              <button
                onClick={() => nav("#order")}
                className="px-4 py-2.5 text-sm font-medium transition-all duration-200"
                style={{ border: "1.5px solid var(--terra)", color: "var(--terra)", borderRadius: "var(--radius-btn)", background: "var(--terra-dim)" }}
              >
                Cart ({cartCount})
              </button>
            )}
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "var(--brown-mid)" }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden mx-4 mb-4 p-5 flex flex-col gap-3 animate-fade-in"
          style={{ background: "#fff", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)" }}
        >
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => nav(l.href)}
              className="text-left py-2 text-sm font-medium transition-colors"
              style={{ color: "var(--brown-mid)" }}>
              {l.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2" style={{ borderTop: "1px solid var(--border)" }}>
            <a href={`tel:${restaurantInfo.phone}`} className="flex items-center gap-2 text-sm" style={{ color: "var(--terra)" }}>
              <Phone size={14} /> {restaurantInfo.phone}
            </a>
            <button onClick={() => nav("#reserve")}
              className="w-full py-3 text-sm font-semibold"
              style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-btn)" }}>
              Book a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
