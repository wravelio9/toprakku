"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Bike,
  Check,
  Landmark,
  MapPin,
  QrCode,
  ShoppingBag,
  Store,
} from "lucide-react";
import { FoodArt } from "@/components/food-art";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";
import {
  deliveryFee,
  estimatedMinutes,
  freeDeliveryThreshold,
} from "@/lib/menu";
import {
  createOrderId,
  saveOrder,
  type Order,
} from "@/lib/orders";

type Method = "delivery" | "pickup";
type Payment = "qris" | "transfer" | "tunai";

const paymentOptions: { id: Payment; label: string; note: string; icon: typeof QrCode }[] = [
  { id: "qris", label: "QRIS", note: "Scan & bayar instan", icon: QrCode },
  { id: "transfer", label: "Transfer bank", note: "BCA, Mandiri, BNI", icon: Landmark },
  { id: "tunai", label: "Tunai", note: "Bayar saat pesanan tiba", icon: Banknote },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, itemCount, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [method, setMethod] = useState<Method>("delivery");
  const [payment, setPayment] = useState<Payment>("qris");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const deliveryCost =
    method === "delivery" && subtotal < freeDeliveryThreshold ? deliveryFee : 0;
  const total = subtotal + deliveryCost;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-ink/15 bg-surface px-6 py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream-dark">
          <ShoppingBag size={32} className="text-sauce" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-semibold">
          Belum ada yang dipesan
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          Isi keranjangmu dulu dengan ketoprak favorit, lalu kembali ke sini
          untuk checkout.
        </p>
        <Link
          href="/menu"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-chili px-7 py-3.5 text-sm font-bold text-white transition hover:bg-chili-dark"
        >
          Pilih menu <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Nama penerima minimal 2 karakter.");
      return;
    }
    if (!/^[0-9+\-\s]{8,}$/.test(phone.trim())) {
      setError("Nomor WhatsApp tidak valid. Contoh: 081234567890.");
      return;
    }
    if (method === "delivery" && address.trim().length < 8) {
      setError("Alamat lengkap diperlukan untuk pengiriman.");
      return;
    }

    setSubmitting(true);

    const order: Order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: method === "delivery" ? address.trim() : "Ambil di toko Toprakku",
        note: note.trim(),
      },
      method,
      payment: paymentOptions.find((option) => option.id === payment)?.label ?? "QRIS",
      items,
      subtotal,
      deliveryCost,
      total,
    };

    saveOrder(order);

    window.setTimeout(() => {
      clearCart();
      router.push("/pesanan");
    }, 450);
  }

  const inputClass =
    "w-full rounded-2xl border border-ink/10 bg-surface px-4 py-3.5 text-sm outline-none transition placeholder:text-ink-soft/45 focus:border-chili/50 focus:ring-2 focus:ring-chili/15 disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-5">
        <section className="rounded-3xl border border-ink/8 bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night text-sm font-bold text-butter">
              1
            </span>
            <h2 className="font-display text-2xl font-semibold">Informasi pemesan</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-xs font-bold text-ink-soft">Nama penerima</span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nama lengkap"
                autoComplete="name"
                className={`mt-2 ${inputClass}`}
                required
              />
            </label>
            <label className="sm:col-span-2">
              <span className="text-xs font-bold text-ink-soft">Nomor WhatsApp</span>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="081234567890"
                inputMode="tel"
                autoComplete="tel"
                className={`mt-2 ${inputClass}`}
                required
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-ink/8 bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night text-sm font-bold text-butter">
              2
            </span>
            <h2 className="font-display text-2xl font-semibold">Cara terima pesanan</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("delivery")}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                method === "delivery"
                  ? "border-chili bg-chili/5 ring-2 ring-chili/20"
                  : "border-ink/10 hover:border-chili/30"
              }`}
            >
              <Bike size={21} className="shrink-0 text-chili" />
              <span>
                <span className="block text-sm font-bold">Diantar ke rumah</span>
                <span className="mt-1 block text-xs text-ink-soft">
                  Estimasi {estimatedMinutes}
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMethod("pickup")}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                method === "pickup"
                  ? "border-chili bg-chili/5 ring-2 ring-chili/20"
                  : "border-ink/10 hover:border-chili/30"
              }`}
            >
              <Store size={21} className="shrink-0 text-chili" />
              <span>
                <span className="block text-sm font-bold">Ambil di toko</span>
                <span className="mt-1 block text-xs text-ink-soft">
                  Siap dalam 15 menit
                </span>
              </span>
            </button>
          </div>

          {method === "delivery" ? (
            <label className="mt-5 block">
              <span className="flex items-center gap-2 text-xs font-bold text-ink-soft">
                <MapPin size={14} /> Alamat lengkap
              </span>
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                rows={3}
                placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kota"
                className={`mt-2 resize-none ${inputClass}`}
                required
              />
            </label>
          ) : (
            <p className="mt-5 rounded-2xl bg-leaf/10 px-4 py-3 text-xs font-semibold text-leaf">
              Alamat Toprakku: Jl. Kacang Raya No. 12, Jakarta Selatan. Kami siapkan
              pesananmu dalam 15 menit.
            </p>
          )}
        </section>

        <section className="rounded-3xl border border-ink/8 bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night text-sm font-bold text-butter">
              3
            </span>
            <h2 className="font-display text-2xl font-semibold">Metode pembayaran</h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {paymentOptions.map((option) => {
              const Icon = option.icon;
              const active = payment === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setPayment(option.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-chili bg-chili/5 ring-2 ring-chili/20"
                      : "border-ink/10 hover:border-chili/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-sauce" />
                    {active && <Check size={15} className="text-chili" strokeWidth={3} />}
                  </div>
                  <p className="mt-3 text-sm font-bold">{option.label}</p>
                  <p className="mt-1 text-[11px] leading-4 text-ink-soft">
                    {option.note}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-ink/8 bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-night text-sm font-bold text-butter">
              4
            </span>
            <h2 className="font-display text-2xl font-semibold">Catatan pesanan</h2>
          </div>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={2}
            placeholder="Contoh: tolong sambal dipisah, titip sendok ekstra"
            className={`mt-5 resize-none ${inputClass}`}
          />
        </section>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft transition hover:text-chili"
        >
          <ArrowLeft size={16} /> Tambah menu lagi
        </Link>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-ink/8 bg-surface">
          <div className="border-b border-ink/8 px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-chili">
              Ringkasan pesanan
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold">
              {itemCount} porsi ketoprak
            </h2>
          </div>

          <div className="hide-scrollbar max-h-72 space-y-3 overflow-y-auto px-6 py-5">
            {items.map((item) => (
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
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-ink/8 px-6 py-5 text-sm">
            <div className="flex justify-between text-ink-soft">
              <span>Subtotal</span>
              <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-soft">
              <span>Ongkos kirim</span>
              <span className={`font-semibold ${deliveryCost === 0 ? "text-leaf" : "text-ink"}`}>
                {deliveryCost === 0 ? "Gratis" : formatPrice(deliveryCost)}
              </span>
            </div>
            <div className="mt-3 flex justify-between border-t border-dashed border-ink/15 pt-3">
              <span className="font-bold">Total bayar</span>
              <span className="font-display text-2xl font-semibold text-chili">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {error && (
            <p className="mx-6 mb-4 rounded-xl bg-chili/10 px-3 py-2 text-xs font-semibold text-chili">
              {error}
            </p>
          )}

          <div className="px-6 pb-6">
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-chili py-4 text-sm font-bold text-white transition hover:bg-chili-dark disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? "Membuat pesanan..." : "Buat pesanan"}
              {!submitting && <ArrowRight size={17} />}
            </button>
            <p className="mt-4 text-center text-[11px] leading-5 text-ink-soft">
              Pesanan akan diproses setelah kamu menekan tombol tersebut. Pembayaran
              ditampilkan sebagai simulasi dalam demo ini.
            </p>
          </div>
        </div>
      </aside>
    </form>
  );
}
