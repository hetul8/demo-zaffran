export type Tag = "veg" | "nonveg" | "vegan" | "gf" | "chefs";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: Tag[];
  category: string;
  spice?: number;
  hidden?: boolean;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  address?: string;
  type: "pickup" | "delivery";
  items: { id: number; name: string; price: number; qty: number }[];
  subtotal: number;
  total: number;
  status: "new" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  createdAt: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  requests?: string;
  status: "pending" | "confirmed" | "seated" | "completed" | "cancelled" | "no-show";
  createdAt: string;
}

export interface BanquetInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  date: string;
  guests: string;
  package: string;
  notes?: string;
  status: "new" | "contacted" | "quoted" | "booked" | "cancelled";
  createdAt: string;
}

export interface HourEntry {
  day: string;
  lunch: string;
  dinner: string;
  kitchen: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  hours: HourEntry[];
}

export interface HeroContent {
  line1: string;
  line2: string;
  line3: string;
  subtitle: string;
}

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Paneer Tikka", description: "Cottage cheese marinated in saffron yogurt, char-grilled in tandoor with mint chutney", price: 380, tags: ["veg", "gf"], category: "Starters", spice: 2 },
  { id: 2, name: "Chicken Malai Tikka", description: "Succulent chicken in cream and cashew marinade, slow-roasted to perfection", price: 480, tags: ["nonveg", "gf", "chefs"], category: "Starters", spice: 1 },
  { id: 3, name: "Achari Jhinga", description: "Tiger prawns tossed in house pickle masala, finished with lime butter", price: 680, tags: ["nonveg", "gf"], category: "Starters", spice: 3 },
  { id: 4, name: "Hara Bhara Kebab", description: "Spinach and peas patties blended with paneer, served with tamarind reduction", price: 320, tags: ["veg", "vegan"], category: "Starters", spice: 1 },
  { id: 5, name: "Dal Makhani Shorba", description: "Slow-cooked black lentil soup, finished with cream and truffle oil", price: 280, tags: ["veg", "gf", "chefs"], category: "Starters" },
  { id: 6, name: "Butter Chicken", description: "Free-range chicken in velvety tomato-fenugreek gravy, an eternal classic", price: 520, tags: ["nonveg", "gf", "chefs"], category: "Mains", spice: 1 },
  { id: 7, name: "Paneer Lababdar", description: "Fresh cottage cheese simmered in rich onion-tomato masala with kasoori methi", price: 440, tags: ["veg", "gf"], category: "Mains", spice: 2 },
  { id: 8, name: "Lamb Rogan Josh", description: "Slow-braised Kashmiri lamb in aromatic whole spice gravy", price: 680, tags: ["nonveg", "gf"], category: "Mains", spice: 3 },
  { id: 9, name: "Dal Tadka", description: "Yellow lentils tempered with cumin, garlic and smoked ghee — the soul of Indian cooking", price: 320, tags: ["veg", "gf", "vegan"], category: "Mains", spice: 2 },
  { id: 10, name: "Veg Biryani", description: "Saffron-scented basmati with seasonal vegetables, dum-cooked and served with raita", price: 420, tags: ["veg", "gf"], category: "Mains", spice: 2 },
  { id: 11, name: "Chicken Dum Biryani", description: "Hyderabadi-style biryani with marinated chicken, caramelised onions, and rose water", price: 540, tags: ["nonveg", "gf", "chefs"], category: "Mains", spice: 2 },
  { id: 12, name: "Amritsari Chole", description: "Slow-cooked chickpeas in bold Punjab-spiced gravy", price: 360, tags: ["veg", "vegan"], category: "Mains", spice: 3 },
  { id: 13, name: "Gulab Jamun", description: "House-made milk dumplings soaked in cardamom syrup, served warm with saffron ice cream", price: 240, tags: ["veg"], category: "Desserts" },
  { id: 14, name: "Kulfi Falooda", description: "Traditional frozen kulfi with rose vermicelli, basil seeds and chilled rose milk", price: 280, tags: ["veg", "gf", "chefs"], category: "Desserts" },
  { id: 15, name: "Shahi Tukda", description: "Fried bread soaked in cardamom milk, topped with pistachio rabri", price: 260, tags: ["veg"], category: "Desserts" },
  { id: 16, name: "Mango Lassi", description: "Alphonso mango blended with thick yogurt and a pinch of cardamom", price: 180, tags: ["veg", "gf"], category: "Drinks" },
  { id: 17, name: "Masala Chai", description: "Our signature blend with ginger, cardamom, clove and fresh milk", price: 120, tags: ["veg", "gf"], category: "Drinks" },
  { id: 18, name: "Fresh Lime Soda", description: "Freshly squeezed lime with house-made jeera soda — sweet, salt or both", price: 140, tags: ["veg", "gf", "vegan"], category: "Drinks" },
];

export const DEFAULT_RESTAURANT_INFO: RestaurantInfo = {
  name: "Zaffran",
  tagline: "Fine Indian Dining · Anand, Gujarat",
  address: "12, Sardar Patel Road, Anand",
  city: "Gujarat 388001",
  phone: "+91 2692 123456",
  email: "hello@zaffran.in",
  hours: [
    { day: "Monday – Thursday", lunch: "12:00 – 15:00", dinner: "19:00 – 22:00", kitchen: "21:30" },
    { day: "Friday – Saturday", lunch: "12:00 – 15:30", dinner: "19:00 – 22:30", kitchen: "22:00" },
    { day: "Sunday", lunch: "12:00 – 16:00", dinner: "19:00 – 21:30", kitchen: "21:00" },
  ],
};

export const DEFAULT_HERO: HeroContent = {
  line1: "Where Every",
  line2: "Meal Becomes",
  line3: "a Memory",
  subtitle: "Authentic Indian flavours elevated through modern culinary artistry. Reserve your table, order online, or host your next celebration with us.",
};

export const SAMPLE_ORDERS: Order[] = [
  { id: "ORD-001", name: "Arjun Mehta", phone: "+91 9876543210", type: "delivery", address: "14B Shastri Nagar, Anand", items: [{ id: 6, name: "Butter Chicken", price: 520, qty: 1 }, { id: 11, name: "Chicken Dum Biryani", price: 540, qty: 1 }, { id: 17, name: "Masala Chai", price: 120, qty: 2 }], subtotal: 1300, total: 1365, status: "preparing", createdAt: new Date(Date.now() - 18 * 60000).toISOString() },
  { id: "ORD-002", name: "Priya Shah", phone: "+91 9988776655", type: "pickup", items: [{ id: 1, name: "Paneer Tikka", price: 380, qty: 2 }, { id: 7, name: "Paneer Lababdar", price: 440, qty: 1 }], subtotal: 1200, total: 1260, status: "ready", createdAt: new Date(Date.now() - 35 * 60000).toISOString() },
  { id: "ORD-003", name: "Rajan Nair", phone: "+91 9123456789", type: "delivery", address: "22 Anand Vidyanagar Road", items: [{ id: 8, name: "Lamb Rogan Josh", price: 680, qty: 1 }, { id: 9, name: "Dal Tadka", price: 320, qty: 1 }, { id: 16, name: "Mango Lassi", price: 180, qty: 2 }], subtotal: 1360, total: 1488, status: "new", createdAt: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: "ORD-004", name: "Deepa Krishnan", phone: "+91 9456123789", type: "pickup", items: [{ id: 14, name: "Kulfi Falooda", price: 280, qty: 2 }, { id: 13, name: "Gulab Jamun", price: 240, qty: 1 }], subtotal: 800, total: 840, status: "delivered", createdAt: new Date(Date.now() - 90 * 60000).toISOString() },
  { id: "ORD-005", name: "Vikram Rao", phone: "+91 9654321087", type: "delivery", address: "5 Station Road, Anand", items: [{ id: 2, name: "Chicken Malai Tikka", price: 480, qty: 1 }, { id: 11, name: "Chicken Dum Biryani", price: 540, qty: 2 }], subtotal: 1560, total: 1698, status: "confirmed", createdAt: new Date(Date.now() - 52 * 60000).toISOString() },
  { id: "ORD-006", name: "Sneha Patel", phone: "+91 9321654987", type: "pickup", items: [{ id: 12, name: "Amritsari Chole", price: 360, qty: 1 }, { id: 4, name: "Hara Bhara Kebab", price: 320, qty: 1 }], subtotal: 680, total: 714, status: "cancelled", createdAt: new Date(Date.now() - 3 * 3600000).toISOString() },
];

export const SAMPLE_RESERVATIONS: Reservation[] = [
  { id: "RES-001", name: "Anita Gupta", phone: "+91 9876543211", email: "anita@email.com", date: "2026-06-13", time: "8:00 PM", guests: 4, occasion: "anniversary", requests: "Window table preferred, rose petals arrangement", status: "confirmed", createdAt: new Date(Date.now() - 2 * 3600000).toISOString() },
  { id: "RES-002", name: "Mohan Desai", phone: "+91 9988776622", date: "2026-06-13", time: "7:30 PM", guests: 2, status: "pending", createdAt: new Date(Date.now() - 30 * 60000).toISOString() },
  { id: "RES-003", name: "Kiran Mehta", phone: "+91 9123456780", email: "kiran.m@work.in", date: "2026-06-13", time: "1:00 PM", guests: 8, occasion: "business", requests: "Private section if available, projector screen for presentation", status: "confirmed", createdAt: new Date(Date.now() - 6 * 3600000).toISOString() },
  { id: "RES-004", name: "Sunita Rao", phone: "+91 9456789123", date: "2026-06-14", time: "7:00 PM", guests: 6, occasion: "birthday", requests: "Birthday cake arrangement for surprise", status: "pending", createdAt: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: "RES-005", name: "Arvind Shah", phone: "+91 9876512345", date: "2026-06-12", time: "12:30 PM", guests: 3, status: "seated", createdAt: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: "RES-006", name: "Pooja Nair", phone: "+91 9654987321", date: "2026-06-11", time: "8:30 PM", guests: 2, occasion: "anniversary", status: "completed", createdAt: new Date(Date.now() - 28 * 3600000).toISOString() },
  { id: "RES-007", name: "Rahul Kumar", phone: "+91 9321789654", date: "2026-06-12", time: "9:00 PM", guests: 5, status: "no-show", createdAt: new Date(Date.now() - 8 * 3600000).toISOString() },
];

export const SAMPLE_INQUIRIES: BanquetInquiry[] = [
  { id: "EVT-001", name: "Ramesh Patel", phone: "+91 9876500001", email: "ramesh@company.in", eventType: "Wedding Reception", date: "2026-08-15", guests: "180", package: "gold", notes: "Gujarati and North Indian fusion menu. Require a separate kids' station.", status: "contacted", createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
  { id: "EVT-002", name: "Nisha Verma", phone: "+91 9988200022", eventType: "Birthday Party", date: "2026-07-04", guests: "60", package: "silver", notes: "Theme: Bollywood retro. Require DJ setup space.", status: "new", createdAt: new Date(Date.now() - 4 * 3600000).toISOString() },
  { id: "EVT-003", name: "Suresh Industries", phone: "+91 9000300003", email: "events@suresh.com", eventType: "Corporate Dinner", date: "2026-06-28", guests: "45", package: "gold", notes: "Annual board dinner. Formal setup, no music, projector needed.", status: "quoted", createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: "EVT-004", name: "Deepak & Kavya", phone: "+91 9111400004", eventType: "Engagement Ceremony", date: "2026-09-20", guests: "120", package: "platinum", notes: "Flower wall backdrop required, live ghazal singer preferred.", status: "booked", createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
];
