import type { Metadata } from "next";
import { OrderStatus } from "@/components/order-status";

export const metadata: Metadata = {
  title: "Status Pesanan",
  description: "Lihat status dan detail pesanan ketoprak Toprakku kamu.",
};

export default function PesananPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
        Pesanan kamu
      </p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        Sedang kami racik
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink-soft">
        Pantau progres pesananmu di sini. Detail pembayaran dan alamat pengiriman
        juga tersimpan bersama pesanan terakhirmu.
      </p>
      <div className="mt-10">
        <OrderStatus />
      </div>
    </div>
  );
}
