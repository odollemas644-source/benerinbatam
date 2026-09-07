import Link from "next/link";
import {
  Snowflake, Tv, Sparkles, Zap, Droplets, ChevronRight,
  Shield, Clock, BadgeCheck, Banknote, Star, ArrowRight, MapPin, MessageCircle,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WaFloat from "@/components/wa-float";
import {
  SERVICE_CATEGORIES, HOW_IT_WORKS, TRUST_POINTS, AREAS, BRAND, getWhatsAppLink,
} from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Snowflake: <Snowflake className="h-6 w-6" />,
  Tv: <Tv className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
  Droplets: <Droplets className="h-6 w-6" />,
};

const trustIcons = [
  <BadgeCheck key="1" className="h-7 w-7" />,
  <Banknote key="2" className="h-7 w-7" />,
  <Shield key="3" className="h-7 w-7" />,
  <Clock key="4" className="h-7 w-7" />,
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-hero-gradient relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(circle at 20% 50%, rgba(37,99,235,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 50%)"}} />
          <div className="container-page relative text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand shadow-sm backdrop-blur">
              <Star className="h-4 w-4 fill-brand text-brand" />
              Platform Jasa Service Terpercaya di Batam
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Service Rumah & Kantor di Batam.{" "}
              <span className="text-gradient">Tinggal Panggil, Beres.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Teknisi terverifikasi datang ke lokasi. Konsultasi gratis, harga disepakati sebelum pengerjaan. Garansi pekerjaan.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={getWhatsAppLink("Halo Benerin, saya butuh service. Bisa bantu?")}
                target="_blank" rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 hover:shadow-xl sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Hubungi via WhatsApp
              </a>
              <Link
                href="/booking"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl sm:w-auto"
              >
                Booking Online
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* LAYANAN */}
        <section className="py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">Layanan Kami</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Satu Tempat untuk Semua Kebutuhan</h2>
              <p className="mx-auto mt-4 max-w-lg text-slate-500">Dari AC, elektronik, listrik, plumbing, sampai cleaning — semua bisa dihandle.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_CATEGORIES.map((svc) => (
                <Link key={svc.id} href={svc.id === "ac" ? "/service-ac" : `/booking?category=${svc.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-light to-indigo-100 text-brand transition-colors group-hover:from-brand group-hover:to-indigo-600 group-hover:text-white">
                      {iconMap[svc.icon]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900">{svc.name}</h3>
                        {svc.popular && <span className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 py-0.5 text-xs font-bold text-white">Populer</span>}
                      </div>
                      <p className="mt-1.5 text-sm text-slate-500">{svc.tagline}</p>
                      <p className="mt-3 text-sm font-semibold text-green-600">Konsultasi Gratis →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CARA KERJA */}
        <section className="bg-slate-50 py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">Cara Kerja</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Semudah 4 Langkah</h2>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-indigo-600 text-xl font-extrabold text-white shadow-lg shadow-brand/20">{item.step}</div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KENAPA BENERIN */}
        <section className="py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">Keunggulan</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Kenapa Pilih {BRAND.name}?</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_POINTS.map((point, i) => (
                <div key={i} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-light to-indigo-100 text-brand transition-colors group-hover:from-brand group-hover:to-indigo-600 group-hover:text-white">{trustIcons[i]}</div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AREA */}
        <section className="bg-slate-50 py-20">
          <div className="container-page text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand">Area Layanan</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">Seluruh Area Batam</h2>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {AREAS.map((area) => (
                <span key={area} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm">
                  <MapPin className="h-3.5 w-3.5 text-brand" />{area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container-page">
            <div className="bg-cta-gradient relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-2xl shadow-brand/20 sm:px-16">
              <div className="relative">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Punya Masalah di Rumah?</h2>
                <p className="mx-auto mt-4 max-w-md text-lg text-blue-100">Konsultasi gratis. Hubungi kami sekarang, teknisi datang hari ini.</p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href={getWhatsAppLink("Halo Benerin, saya butuh bantuan service.")} target="_blank" rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-green-600 sm:w-auto">
                    <MessageCircle className="h-5 w-5" />Hubungi WhatsApp
                  </a>
                  <Link href="/booking" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-brand shadow-lg sm:w-auto">
                    Booking Online <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
