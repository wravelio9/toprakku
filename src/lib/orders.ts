import type { CartItem } from "@/components/cart-provider";

export type Order = {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    note: string;
  };
  method: "delivery" | "pickup";
  payment: string;
  items: CartItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  completedAt?: string;
};

const STORAGE_KEY = "toprakku-last-order";

export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function getLastOrder(): Order | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

export function createOrderId() {
  const stamp = Date.now().toString().slice(-5);
  const random = Math.floor(Math.random() * 90 + 10);
  return `TRK-${stamp}${random}`;
}
