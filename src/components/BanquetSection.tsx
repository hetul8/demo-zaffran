import { useState } from "react";
import { Users, Calendar, Gift, Phone, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import type { BanquetInquiry, RestaurantInfo } from "../types";

const EVENT_TYPES = ["Wedding Reception","Corporate Dinner","Birthday Party","Engagement Ceremony","Anniversary Celebration","Product Launch","Baby Shower","Other"];
const PACKAGES = [
  { id: "silver", name: "Silver", price: "₹850", per: "/ person", min: 30, features: ["3-course set menu","Welcome drinks","Floral centrepieces","Dedicated coordinator"], accent: "#7A5840" },
  { id: "gold", name: "Gold", price: "₹1,350", per: "/ person", min: 50, features: ["5-course curated menu","Cocktails & mocktails","Premium décor & florals","Live ghazal or jazz duo","Personalised menu cards"], accent: "var(--terra)", featured: true },
  { id: "platinum", name: "Platinum", price: "₹2,200", per: "/ person", min: 75, features: ["7-course chef's tasting","Open bar","Full venue takeover","Live music band","Videography","Custom cake"], accent: "#8B6914" },
];

const inp: React.CSSProperties = { background: "#fff", border: "1.5px solid var(--border)", borderRadius: "var(--radius-input)", color: "var(--brown-deep)", width: "100%", padding: "12px 14px", fontSize: "0.875rem", outline: "none", fontFamily: "'Inter', sans-serif" };

export function BanquetSection({ onSubmit, restaurantInfo }: { onSubmit: (inq: BanquetInquiry) => void; restaurantInfo: RestaurantInfo }) {
  const [step, setStep] = useState<1|2|3|4>(1);
  const [form, setForm] = useState({ eventType: "", date: "", guests: "", package: "", name: "", phone: "", email: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const steps = [{ label: "Event Type", icon: <Gift size={14} /> }, { label: "Date & Size", icon: <Calendar size={14} /> }, { label: "Package", icon: <Sparkles size={14} /> }, { label: "Contact", icon: <Phone size={14} /> }];

  const handleSubmit = () => {
    onSubmit({ id: "", ...form, status: "new", createdAt: new Date().toISOString() } as BanquetInquiry);
    
    const cleanPhone = restaurantInfo.phone.replace(/\D/g, "");
    const packageName = PACKAGES.find((p) => p.id === form.package)?.name || form.package;
    const message = `Hello ${restaurantInfo.name}, I'd like to inquire about hosting a private event:\n\n*Event Details:*\nEvent Type: ${form.eventType}\nDate: ${form.date}\nExpected Guests: ${form.guests}\nSelected Package: ${packageName}\n\n*Customer Details:*\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "N/A"}\nSpecial Notes: ${form.notes || "None"}\n\nPlease contact me with more information. Thank you!`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="events" className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
        <div className="max-w-md mx-auto px-5 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(22,163,74,0.1)" }}>
            <CheckCircle2 size={40} color="#16a34a" strokeWidth={1.5} />
          </div>
          <h2 className="mb-3">Inquiry Received!</h2>
          <p className="mb-8" style={{ color: "var(--brown-mid)" }}>
            Thank you, <strong style={{ color: "var(--terra)" }}>{form.name}</strong>. Our events team will call you within 24 hours about your {form.eventType}.
          </p>
          <p className="text-sm" style={{ color: "var(--brown-muted)" }}>Urgent? Call <a href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`} style={{ color: "var(--terra)" }}>{restaurantInfo.phone}</a></p>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "var(--terra)" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--terra)" }}>Private Events</span>
            </div>
            <h2 className="mb-5">Host Your Celebration at {" "}Zaffran</h2>
            <p className="text-base" style={{ color: "var(--brown-soft)", lineHeight: 1.85, fontWeight: 300 }}>
              From intimate birthday dinners to grand wedding receptions — our events team handles every detail so you can be fully present.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ n: "500+", l: "Events Hosted" }, { n: "30–300", l: "Guest Capacity" }, { n: "24/7", l: "Event Support" }, { n: "100%", l: "Customisable" }].map((s) => (
              <div key={s.l} className="p-5 transition-shadow duration-200"
                style={{ background: "#fff", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}>
                <div className="text-2xl mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--terra)" }}>{s.n}</div>
                <div className="text-xs font-medium" style={{ color: "var(--brown-muted)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: step > i + 1 ? "var(--terra)" : step === i + 1 ? "var(--terra-dim)" : "var(--bg-2)",
                    color: step > i + 1 ? "#fff" : step === i + 1 ? "var(--terra)" : "var(--brown-muted)",
                    boxShadow: step === i + 1 ? "0 0 0 3px var(--terra-dim)" : "none",
                  }}>
                  {s.icon}
                </div>
                <span className="text-xs font-medium hidden sm:block" style={{ color: step >= i + 1 ? "var(--brown-mid)" : "var(--brown-muted)" }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-8 sm:w-16 h-px mx-2 transition-all duration-300"
                  style={{ background: step > i + 1 ? "var(--terra)" : "var(--border)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="max-w-2xl mx-auto">
          <div className="p-8 lg:p-10" style={{ background: "#fff", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }}>

            {step === 1 && (
              <div>
                <h3 className="mb-6 text-center">What are you celebrating?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                  {EVENT_TYPES.map((type) => (
                    <button key={type} type="button" onClick={() => setForm({ ...form, eventType: type })}
                      className="py-3 px-2 text-xs font-medium text-center transition-all duration-200"
                      style={{
                        background: form.eventType === type ? "var(--terra-dim)" : "var(--bg-2)",
                        border: `1.5px solid ${form.eventType === type ? "var(--terra)" : "transparent"}`,
                        color: form.eventType === type ? "var(--terra)" : "var(--brown-soft)",
                        borderRadius: "var(--radius-sm)",
                      }}>
                      {type}
                    </button>
                  ))}
                </div>
                <button disabled={!form.eventType} onClick={() => setStep(2)}
                  className="w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  style={{ background: form.eventType ? "var(--terra)" : "var(--bg-2)", color: form.eventType ? "#fff" : "var(--brown-muted)", borderRadius: "var(--radius-btn)", boxShadow: form.eventType ? "var(--shadow-terra)" : "none" }}>
                  Continue <ChevronRight size={15} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="mb-6 text-center">When & how many guests?</h3>
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Event Date *</label>
                    <input type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={{ ...inp, colorScheme: "light" } as React.CSSProperties} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Expected Guests *</label>
                    <input type="number" min={10} max={500} placeholder="e.g. 80" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} style={inp} />
                    <p className="text-xs mt-1.5" style={{ color: "var(--brown-muted)" }}>Minimum 10 guests · Venue capacity up to 300</p>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)} className="px-5 py-3.5 text-sm font-medium" style={{ background: "var(--bg-2)", color: "var(--brown-mid)", borderRadius: "var(--radius-btn)" }}>← Back</button>
                    <button disabled={!form.date || !form.guests} onClick={() => setStep(3)}
                      className="flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                      style={{ background: form.date && form.guests ? "var(--terra)" : "var(--bg-2)", color: form.date && form.guests ? "#fff" : "var(--brown-muted)", borderRadius: "var(--radius-btn)", boxShadow: form.date && form.guests ? "var(--shadow-terra)" : "none" }}>
                      Continue <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="mb-6 text-center">Choose your package</h3>
                <div className="flex flex-col gap-3 mb-6">
                  {PACKAGES.map((pkg) => (
                    <button key={pkg.id} type="button" onClick={() => setForm({ ...form, package: pkg.id })}
                      className="text-left p-5 transition-all duration-200 relative"
                      style={{
                        background: form.package === pkg.id ? "var(--bg-2)" : "#fff",
                        border: `2px solid ${form.package === pkg.id ? pkg.accent : "var(--border)"}`,
                        borderRadius: "var(--radius-md)",
                        boxShadow: form.package === pkg.id ? "var(--shadow-sm)" : "none",
                      }}>
                      {(pkg as { featured?: boolean }).featured && (
                        <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-pill)" }}>
                          Most Popular
                        </div>
                      )}
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-xl" style={{ fontFamily: "'DM Serif Display', serif", color: pkg.accent }}>{pkg.name}</span>
                        <span className="text-lg font-bold" style={{ color: "var(--terra)" }}>{pkg.price}</span>
                        <span className="text-xs" style={{ color: "var(--brown-muted)" }}>{pkg.per}</span>
                      </div>
                      <div className="text-xs mb-3" style={{ color: "var(--brown-muted)" }}>Minimum {pkg.min} guests</div>
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.features.map((f) => (
                          <span key={f} className="text-[10px] px-2 py-0.5" style={{ background: `${pkg.accent}12`, color: pkg.accent, borderRadius: "var(--radius-pill)", fontWeight: 500 }}>{f}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-5 py-3.5 text-sm font-medium" style={{ background: "var(--bg-2)", color: "var(--brown-mid)", borderRadius: "var(--radius-btn)" }}>← Back</button>
                  <button disabled={!form.package} onClick={() => setStep(4)}
                    className="flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                    style={{ background: form.package ? "var(--terra)" : "var(--bg-2)", color: form.package ? "#fff" : "var(--brown-muted)", borderRadius: "var(--radius-btn)", boxShadow: form.package ? "var(--shadow-terra)" : "none" }}>
                    Continue <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 className="mb-6 text-center">Your contact details</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp} placeholder="Priya Sharma" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Phone *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inp} placeholder="+91 9876 543210" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp} placeholder="priya@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Special Notes</label>
                    <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={{ ...inp, resize: "none" as const }} placeholder="Theme, cuisine preferences, accessibility needs..." />
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-3 p-4" style={{ background: "var(--bg-2)", borderRadius: "var(--radius-md)" }}>
                    {[{ l: "Event", v: form.eventType }, { l: "Date", v: form.date }, { l: "Guests", v: form.guests }, { l: "Package", v: PACKAGES.find((p) => p.id === form.package)?.name ?? "" }].map((r) => (
                      <div key={r.l}><div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--brown-muted)" }}>{r.l}</div><div className="text-sm font-medium" style={{ color: "var(--brown-deep)" }}>{r.v}</div></div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(3)} className="px-5 py-3.5 text-sm font-medium" style={{ background: "var(--bg-2)", color: "var(--brown-mid)", borderRadius: "var(--radius-btn)" }}>← Back</button>
                    <button disabled={!form.name || !form.phone} onClick={handleSubmit}
                      className="flex-1 py-3.5 text-sm font-semibold transition-all duration-200"
                      style={{ background: form.name && form.phone ? "var(--terra)" : "var(--bg-2)", color: form.name && form.phone ? "#fff" : "var(--brown-muted)", borderRadius: "var(--radius-btn)", boxShadow: form.name && form.phone ? "var(--shadow-terra)" : "none" }}>
                      Confirm via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
