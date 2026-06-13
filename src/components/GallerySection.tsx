import { Instagram, Heart, MessageCircle } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const POSTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1565556250026-9ba22083e3e0?w=500&h=650&fit=crop&auto=format&q=85", likes: 248, comments: 31, caption: "The Chicken Dum Biryani ritual" },
  { id: 2, img: "https://images.unsplash.com/photo-1524239077444-27413e763bba?w=500&h=380&fit=crop&auto=format&q=85", likes: 187, comments: 22, caption: "Starters tonight ✨" },
  { id: 3, img: "https://images.unsplash.com/photo-1670058124043-4f55e08d0f8f?w=500&h=440&fit=crop&auto=format&q=85", likes: 341, comments: 47, caption: "Weekend feast 🍛" },
  { id: 4, img: "https://images.unsplash.com/photo-1679312061521-d7d619a8cfb7?w=500&h=560&fit=crop&auto=format&q=85", likes: 420, comments: 58, caption: "Our dining room is yours" },
  { id: 5, img: "https://images.unsplash.com/photo-1764358868789-400fb3d39fb7?w=500&h=400&fit=crop&auto=format&q=85", likes: 193, comments: 19, caption: "Simple gestures, lasting impressions" },
  { id: 6, img: "https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?w=500&h=480&fit=crop&auto=format&q=85", likes: 312, comments: 44, caption: "Private banquet setup" },
  { id: 7, img: "https://images.unsplash.com/photo-1595608010652-d8bf1103a1c5?w=500&h=360&fit=crop&auto=format&q=85", likes: 276, comments: 35, caption: "Gulab Jamun — as good as it looks" },
  { id: 8, img: "https://images.unsplash.com/photo-1710091691777-3115088962c4?w=500&h=500&fit=crop&auto=format&q=85", likes: 398, comments: 52, caption: "Tonight's special: chef's tasting" },
];

export function GallerySection() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "var(--terra)" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--terra)" }}>
                Instagram
              </span>
            </div>
            <h2>Daily Moments</h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 self-start sm:self-auto"
            style={{
              background: "#fff",
              color: "var(--brown-mid)",
              borderRadius: "var(--radius-pill)",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-md)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-sm)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            <Instagram size={15} style={{ color: "var(--terra)" }} />
            @zaffran.anand
          </a>
        </div>

        {/* Masonry Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 900: 3, 1200: 4 }}>
          <Masonry gutter="14px">
            {POSTS.map((post) => (
              <div
                key={post.id}
                className="group relative overflow-hidden"
                style={{ borderRadius: "16px", background: "var(--bg-3)" }}
              >
                <img
                  src={post.img}
                  alt={post.caption}
                  className="w-full block object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ display: "block" }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(26,12,6,0.75) 0%, transparent 60%)" }}
                >
                  <p className="text-white text-xs font-medium mb-2 leading-relaxed">{post.caption}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <Heart size={12} fill="white" color="white" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/80">
                      <MessageCircle size={12} color="white" /> {post.comments}
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                  <Instagram size={14} color="white" />
                </div>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  );
}
