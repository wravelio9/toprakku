"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { useCart } from "@/components/cart-provider";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/menu", label: "Menu" },
  { href: "/#cara-pesan", label: "Cara Pesan" },
  { href: "/pesanan", label: "Pesanan" },
];

function isActive(pathname: string, href: string, hash: string) {
  if (href === "/") return pathname === "/" && !hash;
  if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1);
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hash, setHash] = useState("");
  const { itemCount, openCart } = useCart();
  const { resolved, toggle } = useTheme();

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    const timer = window.setTimeout(syncHash, 0);
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, [pathname]);

  function handleNavClick(item: (typeof navItems)[number]) {
    setMobileOpen(false);
    if (item.href.startsWith("/#")) setHash(item.href.slice(1));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          onClick={() => {
            setMobileOpen(false);
            setHash("");
          }}
          className="flex items-center gap-2.5"
          aria-label="Toprakku, ke beranda"
        >
          <BrandMark className="h-10 w-10 shrink-0" />
          <span className="font-display text-2xl font-semibold tracking-tight">
            toprak<span className="text-chili">ku</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(pathname, item.href, hash)
                  ? "bg-ink text-cream"
                  : "text-ink-soft hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/menu"
            className="hidden rounded-full bg-chili px-5 py-2.5 text-sm font-bold text-white shadow-card transition hover:bg-chili-dark sm:inline-flex"
          >
            Pesan Sekarang
          </Link>
          <button
            type="button"
            onClick={toggle}
            aria-label={
              resolved === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap"
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface transition hover:border-chili/40 hover:text-chili"
          >
            {resolved === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Buka keranjang, ${itemCount} item`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface transition hover:border-chili/40 hover:text-chili"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-chili px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-surface md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="animate-pop-in border-t border-ink/5 bg-cream px-5 pb-4 pt-2 md:hidden"
          aria-label="Navigasi seluler"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item)}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                isActive(pathname, item.href, hash)
                  ? "bg-ink text-cream"
                  : "text-ink-soft hover:bg-ink/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
