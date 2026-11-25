import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Lengkapi data pemesanan ketoprak Toprakku dan kirim pesananmu.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
        Hampir selesai
      </p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        Checkout pesananmu
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink-soft">
        Isi data penerima, pilih cara terima pesanan, lalu tekan buat pesanan.
        Kami akan langsung meracik ketoprakmu.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
