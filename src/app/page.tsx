import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Check,
  Flame,
  Leaf,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import { FoodArt } from "@/components/food-art";
import { formatPrice } from "@/lib/format";
import { menuItems } from "@/lib/menu";

const marqueeWords = [
  "Saus kacang rahasia",
  "Tahu lembut",
  "Bihun mengenyangkan",
  "Lontong kenyal",
  "Tauge segar",
  "Sambal bisa diatur",
  "Kerupuk renyah",
];

const features = [
  {
    icon: Sparkles,
    title: "Saus kacang rahasia",
    description:
      "Kacang pilihan, gula aren, dan rempah yang dimasak perlahan tiap pagi. Bukan dari bubuk kemasan.",
    tone: "bg-butter/30 text-sauce",
  },
  {
    icon: Flame,
    title: "Pedas sesuai selera",
    description:
      "Mulai dari ringan sampai bikin keringat. Kamu yang menentukan level pedasnya.",
    tone: "bg-chili/10 text-chili",
  },
  {
    icon: Bike,
    title: "Sampai masih hangat",
    description:
      "Dibungkus rapat dan diantar cepat, supaya tekstur dan aromanya tetap terjaga.",
    tone: "bg-leaf/15 text-leaf",
  },
];

const steps = [
  {
    number: "01",
    title: "Pilih ketoprakmu",
    text: "Original, spesial, atau pedas. Semua bisa kamu kustom.",
  },
  {
    number: "02",
    title: "Atur racikan",
    text: "Tentukan porsi, level pedas, dan tambahan favoritmu.",
  },
  {
    number: "03",
    title: "Tunggu di rumah",
    text: "Pesanan diproses dan diantar hangat ke depan pintu.",
  },
];

const testimonials = [
  {
    name: "Rani P.",
    role: "Pembeli tetap",
    text: "Saus kacangnya beneran beda. Enak, nggak terlalu manis, dan pedasnya pas banget.",
    initials: "RP",
    color: "bg-butter/40 text-sauce",
  },
  {
    name: "Dimas A.",
    role: "Order kantoran",
    text: "Pesan jam 12, datang sebelum jam 1. Rangsumnya rapi dan masih hangat.",
    initials: "DA",
    color: "bg-leaf/20 text-leaf",
  },
  {
    name: "Nadia S.",
    role: "Penyuka pedas",
    text: "Level pedas Toprakku juara. Tambah sambalnya bikin ketagihan, tapi tetap enak.",
    initials: "NS",
    color: "bg-chili/15 text-chili",
  },
];

const featured = ["ketoprak-original", "ketoprak-spesial", "paket-berdua"]
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is (typeof menuItems)[number] => Boolean(item));

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-chili">
        <span className="h-px w-8 bg-chili/40" />
        {eyebrow}
        <span className="h-px w-8 bg-chili/40" />
      </p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-ink-soft">{description}</p>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden pt-8 sm:pt-12">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-butter/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-chili/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24 lg:pt-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-chili/15 bg-surface px-4 py-2 text-xs font-bold text-chili shadow-card">
              <span className="h-2 w-2 animate-pulse rounded-full bg-chili" />
              Buka setiap hari • 10.00 – 21.00
            </span>

            <h1 className="text-balance mt-6 font-display text-5xl font-semibold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              Ketoprak yang bikin{" "}
              <span className="relative inline-block text-chili">
                nagih
                <svg
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M3 10C55 2 140 2 197 9"
                    fill="none"
                    stroke="#D9452B"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , sampai ke depan pintu.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-ink-soft">
              Saus kacang racikan sendiri, tahu lembut, dan bihun yang pas.
              Diracik segar tiap hari—pedasnya juga kamu yang atur.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-chili px-7 py-4 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-chili-dark"
              >
                Pesan sekarang <ArrowRight size={18} />
              </Link>
              <Link
                href="#cara-pesan"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface px-7 py-4 text-sm font-bold transition hover:border-chili/40 hover:text-chili"
              >
                Lihat cara pesan
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 border-t border-ink/10 pt-6">
              {[
                { value: "4.9/5", label: "Rating pembeli" },
                { value: "1.2rb+", label: "Porsi terjual" },
                { value: "25–35 mnt", label: "Estimasi sampai" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold">{stat.value}</p>
                  <p className="mt-0.5 text-xs font-semibold text-ink-soft">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-square overflow-hidden rounded-[3rem] border border-ink/5 bg-gradient-to-br from-cream-dark via-cream to-butter/40 shadow-soft">
              <div className="bg-dots absolute inset-0 opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <FoodArt
                  variant="spesial"
                  className="animate-floaty h-full w-full drop-shadow-[0_24px_24px_rgba(43,26,18,0.18)]"
                />
              </div>
              <div className="animate-pop-in absolute left-3 top-10 rotate-[-6deg] rounded-2xl bg-surface px-4 py-3 shadow-card sm:left-0">
                <p className="text-xs font-bold text-chili">Saus rahasia</p>
                <p className="text-[11px] text-ink-soft">Dimasak tiap pagi</p>
              </div>
              <div className="animate-pop-in absolute bottom-10 right-3 rotate-[5deg] rounded-2xl bg-night px-4 py-3 text-night-text shadow-card sm:right-0">
                <p className="text-xs font-bold text-butter">Pedas bisa diatur</p>
                <p className="text-[11px] text-night-text/70">Ringan sampai nampol</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-2 flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 shadow-card sm:-left-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-leaf/15 text-leaf">
                <Leaf size={16} />
              </span>
              <span className="text-xs font-bold">Segar tiap hari</span>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y-2 border-ink bg-chili py-3 text-white">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0" aria-hidden={group === 1}>
              {marqueeWords.map((word) => (
                <span
                  key={`${group}-${word}`}
                  className="flex items-center gap-6 px-6 text-xs font-bold uppercase tracking-[0.2em]"
                >
                  {word}
                  <span className="text-butter">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="cara-pesan" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Kenapa Toprakku"
          title={
            <>
              Ketoprak sederhana,{" "}
              <span className="text-chili">detailnya yang bikin beda.</span>
            </>
          }
          description="Kami percaya makanan enak dimulai dari bahan yang jujur dan perhatian pada hal kecil."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group rounded-3xl border border-ink/8 bg-surface p-7 transition hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.tone}`}
                >
                  <Icon size={25} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-cream-dark/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Paling Laris"
              title="Yang paling sering dipesan"
              description="Tiga favorit pembeli Toprakku. Pilih satu, atau semuanya?"
            />
            <Link
              href="/menu"
              className="inline-flex shrink-0 items-center gap-2 self-center rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm font-bold transition hover:border-chili/40 hover:text-chili sm:self-auto"
            >
              Lihat semua menu <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <Link
                key={item.id}
                href="/menu"
                className="group overflow-hidden rounded-3xl border border-ink/8 bg-surface transition hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div className="relative h-52 overflow-hidden bg-cream">
                  <div className="bg-dots absolute inset-0 opacity-40" />
                  <FoodArt
                    variant={item.art}
                    className="h-full w-full transition duration-500 group-hover:scale-105"
                  />
                  {item.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-chili px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-end justify-between gap-3 p-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{item.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-sauce">
                      <Star size={13} fill="currentColor" /> {item.rating} • {item.sold}{" "}
                      terjual
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-bold text-chili">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Caranya Gampang"
          title="Tiga langkah, ketoprak sampai"
          description="Nggak perlu antre. Pesan dari mana saja, kami yang urus sisanya."
        />

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-sauce/30 md:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-cream bg-night font-display text-xl font-semibold text-butter shadow-card">
                {step.number}
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-ink-soft">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {["Porsi reguler atau besar", "Pedas ringan–nampol", "Tambah telur & tahu", "Catatan khusus"].map(
            (label) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-xs font-bold text-ink-soft shadow-card"
              >
                <Check size={14} className="text-leaf" strokeWidth={3} />
                {label}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="overflow-hidden bg-night py-20 text-night-text sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-butter">
              <span className="h-px w-8 bg-butter/50" />
              Cerita Pembeli
              <span className="h-px w-8 bg-butter/50" />
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Senangnya bukan cuma di lidah.
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-night-text/60">
              Tiap pesanan kami bawa dengan senyum. Ini beberapa kata yang bikin
              hari kami lebih semangat.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`rounded-3xl border border-white/10 bg-white/5 p-6 ${
                  index === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <Quote size={22} className="text-butter/70" />
                <p className="mt-4 text-sm leading-7 text-night-text/85">
                  “{testimonial.text}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${testimonial.color}`}
                  >
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{testimonial.name}</p>
                    <p className="text-xs text-night-text/50">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-butter">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-chili px-6 py-14 text-center text-white shadow-soft sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-butter/20 blur-2xl" />
          <div className="relative">
            <ShieldCheck size={34} className="mx-auto text-butter" />
            <h2 className="text-balance mt-5 font-display text-4xl font-semibold sm:text-5xl">
              Perut lapar, jangan ditunda.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/80">
              Pilih ketoprak favoritmu, atur racikannya, dan biarkan kami yang
              mengantar ke depan pintu.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-chili transition hover:-translate-y-0.5 hover:bg-butter"
            >
              Mulai pesan <ArrowRight size={18} />
            </Link>
            <p className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-white/70">
              <Wallet size={14} /> Tanpa biaya tersembunyi • Bisa bayar tunai
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
