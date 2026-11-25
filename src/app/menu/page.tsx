import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu-browser";

export const metadata: Metadata = {
  title: "Menu Ketoprak",
  description:
    "Pilih ketoprak original, spesial, pedas, paket hemat, dan minuman favorit di Toprakku.",
};

export default function MenuPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/8 bg-cream-dark/50 py-14 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-butter/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
            Menu Toprakku
          </p>
          <h1 className="text-balance mt-4 font-display text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Pilih yang bikin{" "}
            <span className="text-chili">perut senang.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink-soft">
            Semua ketoprak diracik segar setelah kamu pesan. Klik menu untuk
            mengatur porsi, pedas, dan tambahan favoritmu.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <MenuBrowser />
      </section>
    </>
  );
}
