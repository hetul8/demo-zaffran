import { useState } from "react";
import { ShoppingBag, Plus, Minus, X, ChevronRight, CheckCircle2, Package } from "lucide-react";
import type { MenuItem, Order, RestaurantInfo } from "../types";

interface CartItem { id: number; name: string; price: number; qty: number; }

const inp: React.CSSProperties = {
  background: "#fff",
  border: "1.5px solid var(--border)",
  borderRadius: "var(--radius-input)",
  color: "var(--brown-deep)",
  width: "100%",
  padding: "12px 14px",
  fontSize: "0.875rem",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
};

export function OrderingSection({ externalCart, onUpdateCart, menuItems, onOrderPlaced, restaurantInfo }: {
  externalCart: CartItem[];
  onUpdateCart: (c: CartItem[]) => void;
  menuItems: MenuItem[];
  onOrderPlaced: (o: Order) => void;
  restaurantInfo: RestaurantInfo;
}) {
  const [orderStep, setOrderStep] = useState<"menu" | "checkout" | "done">("menu");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const cart = externalCart;
  const setCart = onUpdateCart;
  const addItem = (item: MenuItem) => {
    const ex = cart.find((c) => c.id === item.id);
    if (ex) setCart(cart.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    else setCart([...cart, { id: item.id, name: item.name, price: item.price, qty: 1 }]);
  };
  const removeItem = (id: number) => {
    const ex = cart.find((c) => c.id === id);
    if (!ex) return;
    if (ex.qty === 1) setCart(cart.filter((c) => c.id !== id));
    else setCart(cart.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c));
  };
  const clearItem = (id: number) => setCart(cart.filter((c) => c.id !== id));
  const cartQty = (id: number) => cart.find((c) => c.id === id)?.qty ?? 0;
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const categories = [...new Set(menuItems.map((m) => m.category))];

  const handlePlaceOrder = () => {
    onOrderPlaced({ id: "", name, phone, address: undefined, type: "pickup", items: cart, subtotal, total, status: "new", createdAt: new Date().toISOString() });
    
    // Construct and redirect to WhatsApp
    const cleanPhone = restaurantInfo.phone.replace(/\D/g, "");
    const itemsText = cart.map(c => `• ${c.name} x ${c.qty} (₹${c.price * c.qty})`).join("\n");
    const message = `Hello ${restaurantInfo.name}, I'd like to place an order for Takeaway / Pickup:\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\n\n*Order Details:*\n${itemsText}\n\n*Subtotal:* ₹${subtotal}\n*GST (5%):* ₹${gst}\n*Total Amount:* ₹${total}\n\nPlease confirm my order on WhatsApp. Thank you!`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    setOrderStep("done");
  };

  if (orderStep === "done") {
    return (
      <section id="order" className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
        <div className="max-w-md mx-auto px-5 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(22,163,74,0.1)" }}>
            <CheckCircle2 size={40} color="#16a34a" strokeWidth={1.5} />
          </div>
          <h2 className="mb-3">Order Placed via WhatsApp!</h2>
          <p className="mb-3" style={{ color: "var(--brown-mid)" }}>Thank you, <strong style={{ color: "var(--terra)" }}>{name}</strong>!</p>
          <p className="text-sm mb-3" style={{ color: "var(--brown-muted)" }}>We have opened WhatsApp to confirm your takeaway order. Ready for pickup in 20–25 minutes.</p>
          <div className="inline-block px-5 py-2 mb-3" style={{ background: "var(--terra-dim)", borderRadius: "var(--radius-pill)" }}>
            <span className="text-sm font-bold" style={{ color: "var(--terra)" }}>₹{total}</span>
          </div>
          <p className="text-xs mb-10" style={{ color: "var(--brown-muted)" }}>You saved ~₹{Math.round(total * 0.22)} vs. Zomato/Swiggy</p>
          <button onClick={() => { setOrderStep("menu"); setCart([]); setName(""); setPhone(""); }}
            className="px-6 py-3 text-sm font-semibold"
            style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-btn)", boxShadow: "var(--shadow-terra)" }}>
            New Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "var(--terra)" }} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--terra)" }}>Direct Ordering</span>
            </div>
            <h2>Order Takeaway</h2>
            <p className="mt-2 text-sm" style={{ color: "var(--brown-muted)" }}>Zero commissions — 100% goes to the kitchen. Confirm your order instantly on WhatsApp.</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2.5 px-4 py-3 bg-white border border-[var(--terra)] text-[var(--terra)] rounded-[var(--radius-md)] shadow-sm">
              <Package size={16} />
              <div className="text-left">
                <div className="text-xs font-semibold">Takeaway / Pickup</div>
                <div className="text-[10px]" style={{ color: "var(--brown-muted)" }}>20–25 mins</div>
              </div>
            </div>
          </div>
        </div>

        {orderStep === "menu" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              {categories.map((cat) => {
                const items = menuItems.filter((m) => m.category === cat);
                return (
                  <div key={cat}>
                    <div className="text-xs font-bold uppercase tracking-[0.15em] mt-6 mb-3" style={{ color: "var(--terra)" }}>{cat}</div>
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 mb-1.5 transition-shadow duration-200"
                        style={{ background: "#fff", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-xs)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-sm)")}
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-xs)")}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: item.tags.includes("nonveg") ? "#dc2626" : "#16a34a" }} />
                          <div>
                            <div className="text-sm font-semibold" style={{ color: "var(--brown-deep)" }}>{item.name}</div>
                            <div className="text-xs font-bold mt-0.5" style={{ color: "var(--terra)" }}>₹{item.price}</div>
                          </div>
                        </div>
                        {cartQty(item.id) === 0 ? (
                          <button onClick={() => addItem(item)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                            style={{ background: "var(--terra-dim)", color: "var(--terra)", borderRadius: "var(--radius-sm)", border: "1px solid var(--terra-border)" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra-dim)"; (e.currentTarget as HTMLElement).style.color = "var(--terra)"; }}>
                            <Plus size={11} /> Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button onClick={() => removeItem(item.id)} className="w-7 h-7 flex items-center justify-center transition-colors" style={{ background: "var(--bg-2)", borderRadius: "6px", color: "var(--brown-mid)" }}><Minus size={11} /></button>
                            <span className="text-sm font-bold w-5 text-center" style={{ color: "var(--brown-deep)" }}>{cartQty(item.id)}</span>
                            <button onClick={() => addItem(item)} className="w-7 h-7 flex items-center justify-center" style={{ background: "var(--terra)", borderRadius: "6px", color: "#fff" }}><Plus size={11} /></button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* Cart */}
            <div>
              <div className="sticky top-24 p-6" style={{ background: "#fff", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-md)" }}>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--terra-dim)" }}>
                    <ShoppingBag size={14} style={{ color: "var(--terra)" }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color: "var(--brown-deep)" }}>Your Order</span>
                </div>
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBag size={32} className="mx-auto mb-3" style={{ color: "var(--border)" }} />
                    <p className="text-sm" style={{ color: "var(--brown-muted)" }}>Add items to start your order</p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3 mb-5">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium truncate" style={{ color: "var(--brown-mid)" }}>{item.name}</div>
                            <div className="text-xs" style={{ color: "var(--brown-muted)" }}>{item.qty} × ₹{item.price}</div>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <span className="text-xs font-bold" style={{ color: "var(--terra)" }}>₹{item.price * item.qty}</span>
                            <button onClick={() => clearItem(item.id)} style={{ color: "var(--brown-muted)" }}><X size={12} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                      {[{ l: "Subtotal", v: `₹${subtotal}` }, { l: "GST (5%)", v: `₹${gst}` }].map((r) => (
                        <div key={r.l} className="flex justify-between text-xs mb-2">
                          <span style={{ color: "var(--brown-muted)" }}>{r.l}</span>
                          <span style={{ color: "var(--brown-mid)" }}>{r.v}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-bold mb-5 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                        <span style={{ color: "var(--brown-deep)" }}>Total</span>
                        <span style={{ color: "var(--terra)" }}>₹{total}</span>
                      </div>
                      <button onClick={() => setOrderStep("checkout")}
                        className="w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                        style={{ background: "var(--terra)", color: "#fff", borderRadius: "var(--radius-btn)", boxShadow: "var(--shadow-terra)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra-hover)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--terra)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                        Checkout <ChevronRight size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {orderStep === "checkout" && (
          <div className="max-w-md mx-auto">
            <div className="p-8" style={{ background: "#fff", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }}>
              <h3 className="mb-6">Confirm Pickup Details</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Name *</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={inp} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--brown-muted)", letterSpacing: "0.1em" }}>Phone *</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={inp} placeholder="+91 9876 543210" />
                </div>
                <div className="p-4" style={{ background: "var(--bg-2)", borderRadius: "var(--radius-md)" }}>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm mb-1">
                      <span style={{ color: "var(--brown-muted)" }}>{item.name} ×{item.qty}</span>
                      <span style={{ color: "var(--brown-mid)" }}>₹{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold pt-3 mt-2 border-t" style={{ borderColor: "var(--border)" }}>
                    <span style={{ color: "var(--brown-deep)" }}>Total</span>
                    <span style={{ color: "var(--terra)" }}>₹{total}</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={() => setOrderStep("menu")} className="px-5 py-3.5 text-sm font-medium" style={{ background: "var(--bg-2)", color: "var(--brown-mid)", borderRadius: "var(--radius-btn)" }}>← Back</button>
                  <button disabled={!name || !phone} onClick={handlePlaceOrder}
                    className="flex-1 py-3.5 text-sm font-semibold transition-all duration-200"
                    style={{ background: name && phone ? "var(--terra)" : "var(--bg-2)", color: name && phone ? "#fff" : "var(--brown-muted)", borderRadius: "var(--radius-btn)", boxShadow: name && phone ? "var(--shadow-terra)" : "none" }}>
                    Confirm via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
