import { UtensilsCrossed, Instagram, Facebook, Twitter, Settings } from "lucide-react";
import type { RestaurantInfo } from "../types";

export function Footer({ restaurantInfo, onAdminClick }: { restaurantInfo: RestaurantInfo; onAdminClick: () => void }) {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "var(--brown-deep)" }}>
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "var(--terra)" }}>
                <UtensilsCrossed size={15} color="#fff" strokeWidth={2.2} />
              </div>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.3rem", color: "#F0EAE0" }}>
                {restaurantInfo.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(240,234,224,0.45)", lineHeight: 1.85 }}>
              Fine Indian dining in the heart of Anand, Gujarat.
            </p>
            <div className="flex gap-2">
              {[
                { icon: <Instagram size={15} />, href: "https://instagram.com" },
                { icon: <Facebook size={15} />, href: "https://facebook.com" },
                { icon: <Twitter size={15} />, href: "https://twitter.com" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(240,234,224,0.4)", borderRadius: "8px" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--terra)"; (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,234,224,0.4)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(191,79,40,0.9)" }}>Explore</div>
            <ul className="flex flex-col gap-3">
              {[{ label: "Our Menu", href: "#menu" }, { label: "Book a Table", href: "#reserve" }, { label: "Order Online", href: "#order" }, { label: "Private Events", href: "#events" }, { label: "Contact Us", href: "#info" }].map((l) => (
                <li key={l.href}>
                  <button onClick={() => scrollTo(l.href)} className="text-sm transition-colors duration-200 text-left"
                    style={{ color: "rgba(240,234,224,0.4)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.9)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.4)")}>
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Must Try */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(191,79,40,0.9)" }}>Must Try</div>
            <ul className="flex flex-col gap-3">
              {["Chicken Dum Biryani", "Butter Chicken", "Paneer Tikka", "Dal Makhani Shorba", "Kulfi Falooda"].map((item) => (
                <li key={item}>
                  <button onClick={() => scrollTo("#menu")} className="text-sm text-left transition-colors duration-200"
                    style={{ color: "rgba(240,234,224,0.4)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.9)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.4)")}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] mb-5" style={{ color: "rgba(191,79,40,0.9)" }}>Contact</div>
            <ul className="flex flex-col gap-3">
              <li><a href={`tel:${restaurantInfo.phone}`} className="text-sm transition-colors duration-200 block" style={{ color: "rgba(240,234,224,0.4)" }} onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,234,224,0.9)")} onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,234,224,0.4)")}>{restaurantInfo.phone}</a></li>
              <li><a href={`mailto:${restaurantInfo.email}`} className="text-sm transition-colors duration-200 block" style={{ color: "rgba(240,234,224,0.4)" }} onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,234,224,0.9)")} onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,234,224,0.4)")}>{restaurantInfo.email}</a></li>
              <li><span className="text-sm block leading-relaxed" style={{ color: "rgba(240,234,224,0.3)" }}>{restaurantInfo.address}<br />{restaurantInfo.city}</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs" style={{ color: "rgba(240,234,224,0.2)" }}>
            © 2026 {restaurantInfo.name} Fine Dining. All rights reserved.
          </p>
          <button
            onClick={onAdminClick}
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: "rgba(240,234,224,0.15)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(191,79,40,0.7)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,234,224,0.15)")}
          >
            <Settings size={11} /> Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
