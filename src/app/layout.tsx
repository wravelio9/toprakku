import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileNav } from "@/components/mobile-nav";
import { CartProvider } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { ThemeProvider } from "@/components/theme-provider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Toprakku — Ketoprak Enak, Pesan Mudah",
    template: "%s | Toprakku",
  },
  description:
    "Pesan ketoprak favoritmu dari Toprakku. Saus kacang rahasia, pedas bisa diatur, dan sampai hangat di depan pintu.",
  keywords: ["ketoprak", "pesan ketoprak", "makanan Indonesia", "Toprakku"],
  openGraph: {
    title: "Toprakku — Ketoprak Enak, Pesan Mudah",
    description:
      "Ketoprak saus kacang rahasia, diracik segar tiap hari. Pesan sekarang, sampai hangat di depan pintu.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} ${fraunces.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('toprakku-theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}`,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased">
        <ThemeProvider>
          <CartProvider>
            <SiteHeader />
            <main className="pb-24 md:pb-0">{children}</main>
            <SiteFooter />
            <CartDrawer />
            <MobileNav />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
