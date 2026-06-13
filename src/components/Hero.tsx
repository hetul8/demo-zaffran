import { Star, Clock, MapPin, ArrowDown } from "lucide-react";
import type { HeroContent, RestaurantInfo } from "../types";

const HERO_IMG = "https://images.unsplash.com/photo-1679312061521-d7d619a8cfb7?w=1800&h=1200&fit=crop&auto=format&q=85";
const FOOD_IMG = "https://images.unsplash.com/photo-1710091691777-3115088962c4?w=600&h=700&fit=crop&auto=format&q=85";

export function Hero({ isOpen, heroContent, restaurantInfo }: {
  isOpen: boolean;
  heroContent: HeroContent;
  restaurantInfo: RestaurantInfo;
}) {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg-2)" }}>
      {/* Background image — right half */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Zaffran dining interior"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, var(--bg-2) 0%, rgba(247,241,232,0.85) 30%, rgba(247,241,232,0.2) 60%, rgba(247,241,232,0) 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center" style={{ minHeight: "100vh", paddingTop: "88px", paddingBottom: "48px" }}>
          {/* Text Column */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2"
              style={{
                background: "#fff",
                borderRadius: "var(--radius-pill)",
                boxShadow: "var(--shadow-sm)",
              }}>
              <div className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: isOpen ? "#16a34a" : "#dc2626" }} />
              <span className="text-xs font-semibold" style={{ color: isOpen ? "#16a34a" : "#dc2626" }}>
                {isOpen ? "Open Now" : "Closed"}
              </span>
              <span style={{ color: "var(--border-strong)", fontSize: "10px" }}>|</span>
              <span className="text-xs" style={{ color: "var(--brown-muted)" }}>
                {restaurantInfo.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6" style={{ color: "var(--brown-deep)" }}>
              {heroContent.line1}
              <br />
              <em style={{ color: "var(--terra)", fontStyle: "italic" }}>{heroContent.line2}</em>
              <br />
              {heroContent.line3}
            </h1>

            {/* Subtitle */}
            <p className="mb-10 text-lg" style={{ color: "var(--brown-soft)", lineHeight: 1.75, fontWeight: 300, maxWidth: "480px" }}>
              {heroContent.subtitle}
            </p>

            {/* Star rating */}
            <div className="flex items-center gap-3 mb-10">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => <Star key={i} size={14} fill="var(--terra)" color="var(--terra)" />)}
              </div>
              <span className="text-sm font-medium" style={{ color: "var(--brown-mid)" }}>4.8</span>
              <span className="text-sm" style={{ color: "var(--brown-muted)" }}>· 1,200+ reviews</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => scrollTo("#reserve")}
                className="px-8 py-4 text-sm font-semibold transition-all duration-300"
                style={{
                  background: "var(--terra)",
                  color: "#fff",
                  borderRadius: "var(--radius-btn)",
                  boxShadow: "var(--shadow-terra)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--terra-hover)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(191,79,40,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--terra)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-terra)";
                }}
              >
                Book a Table
              </button>
              <button
                onClick={() => scrollTo("#menu")}
                className="px-8 py-4 text-sm font-semibold transition-all duration-300"
                style={{
                  background: "#fff",
                  color: "var(--brown-mid)",
                  borderRadius: "var(--radius-btn)",
                  boxShadow: "var(--shadow-sm)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                View Menu
              </button>
            </div>

            {/* Quick info cards */}
            <div className="grid grid-cols-2 gap-3 max-w-xs">
              <a
                href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 p-3.5 transition-all duration-200"
                style={{ background: "#fff", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-xs)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-xs)")}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--terra-dim)" }}>
                  <Clock size={14} style={{ color: "var(--terra)" }} />
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--brown-muted)" }}>Hours</div>
                  <div className="text-xs font-semibold" style={{ color: "var(--brown-mid)" }}>12–3, 7–10 PM</div>
                </div>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(restaurantInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3.5 transition-all duration-200"
                style={{ background: "#fff", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-xs)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-xs)")}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "var(--terra-dim)" }}>
                  <MapPin size={14} style={{ color: "var(--terra)" }} />
                </div>
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--brown-muted)" }}>Location</div>
                  <div className="text-xs font-semibold" style={{ color: "var(--brown-mid)" }}>Anand, Gujarat</div>
                </div>
              </a>
            </div>
          </div>

          {/* Floating food photo — desktop only */}
          <div className="hidden xl:flex lg:col-span-6 xl:col-span-7 justify-end items-center pr-8">
            <div className="relative">
              {/* Main food image */}
              <div
                className="overflow-hidden"
                style={{
                  width: "340px",
                  height: "440px",
                  borderRadius: "24px",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <img
                  src={FOOD_IMG}
                  alt="Signature dish"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <div
                className="absolute -left-12 bottom-12 p-4"
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-md)",
                  minWidth: "160px",
                }}
              >
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map((i) => <Star key={i} size={11} fill="var(--terra)" color="var(--terra)" />)}
                </div>
                <div className="text-sm font-semibold" style={{ color: "var(--brown-deep)" }}>Chef's Table</div>
                <div className="text-xs" style={{ color: "var(--brown-muted)" }}>Experience the best</div>
              </div>
              {/* Terracotta accent circle */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
                style={{ background: "var(--terra-dim)", border: "2px solid var(--terra-border)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
        onClick={() => scrollTo("#menu")}
      >
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--brown-muted)", letterSpacing: "0.15em" }}>Explore</span>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-md"
          style={{ background: "#fff", boxShadow: "var(--shadow-sm)" }}
        >
          <ArrowDown size={16} style={{ color: "var(--terra)" }} />
        </div>
      </button>
    </section>
  );
}
