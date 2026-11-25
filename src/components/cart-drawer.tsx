"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { FoodArt } from "@/components/food-art";
import { deliveryFee, freeDeliveryThreshold } from "@/lib/menu";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const pathname = usePathname();
  const { items, itemCount, subtotal, isCartOpen, closeCart, updateQty, removeItem } =
    useCart();

  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  const remaining = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-night/60 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal={isCartOpen}
        aria-label="Keranjang belanja"
        inert={!isCartOpen}
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-full max-w-md flex-col bg-cream shadow-soft transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-chili">
              Keranjangmu
            </p>
            <h2 className="font-display text-2xl font-semibold">
              {itemCount} porsi siap diracik
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Tutup keranjang"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-surface transition hover:border-chili/40 hover:text-chili"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cream-dark">
              <ShoppingBag size={34} className="text-sauce" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold">
              Keranjang masih kosong
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Yuk pilih ketoprak favoritmu dulu. Saus kacangnya sudah menunggu.
            </p>
            <Link
              href="/menu"
              onClick={closeCart}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-chili px-6 py-3 text-sm font-bold text-white transition hover:bg-chili-dark"
            >
              Lihat menu <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="hide-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3 rounded-2xl border border-ink/8 bg-surface p-3"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                    <FoodArt variant={item.art} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold leading-5">{item.name}</h3>
                        <p className="mt-0.5 text-xs text-ink-soft">
                          {[item.sizeLabel, item.spiceLabel].filter(Boolean).join(" • ") ||
                            "Standar"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Hapus ${item.name}`}
                        className="text-ink-soft/60 transition hover:text-chili"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {item.toppings.length > 0 && (
                      <p className="mt-1 truncate text-[11px] text-sauce">
                        + {item.toppings.join(", ")}
                      </p>
                    )}
                    {item.notes && (
                      <p className="mt-1 truncate text-[11px] italic text-ink-soft">
                        “{item.notes}”
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, -1)}
                          aria-label={`Kurangi ${item.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-surface"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="min-w-4 text-center text-xs font-bold">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, 1)}
                          aria-label={`Tambah ${item.name}`}
                          className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-surface"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-chili">
                        {formatPrice(item.unitPrice * item.qty)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-ink/10 bg-surface px-5 py-5">
              {remaining > 0 ? (
                <p className="mb-3 rounded-xl bg-butter/20 px-3 py-2 text-xs text-ink-soft">
                  Tambah {formatPrice(remaining)} lagi untuk gratis ongkir! 🎉
                </p>
              ) : (
                <p className="mb-3 rounded-xl bg-leaf/15 px-3 py-2 text-xs font-semibold text-leaf">
                  Yeay, kamu dapat gratis ongkir!
                </p>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-ink-soft">
                <span>Ongkir (estimasi)</span>
                <span>
                  {remaining === 0 ? "Gratis" : formatPrice(deliveryFee)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-chili py-4 text-sm font-bold text-white transition hover:bg-chili-dark"
              >
                Lanjut checkout <ArrowRight size={17} />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
