import { Star } from "lucide-react";

const REVIEWS = [
  { id: 1, name: "Arjun Mehta", rating: 5, time: "2 weeks ago", text: "Absolutely exceptional. The Chicken Dum Biryani was the finest I've had outside of Hyderabad. Service is impeccably attentive without being intrusive.", avatar: "AM", color: "#BF4F28" },
  { id: 2, name: "Priya Sharma", rating: 5, time: "1 month ago", text: "We hosted our daughter's wedding reception here. The events team was extraordinary — every detail handled with grace. Guests are still talking about the food.", avatar: "PS", color: "#8B6914" },
  { id: 3, name: "Vikram Rao", rating: 5, time: "3 weeks ago", text: "Dal Makhani Shorba and Kulfi Falooda — I dream about these dishes. The online ordering system worked flawlessly. This is how restaurant websites should work.", avatar: "VR", color: "#4A7A50" },
  { id: 4, name: "Sneha Patel", rating: 5, time: "2 months ago", text: "Booked directly through their website — so smooth. The private dining area is beautifully set and the staff understood the need for discretion.", avatar: "SP", color: "#3B6E8C" },
  { id: 5, name: "Rajan Nair", rating: 4, time: "5 weeks ago", text: "Paneer Tikka and Lamb Rogan Josh were outstanding. The dietary filter on their menu page is genius — my wife who's vegan found options instantly.", avatar: "RN", color: "#7B5EA7" },
  { id: 6, name: "Deepa Krishnan", rating: 5, time: "1 week ago", text: "The 'Open Now' badge on their website saved me a wasted trip. Arrived at 9 PM and still got a full meal. Brilliant attention to customer experience.", avatar: "DK", color: "#BF4F28" },
];

export function ReviewsSection() {
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "var(--terra)" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--terra)" }}>Social Proof</span>
            </div>
            <h2>Voices of Our Guests</h2>
          </div>

          {/* Summary card */}
          <div
            className="flex items-center gap-8 px-8 py-6"
            style={{ background: "#fff", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}
          >
            <div className="text-center">
              <div className="text-5xl mb-2" style={{ fontFamily: "'DM Serif Display', serif", color: "var(--terra)" }}>{avg}</div>
              <div className="flex gap-0.5 justify-center mb-1">
                {[1,2,3,4,5].map((i) => <Star key={i} size={13} fill="var(--terra)" color="var(--terra)" />)}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--brown-muted)" }}>1,240 reviews</div>
            </div>
            <div style={{ width: "1px", height: "64px", background: "var(--border)" }} />
            <div className="flex flex-col gap-1.5">
              <div className="text-xs font-medium mb-1" style={{ color: "var(--brown-muted)" }}>Rating breakdown</div>
              {[5, 4, 3].map((star) => {
                const pct = star === 5 ? 78 : star === 4 ? 16 : 4;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: star }).map((_, i) => <Star key={i} size={8} fill="var(--terra)" color="var(--terra)" />)}
                    </div>
                    <div className="w-28 h-1.5" style={{ background: "var(--bg-2)", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "var(--terra)", borderRadius: "999px" }} />
                    </div>
                    <span className="text-xs" style={{ color: "var(--brown-muted)" }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className="group flex flex-col p-7 transition-all duration-300"
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
                animationDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="var(--terra)" color="var(--terra)" />
                ))}
              </div>

              {/* Quote */}
              <p className="flex-1 text-sm leading-relaxed mb-6" style={{ color: "var(--brown-mid)", lineHeight: 1.85 }}>
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: review.color, boxShadow: `0 4px 12px ${review.color}40` }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold" style={{ color: "var(--brown-deep)" }}>{review.name}</div>
                  <div className="text-xs" style={{ color: "var(--brown-muted)" }}>Google · {review.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200"
            style={{ background: "#fff", color: "var(--brown-mid)", borderRadius: "var(--radius-pill)", boxShadow: "var(--shadow-sm)" }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-md)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
          >
            View all 1,240 reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
