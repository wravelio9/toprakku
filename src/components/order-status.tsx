"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  ReceiptText,
  Store,
} from "lucide-react";
import { FoodArt } from "@/components/food-art";
import { formatDate, formatPrice } from "@/lib/format";
import { getLastOrder, saveOrder, type Order } from "@/lib/orders";

export function OrderStatus() {
  const [order, setOrder] = useState<Order | null>(null);
  const [step, setStep] = useState(0);

  const stepLabels =
    order?.method === "pickup"
      ? ["Pesanan diterima", "Sedang diracik", "Siap diambil", "Selesai"]
      : ["Pesanan diterima", "Sedang diracik", "Dalam perjalanan", "Selesai"];

  useEffect(() => {
    let interval: number | undefined;
    const timer = window.setTimeout(() => {
      const saved = getLastOrder();
      setOrder(saved);
      if (!saved) return;

      const update = () => {
        if (saved.completedAt) {
          setStep(3);
          return;
        }
        const elapsedMinutes =
          (Date.now() - new Date(saved.createdAt).getTime()) / 60000;
        setStep(Math.min(3, Math.floor(elapsedMinutes / 2)));
      };
      update();
      interval = window.setInterval(update, 30000);
    }, 0);

    return () => {
      window.clearTimeout(timer);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, []);

  function markComplete() {
    if (!order || order.method !== "pickup" || order.completedAt) return;
    const updated: Order = { ...order, completedAt: new Date().toISOString() };
    saveOrder(updated);
    setOrder(updated);
    setStep(3);
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-ink/15 bg-surface px-6 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark">
          <ReceiptText size={32} className="text-sauce" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-semibold">
          Belum ada pesanan
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Setelah kamu membuat pesanan, status dan detailnya akan muncul di halaman
          ini.
        </p>
        <Link
          href="/menu"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-chili px-7 py-3.5 text-sm font-bold text-white transition hover:bg-chili-dark"
        >
          Mulai pesan <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-5">
        <section className="overflow-hidden rounded-3xl border border-leaf/20 bg-surface">
          <div className="bg-leaf/10 px-6 py-8 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-white">
              <Check size={30} strokeWidth={3} />
            </div>
            <h2 className="mt-5 font-display text-3xl font-semibold">
              Pesanan berhasil dibuat!
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Terima kasih, {order.customer.name}. Ketoprakmu segera kami racik.
            </p>
            <div className="mt-6 inline-flex flex-col items-center gap-1 rounded-2xl bg-surface px-6 py-3 shadow-card">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft">
                Nomor pesanan
              </span>
              <span className="font-display text-2xl font-semibold tracking-wide text-chili">
                {order.id}
              </span>
            </div>
          </div>

          <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-10">
            <div className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3">
              <Clock3 size={19} className="shrink-0 text-sauce" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Estimasi
                </p>
                <p className="text-sm font-bold">
                  {order.method === "delivery" ? "25–35 menit" : "15 menit"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-cream px-4 py-3">
              {order.method === "delivery" ? (
                <Bike size={19} className="shrink-0 text-sauce" />
              ) : (
                <Store size={19} className="shrink-0 text-sauce" />
              )}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  Metode
                </p>
                <p className="text-sm font-bold">
                  {order.method === "delivery" ? "Diantar" : "Ambil di toko"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-ink/8 bg-surface p-6 sm:p-8">
          <h3 className="font-display text-2xl font-semibold">Status pesanan</h3>
          <div className="mt-7">
            {stepLabels.map((label, index) => {
              const done = index < step;
              const current = index === step;
              return (
                <div key={label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition ${
                        done
                          ? "border-leaf bg-leaf text-white"
                          : current
                            ? "border-chili bg-chili text-white"
                            : "border-ink/15 bg-surface text-ink-soft/40"
                      }`}
                    >
                      {done ? <Check size={16} strokeWidth={3} /> : index + 1}
                    </span>
                    {index < stepLabels.length - 1 && (
                      <span
                        className={`h-11 w-0.5 ${done ? "bg-leaf" : "bg-ink/10"}`}
                      />
                    )}
                  </div>
                  <div className="pb-6 pt-1.5">
                    <p
                      className={`text-sm font-bold ${
                        done || current ? "text-ink" : "text-ink-soft/50"
                      }`}
                    >
                      {label}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {done
                        ? "Selesai"
                        : current
                          ? "Sedang berlangsung"
                          : "Menunggu giliran"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="rounded-xl bg-butter/20 px-4 py-3 text-xs leading-5 text-ink-soft">
            Status diperbarui otomatis dalam demo ini. Pembayaran{" "}
            {order.payment} akan dikonfirmasi oleh penjaga toko.
          </p>

          {order.method === "pickup" && !order.completedAt && (
            <button
              type="button"
              onClick={markComplete}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-leaf py-3.5 text-sm font-bold text-white transition hover:bg-leaf/85"
            >
              <Check size={16} strokeWidth={3} /> Pesanan selesai
            </button>
          )}
          {order.method === "pickup" && order.completedAt && (
            <p className="mt-4 flex items-center gap-2 rounded-xl bg-leaf/15 px-4 py-3 text-xs font-semibold text-leaf">
              <CheckCircle2 size={16} /> Pesanan selesai diambil. Terima kasih!
            </p>
          )}
        </section>
      </div>

      <aside className="space-y-5">
        <section className="rounded-3xl border border-ink/8 bg-surface p-6 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-chili">
                Detail pesanan
              </p>
              <p className="mt-2 text-xs text-ink-soft">{formatDate(order.createdAt)}</p>
            </div>
            <CheckCircle2 size={24} className="shrink-0 text-leaf" />
          </div>

          <div className="mt-6 space-y-3 border-b border-ink/8 pb-5">
            {order.items.map((item) => (
              <div key={item.key} className="flex gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream">
                  <FoodArt variant={item.art} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <p className="truncate text-sm font-bold">{item.name}</p>
                    <p className="shrink-0 text-xs font-bold">
                      {formatPrice(item.unitPrice * item.qty)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[11px] text-ink-soft">
                    {item.qty}x • {[item.sizeLabel, item.spiceLabel].filter(Boolean).join(", ") || "Standar"}
                  </p>
                  {item.toppings.length > 0 && (
                    <p className="text-[11px] text-sauce">+ {item.toppings.join(", ")}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span className="font-semibold text-ink">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Ongkos kirim</span>
              <span className="font-semibold text-ink">
                {order.deliveryCost === 0 ? "Gratis" : formatPrice(order.deliveryCost)}
              </span>
            </div>
            <div className="mt-3 flex justify-between border-t border-dashed border-ink/15 pt-3">
              <span className="font-bold">Total</span>
              <span className="font-display text-2xl font-semibold text-chili">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-ink/8 bg-surface p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold">Informasi penerima</h3>
          <div className="mt-4 space-y-3 text-sm text-ink-soft">
            <p>
              <span className="font-bold text-ink">Nama:</span> {order.customer.name}
            </p>
            <p>
              <span className="font-bold text-ink">WhatsApp:</span>{" "}
              {order.customer.phone}
            </p>
            <p className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-chili" />
              <span>{order.customer.address}</span>
            </p>
            <p>
              <span className="font-bold text-ink">Pembayaran:</span>{" "}
              {order.payment}
            </p>
            {order.customer.note && (
              <p className="rounded-xl bg-cream px-3 py-2 text-xs italic">
                “{order.customer.note}”
              </p>
            )}
          </div>
        </section>

        <Link
          href="/menu"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-night py-4 text-sm font-bold text-night-text transition hover:bg-chili"
        >
          Pesan lagi <ArrowRight size={17} />
        </Link>
      </aside>
    </div>
  );
}
