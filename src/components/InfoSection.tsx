import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import type { RestaurantInfo } from "../types";

function getOpenStatus(hours: RestaurantInfo["hours"]) {
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();
  const h = hours[day === 0 ? 2 : day >= 5 ? 1 : 0];
  if (!h) return { open: false, next: "Hours unavailable" };
  const parse = (t: string) => { const [s] = t.split(" – "); const [hh, mm] = s.split(":").map(Number); return hh * 60 + mm; };
  const parseEnd = (t: string) => { const [, e] = t.split(" – "); const [hh, mm] = e.split(":").map(Number); return hh * 60 + mm; };
  const kClose = parseInt(h.kitchen.split(":")[0]) * 60 + parseInt(h.kitchen.split(":")[1]);
  const open = (time >= parse(h.lunch) && time < parseEnd(h.lunch)) || (time >= parse(h.dinner) && time < kClose);
  let next = "Opens tomorrow at 12:00 PM";
  if (time < parse(h.lunch)) next = `Opens at ${h.lunch.split(" – ")[0]} today`;
  else if (time >= parseEnd(h.lunch) && time < parse(h.dinner)) next = `Dinner opens at ${h.dinner.split(" – ")[0]}`;
  else if (open) next = `Kitchen closes at ${h.kitchen}`;
  return { open, next };
}

export function InfoSection({ restaurantInfo }: { restaurantInfo: RestaurantInfo }) {
  const status = getOpenStatus(restaurantInfo.hours);
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(restaurantInfo.address + ", " + restaurantInfo.city)}`;

  return (
    <section id="info" className="py-24 lg:py-32" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-8" style={{ background: "var(--terra)" }} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--terra)" }}>Find Us</span>
            <div className="h-px w-8" style={{ background: "var(--terra)" }} />
          </div>
          <h2>Visit {restaurantInfo.name}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contact Card */}
          <div className="p-8" style={{ background: "#fff", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}>
            <h3 className="text-lg mb-6" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--brown-deep)" }}>Contact</h3>
            <div className="flex flex-col gap-5">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200" style={{ background: "var(--terra-dim)", color: "var(--terra)" }}>
                  <MapPin size={17} />
                </div>
                <div>
                  <div className="text-sm font-semibold mb-0.5 group-hover:underline" style={{ color: "var(--brown-deep)" }}>{restaurantInfo.address}</div>
                  <div className="text-sm" style={{ color: "var(--brown-muted)" }}>{restaurantInfo.city}</div>
                  <div className="flex items-center gap-1 text-xs mt-1.5" style={{ color: "var(--terra)" }}><ExternalLink size={10} /> Open in Google Maps</div>
                </div>
              </a>

              <a href={`tel:${restaurantInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--terra-dim)", color: "var(--terra)" }}>
                  <Phone size={17} />
                </div>
                <div>
                  <div className="text-sm font-semibold group-hover:underline" style={{ color: "var(--brown-deep)" }}>{restaurantInfo.phone}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--brown-muted)" }}>Tap to call instantly</div>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--terra-dim)", color: "var(--terra)" }}>
                  <Clock size={17} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: status.open ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)",
                        color: status.open ? "#16a34a" : "#dc2626",
                      }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.open ? "#16a34a" : "#dc2626" }} />
                      {status.open ? "Open Now" : "Closed"}
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: "var(--brown-muted)" }}>{status.next}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="p-8" style={{ background: "#fff", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}>
            <h3 className="text-lg mb-6" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--brown-deep)" }}>Opening Hours</h3>
            <div className="flex flex-col gap-4">
              {restaurantInfo.hours.map((h, i) => (
                <div key={i} className="pb-4" style={{ borderBottom: i < restaurantInfo.hours.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div className="text-sm font-semibold mb-2.5" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "var(--brown-mid)" }}>{h.day}</div>
                  <div className="grid grid-cols-2 gap-y-1">
                    {[{ l: "Lunch", v: h.lunch }, { l: "Dinner", v: h.dinner }].map((r) => (
                      <div key={r.l} className="flex justify-between col-span-2 text-xs">
                        <span style={{ color: "var(--brown-muted)" }}>{r.l}</span>
                        <span style={{ color: "var(--brown-mid)", fontWeight: 500 }}>{r.v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between col-span-2 text-xs mt-1">
                      <span style={{ color: "var(--brown-muted)" }}>Kitchen closes</span>
                      <span style={{ color: "var(--terra)", fontWeight: 700 }}>{h.kitchen}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Card */}
          <div className="p-8 flex flex-col" style={{ background: "#fff", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}>
            <h3 className="text-lg mb-6" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--brown-deep)" }}>Get Directions</h3>
            <div className="flex-1 relative overflow-hidden mb-5" style={{ borderRadius: "var(--radius-md)", background: "var(--bg-2)", minHeight: "200px" }}>
              <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.3 }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <g key={i}>
                    <line x1={`${i*10+5}%`} y1="0" x2={`${i*10+5}%`} y2="100%" stroke="var(--terra)" strokeWidth="0.5" />
                    <line x1="0" y1={`${i*10+5}%`} x2="100%" y2={`${i*10+5}%`} stroke="var(--terra)" strokeWidth="0.5" />
                  </g>
                ))}
                <rect x="25%" y="38%" width="50%" height="5%" fill="rgba(191,79,40,0.4)" rx="3" />
                <rect x="15%" y="58%" width="70%" height="5%" fill="rgba(191,79,40,0.25)" rx="3" />
                <rect x="48%" y="15%" width="4%" height="70%" fill="rgba(191,79,40,0.3)" rx="2" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "var(--terra)", boxShadow: "var(--shadow-terra)" }}>
                    <MapPin size={20} color="#fff" fill="#fff" />
                  </div>
                  <div className="mt-2 px-3 py-1 text-xs font-semibold" style={{ background: "#fff", color: "var(--terra)", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-xs)" }}>
                    {restaurantInfo.name}
                  </div>
                </div>
              </div>
            </div>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold transition-all duration-200"
              style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-btn)", boxShadow: "var(--shadow-terra)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--terra-hover)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--terra)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
              <MapPin size={14} /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
