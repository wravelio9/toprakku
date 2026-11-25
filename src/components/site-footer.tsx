import Link from "next/link";
import { Camera, Clock3, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const footerLinks = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/#cara-pesan", label: "Cara Pesan" },
  { href: "/pesanan", label: "Lacak Pesanan" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-night text-night-text">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark className="h-11 w-11" />
              <span className="font-display text-2xl font-semibold">
                toprak<span className="text-butter">ku</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-night-text/60">
              Ketoprak rumahan dengan saus kacang rahasia. Diracik segar setiap
              hari, dibungkus dengan senang, dan diantar sampai hangat.
            </p>
            <div className="mt-5 flex gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-butter">
                <Camera size={16} />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-butter">
                <Phone size={16} />
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-butter">
              Jelajahi
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-night-text/70">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-butter">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-butter">
              Jam Buka
            </h3>
            <div className="mt-5 flex gap-3 text-sm text-night-text/70">
              <Clock3 size={17} className="mt-0.5 shrink-0 text-butter" />
              <p>
                Senin – Minggu
                <br />
                10.00 – 21.00 WIB
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-butter">
              Hubungi Kami
            </h3>
            <div className="mt-5 space-y-4 text-sm text-night-text/70">
              <p className="flex gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-butter" />
                Jl. Kacang Raya No. 12, Jakarta Selatan
              </p>
              <p className="flex gap-3">
                <Phone size={17} className="mt-0.5 shrink-0 text-butter" />
                0812-3456-7890
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-night-text/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© Toprakku. Dibuat dengan cinta dan kacang.</p>
          <p>Ketoprak enak, hari makin senang.</p>
        </div>
      </div>
    </footer>
  );
}
