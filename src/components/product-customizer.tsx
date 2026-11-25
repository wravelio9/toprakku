"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Minus, Plus, X } from "lucide-react";
import { FoodArt } from "@/components/food-art";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import {
  sizeOptions,
  spiceLevels,
  toppingOptions,
  type MenuItem,
} from "@/lib/menu";

export function ProductCustomizer({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const { addItem, openCart } = useCart();
  const [size, setSize] = useState<string>("reguler");
  const [spice, setSpice] = useState<string>("sedang");
  const [toppings, setToppings] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const selectedToppings = useMemo(
    () => toppingOptions.filter((option) => toppings.includes(option.id)),
    [toppings],
  );

  const unitPrice =
    item.price +
    (sizeOptions.find((option) => option.id === size)?.price ?? 0) +
    selectedToppings.reduce((total, option) => total + option.price, 0);

  function toggleTopping(id: string) {
    setToppings((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  function handleAdd() {
    addItem({
      menuId: item.id,
      name: item.name,
      unitPrice,
      qty,
      sizeLabel: sizeOptions.find((option) => option.id === size)?.label,
      spiceLabel: spiceLevels.find((level) => level.id === spice)?.label,
      toppings: selectedToppings.map((option) => option.label),
      notes: notes.trim() || undefined,
      art: item.art,
    });
    onClose();
    openCart();
  }

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-night/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="customizer-title"
        className="animate-pop-in relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-soft sm:rounded-[2rem]"
      >
        <div className="relative flex shrink-0 items-center gap-4 border-b border-ink/10 bg-surface px-5 py-4 sm:px-7">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
            <FoodArt variant={item.art} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-chili">
              Atur racikanmu
            </p>
            <h2 id="customizer-title" className="font-display text-xl font-semibold">
              {item.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup kustomisasi"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 transition hover:border-chili/40 hover:text-chili"
          >
            <X size={18} />
          </button>
        </div>

        <div className="hide-scrollbar flex-1 space-y-7 overflow-y-auto px-5 py-6 sm:px-7">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
              Pilih porsi
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {sizeOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSize(option.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    size === option.id
                      ? "border-chili bg-chili/5 ring-2 ring-chili/20"
                      : "border-ink/10 bg-surface hover:border-chili/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{option.label}</span>
                    {size === option.id && (
                      <Check size={15} className="text-chili" strokeWidth={3} />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">{option.note}</p>
                  <p className="mt-2 text-xs font-bold text-sauce">
                    {option.price === 0 ? "Termasuk" : `+ ${formatPrice(option.price)}`}
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
              Level pedas
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {spiceLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSpice(level.id)}
                  className={`rounded-2xl border px-3 py-4 text-center transition ${
                    spice === level.id
                      ? "border-chili bg-chili/5 ring-2 ring-chili/20"
                      : "border-ink/10 bg-surface hover:border-chili/30"
                  }`}
                >
                  <span className="text-xl">{level.emoji}</span>
                  <p className="mt-1 text-xs font-bold">{level.label}</p>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
              Tambahan <span className="normal-case tracking-normal">(opsional)</span>
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {toppingOptions.map((option) => {
                const active = toppings.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleTopping(option.id)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-leaf bg-leaf/10"
                        : "border-ink/10 bg-surface hover:border-leaf/40"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                        active ? "border-leaf bg-leaf text-white" : "border-ink/20"
                      }`}
                    >
                      {active && <Check size={13} strokeWidth={3} />}
                    </span>
                    <span className="flex-1 text-sm font-semibold">{option.label}</span>
                    <span className="text-xs font-bold text-sauce">
                      +{formatPrice(option.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <label
              htmlFor="catatan"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft"
            >
              Catatan khusus
            </label>
            <textarea
              id="catatan"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={2}
              placeholder="Contoh: tofu dibanyakin, sambal dipisah ya"
              className="mt-3 w-full resize-none rounded-2xl border border-ink/10 bg-surface px-4 py-3 text-sm outline-none placeholder:text-ink-soft/50 focus:border-chili/50 focus:ring-2 focus:ring-chili/15"
            />
          </section>
        </div>

        <div className="shrink-0 border-t border-ink/10 bg-surface px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-2 py-1.5">
              <button
                type="button"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
                aria-label="Kurangi jumlah"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-surface"
              >
                <Minus size={15} />
              </button>
              <span className="w-6 text-center text-sm font-bold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((value) => value + 1)}
                aria-label="Tambah jumlah"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-surface"
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-chili py-3.5 text-sm font-bold text-white transition hover:bg-chili-dark"
            >
              Tambah ke keranjang • {formatPrice(unitPrice * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
