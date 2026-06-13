import { useState } from "react";
import { CalendarDays, Clock, Users, CheckCircle2, Phone, User } from "lucide-react";
import type { Reservation, RestaurantInfo } from "../types";

/** Parse "HH:MM" → minutes since midnight */
function parseMin(t: string) {
  const [h, m] = t.trim().split(":").map(Number);
  return h * 60 + m;
}

/** Minutes → "H:MM AM/PM" */
function fmtTime(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

/**
 * Generate available 30-minute slots for a given date,
 * based on the restaurant's hour schedule.
 * If today is selected, past slots are excluded.
 */
function generateSlots(date: string, hours: RestaurantInfo["hours"]) {
  if (!date) return { lunch: [] as string[], dinner: [] as string[] };

  const d = new Date(date + "T00:00:00");
  const dayOfWeek = d.getDay(); // 0=Sun … 6=Sat
  const h = hours[dayOfWeek === 0 ? 2 : dayOfWeek >= 5 ? 1 : 0];
  if (!h) return { lunch: [], dinner: [] };

  const [lunchStart, lunchEnd] = h.lunch.split(" – ").map(parseMin);
  const [dinnerStart] = h.dinner.split(" – ").map(parseMin);
  const kitchenClose = parseMin(h.kitchen);

  // Current time in minutes (for today-filtering)
  const nowMins = (() => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    if (date !== todayStr) return -1;
    return now.getHours() * 60 + now.getMinutes();
  })();

  const makeSlots = (start: number, end: number) => {
    const slots: string[] = [];
    for (let t = start; t < end; t += 30) {
      if (nowMins !== -1 && t <= nowMins + 30) continue; // skip slots too soon today
      slots.push(fmtTime(t));
    }
    return slots;
  };

  return {
    lunch: makeSlots(lunchStart, lunchEnd),
    dinner: makeSlots(dinnerStart, kitchenClose),
  };
}

const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: "#fff",
  border: "1.5px solid var(--border)",
  borderRadius: "var(--radius-input)",
  color: "var(--brown-deep)",
  width: "100%",
  padding: "12px 14px",
  fontSize: "0.875rem",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  transition: "border-color 0.2s",
  ...extra,
});

type FormState = { date: string; time: string; guests: number; name: string; phone: string; email: string; requests: string; };

export function ReservationSection({ restaurantInfo, onSubmit }: { restaurantInfo: RestaurantInfo; onSubmit: (res: Reservation) => void }) {
  const [form, setForm] = useState<FormState>({ date: "", time: "", guests: 2, name: "", phone: "", email: "", requests: "" });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const today = new Date().toISOString().split("T")[0];

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--terra)";
    e.currentTarget.style.boxShadow = "0 0 0 3px var(--terra-dim)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: "", ...form, occasion: "", status: "pending", createdAt: new Date().toISOString() } as Reservation);
    
    const cleanPhone = restaurantInfo.phone.replace(/\D/g, "");
    const message = `Hello ${restaurantInfo.name}, I'd like to book a table:\n\n*Reservation Details:*\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || "N/A"}\nDate: ${form.date}\nTime: ${form.time}\nGuests: ${form.guests}\nSpecial Requests: ${form.requests || "None"}\n\nPlease confirm my reservation. Thank you!`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="reserve" className="py-24 lg:py-32" style={{ background: "var(--bg-2)" }}>
        <div className="max-w-md mx-auto px-5 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(22,163,74,0.1)" }}>
            <CheckCircle2 size={40} color="#16a34a" strokeWidth={1.5} />
          </div>
          <h2 className="mb-3">Table Reserved!</h2>
          <p className="mb-6" style={{ color: "var(--brown-mid)" }}>Thank you, <strong style={{ color: "var(--terra)" }}>{form.name}</strong>. Your table is confirmed.</p>
          <div className="p-5 mb-8" style={{ background: "#fff", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)" }}>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[{ l: "Date", v: form.date }, { l: "Time", v: form.time }, { l: "Guests", v: String(form.guests) }].map((r) => (
                <div key={r.l}><div className="text-xs uppercase font-semibold tracking-wider mb-1" style={{ color: "var(--brown-muted)" }}>{r.l}</div><div className="text-sm font-bold" style={{ color: "var(--brown-deep)" }}>{r.v}</div></div>
              ))}
            </div>
          </div>
          <p className="text-sm mb-8" style={{ color: "var(--brown-muted)" }}>Confirmation sent to {form.phone}. For changes: <a href={`tel:${restaurantInfo.phone}`} style={{ color: "var(--terra)" }}>{restaurantInfo.phone}</a></p>
          <button onClick={() => { setSubmitted(false); setStep(1); setForm({ date: "", time: "", guests: 2, name: "", phone: "", email: "", requests: "" }); }}
            className="px-6 py-3 text-sm font-medium"
            style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-btn)", boxShadow: "var(--shadow-terra)" }}>
            New Reservation
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="reserve" className="py-24 lg:py-32" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "var(--terra)" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--terra)" }}>Reservations</span>
            </div>
            <h2 className="mb-5">Book Your Table</h2>
            <p className="text-base mb-10" style={{ color: "var(--brown-soft)", lineHeight: 1.8, fontWeight: 300 }}>
              Reserve directly — no queues, no commissions. Book 24/7 for lunch (12–3 PM) or dinner (7–10 PM).
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: <CalendarDays size={18} />, title: "Lunch", desc: "Monday – Sunday, 12:00 PM – 3:00 PM" },
                { icon: <Clock size={18} />, title: "Dinner", desc: "Monday – Sunday, 7:00 PM – 10:00 PM (Kitchen closes 9:30 PM)" },
                { icon: <Users size={18} />, title: "Large Groups", desc: "For parties above 8, please call us" },
                { icon: <Phone size={18} />, title: "Phone", desc: restaurantInfo.phone },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--terra-dim)", color: "var(--terra)" }}>
                    {item.icon}
                  </div>
                  <div className="pt-1">
                    <div className="text-sm font-semibold mb-0.5" style={{ color: "var(--brown-deep)" }}>{item.title}</div>
                    <div className="text-sm" style={{ color: "var(--brown-muted)" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8 lg:p-10" style={{ background: "#fff", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }}>
            {/* Steps */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                      style={{ background: step >= s ? "var(--terra)" : "var(--bg-2)", color: step >= s ? "#fff" : "var(--brown-muted)" }}>
                      {s}
                    </div>
                    <span className="text-xs font-medium" style={{ color: step >= s ? "var(--brown-deep)" : "var(--brown-muted)" }}>
                      {s === 1 ? "When & Who" : "Your Details"}
                    </span>
                  </div>
                  {s < 2 && <div className="h-px w-8" style={{ background: step > 1 ? "var(--terra)" : "var(--border)" }} />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Date *</label>
                    <input type="date" min={today} required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: "" })}
                      style={inp({ colorScheme: "light" })} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Time *</label>
                    {!form.date ? (
                      <div className="py-4 px-4 text-sm text-center" style={{ background: "var(--bg-2)", borderRadius: "var(--radius-sm)", color: "var(--brown-muted)" }}>
                        Pick a date first to see available slots
                      </div>
                    ) : (() => {
                      const { lunch, dinner } = generateSlots(form.date, restaurantInfo.hours);
                      const SlotBtn = ({ slot }: { slot: string }) => (
                        <button key={slot} type="button"
                          onClick={() => setForm({ ...form, time: slot })}
                          className="py-2 text-xs font-medium transition-all duration-200"
                          style={{
                            background: form.time === slot ? "var(--terra)" : "var(--bg-2)",
                            color: form.time === slot ? "#fff" : "var(--brown-soft)",
                            borderRadius: "var(--radius-sm)",
                            border: form.time === slot ? "1.5px solid var(--terra)" : "1.5px solid transparent",
                            fontFamily: "'Inter', sans-serif",
                          }}>
                          {slot}
                        </button>
                      );
                      return (
                        <div className="flex flex-col gap-4">
                          {lunch.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--terra)" }}>Lunch</span>
                                <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                              </div>
                              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {lunch.map((slot) => <SlotBtn key={slot} slot={slot} />)}
                              </div>
                            </div>
                          )}
                          {dinner.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--terra)" }}>Dinner</span>
                                <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                              </div>
                              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                                {dinner.map((slot) => <SlotBtn key={slot} slot={slot} />)}
                              </div>
                            </div>
                          )}
                          {lunch.length === 0 && dinner.length === 0 && (
                            <div className="py-4 px-4 text-sm text-center" style={{ background: "var(--bg-2)", borderRadius: "var(--radius-sm)", color: "var(--brown-muted)" }}>
                              No slots available for this date — try another day or call us directly.
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Number of Guests *</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                        className="w-11 h-11 flex items-center justify-center text-xl font-semibold transition-all duration-200 shrink-0"
                        style={{ background: "var(--bg-2)", borderRadius: "var(--radius-sm)", color: "var(--brown-mid)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-2)"; (e.currentTarget as HTMLElement).style.color = "var(--brown-mid)"; }}
                      >−</button>
                      <input
                        type="number"
                        min={1}
                        max={300}
                        required
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: Math.max(1, Math.min(300, Number(e.target.value) || 1)) })}
                        className="text-center text-lg font-bold"
                        style={{ ...inp(), width: "80px", padding: "10px 8px" }}
                        onFocus={onFocus}
                        onBlur={onBlur}
                      />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, guests: Math.min(300, form.guests + 1) })}
                        className="w-11 h-11 flex items-center justify-center text-xl font-semibold transition-all duration-200 shrink-0"
                        style={{ background: "var(--bg-2)", borderRadius: "var(--radius-sm)", color: "var(--brown-mid)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-2)"; (e.currentTarget as HTMLElement).style.color = "var(--brown-mid)"; }}
                      >+</button>
                      <span className="text-xs" style={{ color: "var(--brown-muted)" }}>Max 300</span>
                    </div>
                  </div>
                  <button type="button" disabled={!form.date || !form.time} onClick={() => setStep(2)}
                    className="w-full py-4 text-sm font-semibold transition-all duration-300"
                    style={{
                      background: form.date && form.time ? "var(--terra)" : "var(--bg-2)",
                      color: form.date && form.time ? "#fff" : "var(--brown-muted)",
                      borderRadius: "var(--radius-btn)",
                      boxShadow: form.date && form.time ? "var(--shadow-terra)" : "none",
                    }}>
                    Continue →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Full Name *</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--brown-muted)" }} />
                      <input type="text" required placeholder="Arjun Mehta" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp({ paddingLeft: "40px" })} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Phone *</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--brown-muted)" }} />
                      <input type="tel" required placeholder="+91 9876 543210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inp({ paddingLeft: "40px" })} onFocus={onFocus} onBlur={onBlur} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Email</label>
                    <input type="email" placeholder="arjun@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp()} onFocus={onFocus} onBlur={onBlur} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-2.5" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Special Requests</label>
                    <textarea rows={3} placeholder="Allergies, seating preference..." value={form.requests} onChange={(e) => setForm({ ...form, requests: e.target.value })} style={inp({ resize: "none" } as React.CSSProperties)} onFocus={onFocus} onBlur={onBlur} />
                  </div>

                  {/* Summary pill */}
                  <div className="flex items-center gap-3 px-4 py-3" style={{ background: "var(--bg-2)", borderRadius: "var(--radius-md)" }}>
                    <CalendarDays size={16} style={{ color: "var(--terra)", flexShrink: 0 }} />
                    <span className="text-sm font-medium" style={{ color: "var(--brown-mid)" }}>
                      {form.date} · {form.time} · {form.guests} guest{form.guests > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => setStep(1)}
                      className="px-5 py-3.5 text-sm font-medium"
                      style={{ background: "var(--bg-2)", color: "var(--brown-mid)", borderRadius: "var(--radius-btn)" }}>
                      ← Back
                    </button>
                    <button type="submit"
                      className="flex-1 py-3.5 text-sm font-semibold transition-all duration-300"
                      style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-btn)", boxShadow: "var(--shadow-terra)" }}>
                      Confirm via WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
