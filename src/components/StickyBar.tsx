import { Phone, CalendarDays, ShoppingBag } from "lucide-react";

export function StickyBar({ cartCount }: { cartCount: number }) {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: "rgba(253,250,247,0.97)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 -1px 0 rgba(26,12,6,0.06), 0 -8px 24px rgba(26,12,6,0.07)",
      }}
    >
      <div className="flex items-stretch h-16">
        <a
          href="tel:+912692123456"
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200"
          style={{ color: "var(--brown-muted)", borderRight: "1px solid var(--border)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--terra)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--brown-muted)")}
        >
          <Phone size={17} />
          <span className="text-[9px] font-semibold uppercase tracking-widest">Call</span>
        </a>

        <button
          onClick={() => scrollTo("#reserve")}
          className="flex-[2] flex items-center justify-center gap-2 font-semibold text-sm transition-colors duration-200"
          style={{ background: "var(--terra)", color: "#fff" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--terra-hover)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--terra)")}
        >
          <CalendarDays size={16} />
          Book a Table
        </button>

        <button
          onClick={() => scrollTo("#order")}
          className="flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors duration-200"
          style={{ color: "var(--brown-muted)", borderLeft: "1px solid var(--border)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--terra)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--brown-muted)")}
        >
          <div className="relative">
            <ShoppingBag size={17} />
            {cartCount > 0 && (
              <div
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: "var(--terra)" }}
              >
                {cartCount}
              </div>
            )}
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-widest">Order</span>
        </button>
      </div>
      <div style={{ height: "env(safe-area-inset-bottom)", background: "rgba(253,250,247,0.97)" }} />
    </div>
  );
}
