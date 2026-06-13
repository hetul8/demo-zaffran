import { useState } from "react";
import { Leaf, Flame, Sprout, WheatOff, Star, Search, Plus } from "lucide-react";
import type { MenuItem, Tag } from "../types";

/* ── Unsplash food images keyed by menu item id ── */
const FOOD_IMGS: Record<number, string> = {
  1:  "https://images.unsplash.com/photo-1524239077444-27413e763bba?w=600&h=380&fit=crop&auto=format&q=80",
  2:  "https://images.unsplash.com/photo-1552914343-05ccdaf123d6?w=600&h=380&fit=crop&auto=format&q=80",
  3:  "https://images.unsplash.com/photo-1716550781939-beb7d7247aae?w=600&h=380&fit=crop&auto=format&q=80",
  4:  "https://images.unsplash.com/photo-1644677867331-03f28942e35c?w=600&h=380&fit=crop&auto=format&q=80",
  5:  "https://images.unsplash.com/photo-1567529854338-fc097b962123?w=600&h=380&fit=crop&auto=format&q=80",
  6:  "https://images.unsplash.com/photo-1710091691777-3115088962c4?w=600&h=380&fit=crop&auto=format&q=80",
  7:  "https://images.unsplash.com/photo-1596560314766-08c0c6890024?w=600&h=380&fit=crop&auto=format&q=80",
  8:  "https://images.unsplash.com/photo-1691170979035-27e5ec943205?w=600&h=380&fit=crop&auto=format&q=80",
  9:  "https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?w=600&h=380&fit=crop&auto=format&q=80",
  10: "https://images.unsplash.com/photo-1565556250026-9ba22083e3e0?w=600&h=380&fit=crop&auto=format&q=80",
  11: "https://images.unsplash.com/photo-1670058124043-4f55e08d0f8f?w=600&h=380&fit=crop&auto=format&q=80",
  12: "https://images.unsplash.com/photo-1567529854338-fc097b962123?w=600&h=380&fit=crop&auto=format&q=80",
  13: "https://images.unsplash.com/photo-1595608010652-d8bf1103a1c5?w=600&h=380&fit=crop&auto=format&q=80",
  14: "https://images.unsplash.com/photo-1681476747916-8a8fc7e2001e?w=600&h=380&fit=crop&auto=format&q=80",
  15: "https://images.unsplash.com/photo-1710354473160-dafce976c2df?w=600&h=380&fit=crop&auto=format&q=80",
  16: "https://images.unsplash.com/photo-1644677867331-03f28942e35c?w=600&h=380&fit=crop&auto=format&q=80",
  17: "https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?w=600&h=380&fit=crop&auto=format&q=80",
  18: "https://images.unsplash.com/photo-1596560314766-08c0c6890024?w=600&h=380&fit=crop&auto=format&q=80",
};

const FILTER_OPTIONS: { label: string; value: Tag | "all"; icon?: React.ReactNode; dotColor?: string }[] = [
  { label: "All Dishes", value: "all" },
  { label: "Vegetarian", value: "veg", icon: <Leaf size={11} />, dotColor: "#16a34a" },
  { label: "Non-Veg", value: "nonveg", icon: <Flame size={11} />, dotColor: "#dc2626" },
  { label: "Vegan", value: "vegan", icon: <Sprout size={11} />, dotColor: "#15803d" },
  { label: "Gluten-Free", value: "gf", icon: <WheatOff size={11} />, dotColor: "#8B6914" },
  { label: "Chef's Special", value: "chefs", icon: <Star size={11} />, dotColor: "var(--terra)" },
];

const TAG_META: Record<Tag, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  veg:    { icon: <Leaf size={9} />,         label: "Veg",     color: "#16a34a", bg: "rgba(22,163,74,0.1)" },
  nonveg: { icon: <Flame size={9} />,        label: "Non-Veg", color: "#dc2626", bg: "rgba(220,38,38,0.1)" },
  vegan:  { icon: <Sprout size={9} />,       label: "Vegan",   color: "#15803d", bg: "rgba(21,128,61,0.1)" },
  gf:     { icon: <WheatOff size={9} />,     label: "GF",      color: "#8B6914", bg: "rgba(139,105,20,0.1)" },
  chefs:  { icon: <Star size={9} fill="var(--terra)" />, label: "Chef's", color: "var(--terra)", bg: "var(--terra-dim)" },
};

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <div className="h-px flex-1 max-w-20" style={{ background: "var(--sand)" }} />
      <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--terra)" }}>{text}</span>
      <div className="h-px flex-1 max-w-20" style={{ background: "var(--sand)" }} />
    </div>
  );
}

function MenuCard({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) {
  const [hovered, setHovered] = useState(false);
  const img = FOOD_IMGS[item.id] ?? FOOD_IMGS[1];

  return (
    <div
      className="group cursor-default flex flex-col overflow-hidden"
      style={{
        background: "#fff",
        borderRadius: "var(--radius-lg)",
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-md)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: "220px", borderRadius: "var(--radius-lg) var(--radius-lg) 0 0" }}>
        <img
          src={img}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />
        {/* Overlay with CTA on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{ background: "rgba(26,12,6,0.45)", opacity: hovered ? 1 : 0 }}
        >
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-transform duration-200"
            style={{
              background: "#fff",
              color: "var(--terra)",
              borderRadius: "var(--radius-btn)",
              transform: hovered ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <Plus size={15} /> Add to Order
          </button>
        </div>
        {/* Spice indicator */}
        {item.spice && item.spice > 0 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {Array.from({ length: item.spice }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: "#ef4444", opacity: 0.6 + i * 0.2 }} />
            ))}
          </div>
        )}
        {/* Chef's special star */}
        {item.tags.includes("chefs") && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1"
            style={{ background: "var(--terra)", borderRadius: "var(--radius-pill)" }}>
            <Star size={10} fill="#fff" color="#fff" />
            <span className="text-[9px] font-bold text-white uppercase tracking-wider">Chef's</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.filter((t) => t !== "chefs").slice(0, 3).map((tag) => {
            const m = TAG_META[tag];
            return (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: m.bg, color: m.color, borderRadius: "var(--radius-pill)" }}
              >
                {m.icon} {m.label}
              </span>
            );
          })}
        </div>

        {/* Name */}
        <h4 className="mb-1.5 flex-1" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--brown-deep)", fontSize: "1.1rem", lineHeight: 1.3 }}>
          {item.name}
        </h4>

        {/* Description */}
        <p className="text-xs mb-4 line-clamp-2" style={{ color: "var(--brown-muted)", lineHeight: 1.7, fontWeight: 400 }}>
          {item.description}
        </p>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--terra)" }}>
            ₹{item.price}
          </span>
          <button
            onClick={() => onAddToCart(item)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold transition-all duration-200"
            style={{
              background: "var(--terra-dim)",
              color: "var(--terra)",
              borderRadius: "var(--radius-btn)",
              border: "1px solid var(--terra-border)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--terra)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--terra-dim)";
              (e.currentTarget as HTMLElement).style.color = "var(--terra)";
            }}
          >
            <Plus size={12} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export function MenuSection({ onAddToCart, menuItems }: { onAddToCart: (item: MenuItem) => void; menuItems: MenuItem[] }) {
  const [activeFilter, setActiveFilter] = useState<Tag | "all">("all");
  const [search, setSearch] = useState("");

  const CATEGORIES = [...new Set(menuItems.map((m) => m.category))].filter((c) => ["Starters","Mains","Desserts","Drinks"].includes(c));

  const filtered = menuItems.filter((item) => {
    const matchFilter = activeFilter === "all" || item.tags.includes(activeFilter);
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section id="menu" className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionLabel text="Live Text Menu" />
          <h2 className="mb-4">Our Culinary Journey</h2>
          <p className="text-base mx-auto" style={{ color: "var(--brown-muted)", maxWidth: "480px", lineHeight: 1.75 }}>
            Every dish is made fresh, every day. Tap any card to add to your order.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((f) => {
              const active = activeFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold transition-all duration-200"
                  style={{
                    background: active ? "var(--terra)" : "#fff",
                    color: active ? "#fff" : "var(--brown-soft)",
                    borderRadius: "var(--radius-pill)",
                    boxShadow: active ? "var(--shadow-terra)" : "var(--shadow-xs)",
                    transform: active ? "translateY(-1px)" : "none",
                  }}
                >
                  {f.dotColor && !active && (
                    <span className="w-2 h-2 rounded-full" style={{ background: f.dotColor }} />
                  )}
                  {f.icon && active && f.icon}
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--brown-muted)" }} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 text-sm outline-none"
              style={{
                background: "#fff",
                border: "none",
                borderRadius: "var(--radius-pill)",
                boxShadow: "var(--shadow-sm)",
                color: "var(--brown-deep)",
                width: "200px",
              }}
            />
          </div>
        </div>

        {/* Grouped by category */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ color: "var(--brown-muted)" }}>No dishes match your filters.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {CATEGORIES.map((cat) => {
              const catItems = filtered.filter((m) => m.category === cat);
              if (catItems.length === 0) return null;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 style={{ fontFamily: "'DM Serif Display', serif", color: "var(--brown-deep)", fontSize: "1.6rem" }}>
                      {cat}
                    </h3>
                    <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                    <span className="text-xs font-medium" style={{ color: "var(--brown-muted)" }}>
                      {catItems.length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {catItems.map((item) => (
                      <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer note */}
        <p className="text-center text-xs mt-12" style={{ color: "var(--brown-muted)" }}>
          All prices in INR · 5% GST applicable · Allergen info available on request
        </p>
      </div>
    </section>
  );
}

export type { MenuItem };
