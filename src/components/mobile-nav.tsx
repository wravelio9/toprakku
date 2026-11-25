"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ReceiptText, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { useCart } from "@/components/cart-provider";

const links = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/pesanan", label: "Pesanan", icon: ReceiptText },
];

export function MobileNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-cream/95 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {links.map((link, index) => {
          const Icon = link.icon;
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-bold transition ${
                active ? "text-chili" : "text-ink-soft"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {link.label}
              {index === 1 && active && <span className="h-0.5 w-5 rounded-full bg-chili" />}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={openCart}
          className="relative flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] font-bold text-ink-soft transition hover:text-chili"
        >
          <ShoppingBag size={20} />
          Keranjang
          {itemCount > 0 && (
            <span className="absolute right-2 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-chili px-1 text-[9px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
