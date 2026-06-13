import { useState } from "react";
import { Save, RefreshCw, Eye } from "lucide-react";
import type { RestaurantInfo, HeroContent } from "../types";
import { DEFAULT_RESTAURANT_INFO, DEFAULT_HERO } from "../types";

const A = { brown: "#2C1810", mid: "#5C3D2E", muted: "#9C7D6A", terra: "#C4552A", border: "rgba(44,24,16,0.1)", card: "#FFFFFF", input: "#EDE6DC", bg: "#F5F0E8" };

const inputStyle = { background: A.input, border: `1px solid ${A.border}`, borderRadius: "4px", color: A.brown, width: "100%", padding: "10px 12px", fontSize: "0.875rem", outline: "none" };

type Tab = "hero" | "restaurant" | "hours";

export function AdminContentEditor({ restaurantInfo, heroContent, onUpdateInfo, onUpdateHero }: {
  restaurantInfo: RestaurantInfo;
  heroContent: HeroContent;
  onUpdateInfo: (r: RestaurantInfo) => void;
  onUpdateHero: (h: HeroContent) => void;
}) {
  const [tab, setTab] = useState<Tab>("hero");
  const [info, setInfo] = useState<RestaurantInfo>(restaurantInfo);
  const [hero, setHero] = useState<HeroContent>(heroContent);
  const [saved, setSaved] = useState<Tab | null>(null);

  const saveInfo = () => { onUpdateInfo(info); flash("restaurant"); };
  const saveHero = () => { onUpdateHero(hero); flash("hero"); };
  const saveHours = () => { onUpdateInfo(info); flash("hours"); };

  const flash = (t: Tab) => { setSaved(t); setTimeout(() => setSaved(null), 2000); };

  const updateHour = (idx: number, field: keyof RestaurantInfo["hours"][0], val: string) => {
    const newHours = info.hours.map((h, i) => i === idx ? { ...h, [field]: val } : h);
    setInfo({ ...info, hours: newHours });
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: "hero", label: "Hero Section" },
    { id: "restaurant", label: "Restaurant Info" },
    { id: "hours", label: "Opening Hours" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Tabs */}
      <div className="flex gap-0" style={{ borderBottom: `1.5px solid ${A.border}` }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-5 py-3 text-sm relative transition-colors duration-200"
            style={{ color: tab === t.id ? A.terra : A.muted, fontWeight: tab === t.id ? 500 : 400 }}>
            {t.label}
            {tab === t.id && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: A.terra }} />}
          </button>
        ))}
      </div>

      {/* Hero Section Editor */}
      {tab === "hero" && (
        <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
          <div className="px-6 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
            <div className="text-sm font-medium" style={{ color: A.brown }}>Hero Section</div>
            <div className="text-xs mt-0.5" style={{ color: A.muted }}>Controls the main headline and subtitle visible above the fold</div>
          </div>
          <div className="p-6 flex flex-col gap-5">
            {/* Live Preview */}
            <div className="p-5 rounded" style={{ background: A.bg, border: `1px solid ${A.border}` }}>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: A.muted }}>Live Preview</div>
              <div className="text-xs mb-2" style={{ color: A.terra, letterSpacing: "0.15em" }}>Fine Dining · Anand, Gujarat</div>
              <div style={{ fontFamily: "'Lora', serif", lineHeight: 1.1, fontSize: "1.4rem", color: A.brown }}>
                {hero.line1}<br />
                <em style={{ color: A.terra }}>{hero.line2}</em><br />
                {hero.line3}
              </div>
              <p className="text-sm mt-3" style={{ color: A.mid, lineHeight: 1.7 }}>{hero.subtitle}</p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Headline — Line 1</label>
              <input value={hero.line1} onChange={(e) => setHero({ ...hero, line1: e.target.value })} style={inputStyle} placeholder="Where Every" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Headline — Line 2 (Highlighted in terracotta)</label>
              <input value={hero.line2} onChange={(e) => setHero({ ...hero, line2: e.target.value })} style={inputStyle} placeholder="Meal Becomes" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Headline — Line 3</label>
              <input value={hero.line3} onChange={(e) => setHero({ ...hero, line3: e.target.value })} style={inputStyle} placeholder="a Memory" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Subtitle / Tagline</label>
              <textarea rows={3} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} style={{ ...inputStyle, resize: "none" }} />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setHero(DEFAULT_HERO)} className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest"
                style={{ border: `1px solid ${A.border}`, color: A.muted, borderRadius: "4px", letterSpacing: "0.1em" }}>
                <RefreshCw size={12} /> Reset
              </button>
              <button onClick={saveHero} className="flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-200"
                style={{ background: saved === "hero" ? "#16a34a" : A.terra, color: "#FAF7F2", borderRadius: "4px", letterSpacing: "0.1em" }}>
                {saved === "hero" ? <><Save size={12} /> Saved!</> : <><Save size={12} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Info Editor */}
      {tab === "restaurant" && (
        <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
          <div className="px-6 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
            <div className="text-sm font-medium" style={{ color: A.brown }}>Restaurant Information</div>
            <div className="text-xs mt-0.5" style={{ color: A.muted }}>Changes here update the header, footer, contact section, and maps link</div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Restaurant Name</label>
              <input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Tagline</label>
              <input value={info.tagline} onChange={(e) => setInfo({ ...info, tagline: e.target.value })} style={inputStyle} placeholder="Fine Indian Dining · Anand" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Phone Number</label>
              <input value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} style={inputStyle} placeholder="+91 2692 123456" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Email Address</label>
              <input type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} style={inputStyle} placeholder="hello@zaffran.in" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Street Address</label>
              <input value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} style={inputStyle} placeholder="12, Sardar Patel Road, Anand" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>City / State / Pin</label>
              <input value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} style={inputStyle} placeholder="Gujarat 388001" />
            </div>

            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button onClick={() => setInfo(DEFAULT_RESTAURANT_INFO)} className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest"
                style={{ border: `1px solid ${A.border}`, color: A.muted, borderRadius: "4px", letterSpacing: "0.1em" }}>
                <RefreshCw size={12} /> Reset
              </button>
              <button onClick={saveInfo} className="flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-200"
                style={{ background: saved === "restaurant" ? "#16a34a" : A.terra, color: "#FAF7F2", borderRadius: "4px", letterSpacing: "0.1em" }}>
                {saved === "restaurant" ? <><Save size={12} /> Saved!</> : <><Save size={12} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hours Editor */}
      {tab === "hours" && (
        <div style={{ background: A.card, borderRadius: "6px", border: `1px solid ${A.border}` }}>
          <div className="px-6 py-4" style={{ borderBottom: `1px solid ${A.border}` }}>
            <div className="text-sm font-medium" style={{ color: A.brown }}>Opening Hours</div>
            <div className="text-xs mt-0.5" style={{ color: A.muted }}>Changes propagate to the contact section and real-time Open/Closed indicator</div>
          </div>
          <div className="p-6 flex flex-col gap-6">
            {info.hours.map((h, i) => (
              <div key={i}>
                <div className="text-sm font-medium mb-3" style={{ color: A.brown, fontFamily: "'Lora', serif", fontStyle: "italic" }}>{h.day}</div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Lunch Hours</label>
                    <input value={h.lunch} onChange={(e) => updateHour(i, "lunch", e.target.value)} style={inputStyle} placeholder="12:00 – 15:00" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Dinner Hours</label>
                    <input value={h.dinner} onChange={(e) => updateHour(i, "dinner", e.target.value)} style={inputStyle} placeholder="19:00 – 22:00" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-1.5" style={{ color: A.muted, letterSpacing: "0.1em" }}>Kitchen Closes</label>
                    <input value={h.kitchen} onChange={(e) => updateHour(i, "kitchen", e.target.value)} style={inputStyle} placeholder="21:30" />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => setInfo({ ...info, hours: DEFAULT_RESTAURANT_INFO.hours })}
                className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest"
                style={{ border: `1px solid ${A.border}`, color: A.muted, borderRadius: "4px", letterSpacing: "0.1em" }}>
                <RefreshCw size={12} /> Reset
              </button>
              <button onClick={saveHours} className="flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest transition-all duration-200"
                style={{ background: saved === "hours" ? "#16a34a" : A.terra, color: "#FAF7F2", borderRadius: "4px", letterSpacing: "0.1em" }}>
                {saved === "hours" ? <><Save size={12} /> Saved!</> : <><Save size={12} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4" style={{ background: "rgba(196,85,42,0.06)", border: "1px solid rgba(196,85,42,0.2)", borderRadius: "6px" }}>
        <Eye size={15} style={{ color: A.terra, marginTop: "2px", flexShrink: 0 }} />
        <p className="text-xs leading-relaxed" style={{ color: A.mid }}>
          All changes take effect <strong>instantly</strong> on the customer website — no refresh needed. Use <strong>"View Website"</strong> in the sidebar to preview how it looks to your guests.
        </p>
      </div>
    </div>
  );
}
