export type HotelRecord = {
  slug: string;
  name: string;
  location: string;
  price: number;
  rooms: number;
  occupied: number;
  image: string;
  description: string;
  amenities: string[];
  highlights: string[];
  extras: string[];
  status: "Active" | "Maintenance";
};

const HOTEL_STORAGE_KEY = "travelnest:hotels";
const HOTEL_CHANGE_EVENT = "travelnest:hotels-changed";
let cachedRaw: string | null | undefined;
let cachedHotels: HotelRecord[] = [];

export const defaultHotels: HotelRecord[] = [
  {
    slug: "himalayan-paradise-resort",
    name: "Himalayan Paradise Resort",
    location: "Pokhara",
    price: 8500,
    rooms: 42,
    occupied: 35,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
    description: "Luxury resort with stunning mountain views and world-class amenities.",
    amenities: ["Free WiFi", "Pool", "Parking", "Restaurant", "Mountain View"],
    highlights: ["Free cancellation up to 24 hours before check-in", "No prepayment needed - pay at the property", "Instant booking confirmation"],
    extras: ["Flexible booking dates", "All group sizes welcome"],
    status: "Active",
  },
  {
    slug: "kathmandu-grand-hotel",
    name: "Kathmandu Grand Hotel",
    location: "Kathmandu",
    price: 6500,
    rooms: 68,
    occupied: 49,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80",
    description: "A comfortable city hotel close to Kathmandu's cultural landmarks.",
    amenities: ["Free WiFi", "Restaurant", "Airport Shuttle", "Room Service"],
    highlights: ["Free cancellation", "Pay at the property", "Instant confirmation"],
    extras: ["Family rooms available", "Front desk open 24 hours"],
    status: "Active",
  },
  {
    slug: "everest-view-lodge",
    name: "Everest View Lodge",
    location: "Namche Bazaar",
    price: 4500,
    rooms: 24,
    occupied: 21,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
    description: "A welcoming mountain lodge with unforgettable Himalayan views.",
    amenities: ["Free WiFi", "Restaurant", "Mountain View", "Heating"],
    highlights: ["Flexible cancellation", "Breakfast available", "Instant confirmation"],
    extras: ["Trekking assistance", "All group sizes welcome"],
    status: "Active",
  },
];

export function createHotelSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getStoredHotels() {
  if (typeof window === "undefined") return defaultHotels;
  const stored = window.localStorage.getItem(HOTEL_STORAGE_KEY);
  if (!stored) return defaultHotels;
  if (stored === cachedRaw) return cachedHotels;
  try {
    const parsed = JSON.parse(stored) as HotelRecord[];
    cachedRaw = stored;
    cachedHotels = Array.isArray(parsed) ? parsed : defaultHotels;
    return cachedHotels;
  } catch {
    return defaultHotels;
  }
}

export function saveStoredHotels(hotels: HotelRecord[]) {
  const serialized = JSON.stringify(hotels);
  cachedRaw = serialized;
  cachedHotels = hotels;
  window.localStorage.setItem(HOTEL_STORAGE_KEY, serialized);
  window.dispatchEvent(new Event(HOTEL_CHANGE_EVENT));
}

export function useHotels() {
  return useSyncExternalStore(
    (notify) => {
      window.addEventListener(HOTEL_CHANGE_EVENT, notify);
      window.addEventListener("storage", notify);
      return () => {
        window.removeEventListener(HOTEL_CHANGE_EVENT, notify);
        window.removeEventListener("storage", notify);
      };
    },
    getStoredHotels,
    () => defaultHotels,
  );
}
import { useSyncExternalStore } from "react";
