"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Check, X } from "lucide-react";
import type { ArtVariant } from "@/lib/menu";
import { formatPrice } from "@/lib/format";

export type CartItem = {
  key: string;
  menuId: string;
  name: string;
  unitPrice: number;
  qty: number;
  sizeLabel?: string;
  spiceLabel?: string;
  toppings: string[];
  notes?: string;
  art: ArtVariant;
};

type NewCartItem = Omit<CartItem, "key">;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: NewCartItem) => void;
  updateQty: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "toprakku-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(CART_STORAGE_KEY);
        if (saved) setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        // Abaikan data keranjang yang rusak.
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!isCartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isCartOpen]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback((item: NewCartItem) => {
    const key =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setItems((current) => [...current, { ...item, key }]);
    setToast(`${item.name} masuk keranjang`);
  }, []);

  const updateQty = useCallback((key: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.key === key ? { ...item, qty: item.qty + delta } : item,
        )
        .filter((item) => item.qty > 0),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.unitPrice * item.qty, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      updateQty,
      removeItem,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      updateQty,
      removeItem,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div
          role="status"
          className="animate-pop-in fixed bottom-28 left-1/2 z-[70] flex w-[min(92vw,24rem)] -translate-x-1/2 items-center gap-3 rounded-2xl bg-night px-4 py-3 text-night-text shadow-soft md:bottom-8"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-leaf">
            <Check size={16} strokeWidth={3} />
          </span>
          <span className="flex-1 text-sm font-semibold">{toast}</span>
          <button
            type="button"
            onClick={openCart}
            className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-butter transition hover:bg-white/20"
          >
            Lihat ({formatPrice(subtotal)})
          </button>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Tutup notifikasi"
            className="text-night-text/60 transition hover:text-night-text"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart harus dipakai di dalam CartProvider");
  return context;
}
