import type { Metadata } from "next";
import Link from "next/link";
import {
  Thermometer, Droplets, Wind, Volume2, PowerOff, Zap,
  CheckCircle2, ArrowRight, MapPin, Clock, Shield, MessageCircle,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WaFloat from "@/components/wa-float";
import { AC_PROBLEMS, FAQ_AC, AREAS, BRAND, getWhatsAppLink } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service AC Batam — Cuci AC, Isi Freon, Teknisi Datang ke Rumah",
  description: "Service AC Batam terpercaya. Cuci AC, isi freon, bongkar pasang. Teknisi terverifikasi datang ke rumah. Konsultasi gratis.",
};

const problemIcons: Record<string, React.ReactNode> = {
  Thermometer: <Thermometer className="h-6 w-6" />, Droplets: <Droplets className="h-6 w-6" />,
  Wind: <Wind className="h-6 w-6" />, Volume2: <Volume2 className="h-6 w-6" />,
  PowerOff: <PowerOff className="h-6 w-6" />, Zap: <Zap className="h-6 w-6" />,
};

const acServices = [
  "Cuci AC", "Deep Clean AC", "Isi Freon", "AC Tidak Dingin", "AC Bocor / Netes",
  "AC Bau", "AC Bunyi", "AC Mati Total", "Ganti Kapasitor", "Bongkar Pasang AC", "Pasang AC Baru",
];

export default function ServiceACPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-hero-gradient relative overflow-hidden py-16 sm:py-24">
          <div className="container-page relative text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand shadow-sm backdrop-blur">
              <Thermometer className="h-4 w-4" />Service AC Batam
            </div>
            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              AC Bermasalah? <span className="text-gradient">Teknisi Kami Datang ke Rumah.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg text-slate-600">
              Konsultasi gratis. Harga disepakati sebelum pengerjaan. Teknisi terverifikasi, garansi pekerjaan.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={getWhatsAppLink("Halo Benerin, AC saya bermasalah. Bisa bantu?")} target="_blank" rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 sm:w-auto">
                <MessageCircle className="h-5 w-5" />Konsultasi Gratis via WA
              </a>
              <Link href="/booking?category=ac" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg sm:w-auto">
                Booking Online <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" />Garansi pekerjaan</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand" />Respon cepat</span>
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-brand" />Teknisi verified</span>
            </div>
          </div>
        </section>

        {/* MASALAH */}
        <section className="py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-red-500">Masalah AC?</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Kami Bisa Bantu</h2>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AC_PROBLEMS.map((p) => (
                <div key={p.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">{problemIcons[p.icon]}</div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LAYANAN AC */}
        <section className="bg-slate-50 py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">Layanan AC</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Yang Bisa Kami Kerjakan</h2>
              <p className="mx-auto mt-4 max-w-md text-slate-500">Hubungi kami untuk konsultasi gratis dan estimasi harga.</p>
            </div>
            <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
              {acServices.map((svc) => (
                <span key={svc} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand/30 hover:shadow-md">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />{svc}
                </span>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={getWhatsAppLink("Halo Benerin, saya mau tanya harga service AC.")} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-green-700">
                <MessageCircle className="h-5 w-5" />Tanya Harga via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* AREA */}
        <section className="py-20">
          <div className="container-page text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand">Jangkauan Luas</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Area Service AC</h2>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {AREAS.map((area) => (
                <span key={area} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm">
                  <MapPin className="h-3.5 w-3.5 text-brand" />Service AC {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">FAQ</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Pertanyaan Umum</h2>
            </div>
            <div className="mx-auto mt-12 max-w-2xl space-y-3">
              {FAQ_AC.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <summary className="cursor-pointer px-6 py-5 text-base font-semibold text-slate-900 transition group-open:text-brand">{faq.q}</summary>
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container-page">
            <div className="bg-cta-gradient relative overflow-hidden rounded-3xl px-6 py-16 text-center shadow-2xl shadow-brand/20 sm:px-16">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">AC Bermasalah? Jangan Ditunda.</h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-blue-100">Konsultasi gratis. Hubungi sekarang, teknisi datang hari ini.</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={getWhatsAppLink("Halo Benerin, AC saya bermasalah.")} target="_blank" rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-green-600 sm:w-auto">
                  <MessageCircle className="h-5 w-5" />Hubungi WhatsApp
                </a>
                <Link href="/booking?category=ac" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-brand shadow-lg sm:w-auto">
                  Booking Online <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
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
