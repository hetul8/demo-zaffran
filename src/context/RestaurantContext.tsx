"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Order, Reservation, BanquetInquiry, MenuItem, RestaurantInfo, HeroContent } from "../types";
import {
  DEFAULT_MENU_ITEMS,
  DEFAULT_RESTAURANT_INFO,
  DEFAULT_HERO,
  SAMPLE_ORDERS,
  SAMPLE_RESERVATIONS,
  SAMPLE_INQUIRIES,
} from "../types";

interface RestaurantContextType {
  menuItems: MenuItem[];
  restaurantInfo: RestaurantInfo;
  heroContent: HeroContent;
  orders: Order[];
  reservations: Reservation[];
  inquiries: BanquetInquiry[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  setRestaurantInfo: React.Dispatch<React.SetStateAction<RestaurantInfo>>;
  setHeroContent: React.Dispatch<React.SetStateAction<HeroContent>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  setInquiries: React.Dispatch<React.SetStateAction<BanquetInquiry[]>>;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  addReservation: (res: Omit<Reservation, "id" | "createdAt" | "status">) => void;
  addInquiry: (inq: Omit<BanquetInquiry, "id" | "createdAt" | "status">) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

function generateId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(DEFAULT_MENU_ITEMS);
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(DEFAULT_RESTAURANT_INFO);
  const [heroContent, setHeroContent] = useState<HeroContent>(DEFAULT_HERO);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [reservations, setReservations] = useState<Reservation[]>(SAMPLE_RESERVATIONS);
  const [inquiries, setInquiries] = useState<BanquetInquiry[]>(SAMPLE_INQUIRIES);
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMenu = localStorage.getItem("zaffran_menuItems");
      const storedInfo = localStorage.getItem("zaffran_restaurantInfo");
      const storedHero = localStorage.getItem("zaffran_heroContent");
      const storedOrders = localStorage.getItem("zaffran_orders");
      const storedReservations = localStorage.getItem("zaffran_reservations");
      const storedInquiries = localStorage.getItem("zaffran_inquiries");

      if (storedMenu) setMenuItems(JSON.parse(storedMenu));
      if (storedInfo) setRestaurantInfo(JSON.parse(storedInfo));
      if (storedHero) setHeroContent(JSON.parse(storedHero));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedReservations) setReservations(JSON.parse(storedReservations));
      if (storedInquiries) setInquiries(JSON.parse(storedInquiries));

      setInitialized(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (initialized && typeof window !== "undefined") {
      localStorage.setItem("zaffran_menuItems", JSON.stringify(menuItems));
      localStorage.setItem("zaffran_restaurantInfo", JSON.stringify(restaurantInfo));
      localStorage.setItem("zaffran_heroContent", JSON.stringify(heroContent));
      localStorage.setItem("zaffran_orders", JSON.stringify(orders));
      localStorage.setItem("zaffran_reservations", JSON.stringify(reservations));
      localStorage.setItem("zaffran_inquiries", JSON.stringify(inquiries));
    }
  }, [menuItems, restaurantInfo, heroContent, orders, reservations, inquiries, initialized]);

  const addOrder = (orderData: Omit<Order, "id" | "createdAt" | "status">) => {
    const newOrder: Order = {
      ...orderData,
      id: generateId("ORD"),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const addReservation = (resData: Omit<Reservation, "id" | "createdAt" | "status">) => {
    const newRes: Reservation = {
      ...resData,
      id: generateId("RES"),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [newRes, ...prev]);
  };

  const addInquiry = (inqData: Omit<BanquetInquiry, "id" | "createdAt" | "status">) => {
    const newInq: BanquetInquiry = {
      ...inqData,
      id: generateId("EVT"),
      status: "new",
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  return (
    <RestaurantContext.Provider
      value={{
        menuItems,
        restaurantInfo,
        heroContent,
        orders,
        reservations,
        inquiries,
        setMenuItems,
        setRestaurantInfo,
        setHeroContent,
        setOrders,
        setReservations,
        setInquiries,
        addOrder,
        addReservation,
        addInquiry,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
}
