"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { MenuSection } from "./MenuSection";
import { ReservationSection } from "./ReservationSection";
import { OrderingSection } from "./OrderingSection";
import { BanquetSection } from "./BanquetSection";
import { ReviewsSection } from "./ReviewsSection";
import { GallerySection } from "./GallerySection";
import { InfoSection } from "./InfoSection";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { useRestaurant } from "../context/RestaurantContext";
import type { RestaurantInfo } from "../types";

interface CartItem { id: number; name: string; price: number; qty: number; }

function getIsOpen(hours: RestaurantInfo["hours"]) {
  if (!hours || hours.length === 0) return false;
  const now = new Date();
  const day = now.getDay();
  const time = now.getHours() * 60 + now.getMinutes();
  const h = hours[day === 0 ? 2 : day >= 5 ? 1 : 0] || hours[0];
  const parse = (t: string) => {
    if (!t) return 0;
    const [start] = t.split(" – ");
    if (!start) return 0;
    const [hh, mm] = start.split(":").map(Number);
    return (hh || 0) * 60 + (mm || 0);
  };
  const parseEnd = (t: string) => {
    if (!t) return 0;
    const [, end] = t.split(" – ");
    if (!end) return 0;
    const [hh, mm] = end.split(":").map(Number);
    return (hh || 0) * 60 + (mm || 0);
  };
  if (!h) return false;
  const lunchOpen = parse(h.lunch);
  const lunchClose = parseEnd(h.lunch);
  const dinnerOpen = parse(h.dinner);
  const kitchenClose = parseInt(h.kitchen?.split(":")[0] || "0") * 60 + parseInt(h.kitchen?.split(":")[1] || "0");
  return (time >= lunchOpen && time < lunchClose) || (time >= dinnerOpen && time < kitchenClose);
}

export function CustomerSite() {
  const router = useRouter();
  const {
    menuItems,
    restaurantInfo,
    heroContent,
    addOrder,
    addReservation,
    addInquiry,
  } = useRestaurant();

  const [cart, setCart] = useState<CartItem[]>([]);
  const isOpen = getIsOpen(restaurantInfo.hours);

  const handleAddToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  useEffect(() => {
    const el = document.body;
    el.style.paddingBottom = "64px";
    return () => { el.style.paddingBottom = ""; };
  }, []);

  return (
    <div style={{ background: "#FAF7F2", color: "#2C1810", fontFamily: "'Plus Jakarta Sans', sans-serif" }} className="min-h-screen">
      <Header cartCount={cartCount} restaurantInfo={restaurantInfo} />
      <Hero isOpen={isOpen} heroContent={heroContent} restaurantInfo={restaurantInfo} />

      {/* Ornament divider */}
      <div className="flex items-center justify-center py-10" style={{ background: "#FAF7F2" }}>
        <div className="h-px flex-1 max-w-32" style={{ background: "rgba(44,24,16,0.1)" }} />
        <div className="mx-6 flex items-center gap-2">
          {[0,1,2].map((i) => <div key={i} className={`rounded-full`} style={{ width: i === 1 ? "6px" : "4px", height: i === 1 ? "6px" : "4px", background: "#C4552A" }} />)}
        </div>
        <div className="h-px flex-1 max-w-32" style={{ background: "rgba(44,24,16,0.1)" }} />
      </div>

      <MenuSection
        menuItems={menuItems.filter((m) => !m.hidden)}
        onAddToCart={handleAddToCart}
      />
      <ReservationSection restaurantInfo={restaurantInfo} onSubmit={addReservation} />
      <OrderingSection externalCart={cart} onUpdateCart={setCart} menuItems={menuItems.filter((m) => !m.hidden)} onOrderPlaced={addOrder} restaurantInfo={restaurantInfo} />
      <BanquetSection onSubmit={addInquiry} restaurantInfo={restaurantInfo} />
      <ReviewsSection />
      <GallerySection />
      <InfoSection restaurantInfo={restaurantInfo} />
      <Footer restaurantInfo={restaurantInfo} onAdminClick={() => router.push("/admin")} />
      <StickyBar cartCount={cartCount} />
    </div>
  );
}
