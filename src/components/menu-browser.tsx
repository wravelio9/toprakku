"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { FoodArt } from "@/components/food-art";
import { ProductCustomizer } from "@/components/product-customizer";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import {
  categories,
  menuItems,
  type CategoryFilter,
  type MenuItem,
} from "@/lib/menu";

function badgeClasses(tone?: string) {
  if (tone === "leaf") return "bg-leaf text-white";
  if (tone === "butter") return "bg-butter text-ink";
  return "bg-chili text-white";
}

export function MenuBrowser() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Semua");
  const [query, setQuery] = useState("");
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const { addItem, itemCount, subtotal, openCart } = useCart();

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchCategory =
        activeCategory === "Semua" || item.category === activeCategory;
      const matchQuery =
        !normalized ||
        item.name.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized);
      return matchCategory && matchQuery;
    });
  }, [activeCategory, query]);

  function handleAdd(item: MenuItem) {
    if (item.customizable) {
      setCustomizing(item);
      return;
    }
    addItem({
      menuId: item.id,
      name: item.name,
      unitPrice: item.price,
      qty: 1,
      toppings: [],
      art: item.art,
    });
  }

  return (
    <>
      <div className="sticky top-18 z-20 -mx-5 mb-10 bg-cream/95 px-5 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari ketoprak, paket, atau minuman..."
              aria-label="Cari menu"
              className="w-full rounded-full border border-ink/10 bg-surface py-3.5 pl-11 pr-10 text-sm outline-none transition placeholder:text-ink-soft/50 focus:border-chili/50 focus:ring-2 focus:ring-chili/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft hover:text-chili"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-ink-soft">
            <SlidersHorizontal size={16} className="shrink-0" />
            <span className="hidden sm:inline">Filter:</span>
            <div className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeCategory === category
                      ? "bg-ink text-cream"
                      : "border border-ink/10 bg-surface text-ink-soft hover:border-chili/40 hover:text-chili"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink/15 bg-surface px-6 py-20 text-center">
          <Search size={32} className="mx-auto text-ink-soft/50" />
          <h3 className="mt-5 font-display text-2xl font-semibold">
            Menu tidak ditemukan
          </h3>
          <p className="mt-2 text-sm text-ink-soft">
            Coba kata kunci lain atau pilih kategori berbeda.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("Semua");
            }}
            className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-ink/8 bg-surface transition hover:-translate-y-1.5 hover:shadow-soft"
            >
              <div className="relative h-52 overflow-hidden bg-cream">
                <div className="bg-dots absolute inset-0 opacity-40" />
                <FoodArt
                  variant={item.art}
                  className="h-full w-full transition duration-500 group-hover:scale-105"
                />
                {item.badge && (
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${badgeClasses(
                      item.badgeTone,
                    )}`}
                  >
                    {item.badge}
                  </span>
                )}
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-surface/90 px-2.5 py-1.5 text-[11px] font-bold shadow-card">
                  <Star size={12} fill="currentColor" className="text-butter" />
                  {item.rating}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sauce">
                    {item.category}
                  </p>
                  <p className="text-[11px] text-ink-soft">{item.sold} terjual</p>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold leading-tight">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-ink-soft">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/8 pt-4">
                  <span className="font-display text-xl font-semibold text-chili">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-cream transition hover:bg-chili"
                  >
                    <Plus size={15} strokeWidth={3} />
                    {item.customizable ? "Atur" : "Tambah"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {itemCount > 0 && (
        <button
          type="button"
          onClick={openCart}
          className="animate-pop-in fixed inset-x-3 bottom-[74px] z-20 flex items-center gap-3 rounded-2xl bg-night px-4 py-3 text-night-text shadow-soft md:hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-chili">
            <ShoppingBag size={17} />
          </span>
          <span className="flex-1 text-left">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-butter">
              {itemCount} porsi
            </span>
            <span className="block text-sm font-bold">{formatPrice(subtotal)}</span>
          </span>
          <ArrowRight size={18} />
        </button>
      )}

      {customizing && (
        <ProductCustomizer
          item={customizing}
          onClose={() => setCustomizing(null)}
        />
      )}
    </>
  );
}
