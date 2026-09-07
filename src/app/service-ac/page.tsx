import type { Metadata } from "next";
import Link from "next/link";
import {
  Thermometer, Droplets, Wind, Volume2, PowerOff, Zap,
  CheckCircle2, ArrowRight, Star, MapPin, Clock, Shield,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WaFloat from "@/components/wa-float";
import {
  AC_SERVICES, AC_PROBLEMS, FAQ_AC, AREAS, BRAND,
  formatRupiah, getWhatsAppLink,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service AC Batam — Cuci AC & Isi Freon, Teknisi Datang ke Rumah",
  description: "Service AC Batam terpercaya. Cuci AC mulai Rp90.000, isi freon, bongkar pasang. Teknisi terverifikasi datang ke rumah. Garansi 7 hari.",
};

const problemIcons: Record<string, React.ReactNode> = {
  Thermometer: <Thermometer className="h-6 w-6" />,
  Droplets: <Droplets className="h-6 w-6" />,
  Wind: <Wind className="h-6 w-6" />,
  Volume2: <Volume2 className="h-6 w-6" />,
  PowerOff: <PowerOff className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
};

export default function ServiceACPage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-hero-gradient relative overflow-hidden py-16 sm:py-24">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(circle at 80% 50%, rgba(37,99,235,0.2) 0%, transparent 50%)"}} />
          <div className="container-page relative text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand shadow-sm backdrop-blur">
              <Thermometer className="h-4 w-4" />
              Service AC Batam
            </div>
            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              AC Bermasalah?{" "}
              <span className="text-gradient">Teknisi Kami Datang ke Rumah.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg text-slate-600">
              Cuci AC mulai Rp90.000. Teknisi terverifikasi, harga transparan, garansi pekerjaan 7 hari.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/booking?service=ac" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl sm:w-auto">
                Booking Service AC
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={getWhatsAppLink("Halo Benerin, saya mau service AC.")} target="_blank" rel="noopener noreferrer" className="w-full rounded-2xl border-2 border-green-500 bg-white px-8 py-4 text-base font-semibold text-green-700 shadow-sm transition hover:bg-green-50 sm:w-auto">
                Tanya via WhatsApp
              </a>
            </div>
            {/* Quick trust */}
            <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" />Garansi 7 hari</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-brand" />Respon 15 menit</span>
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
              {AC_PROBLEMS.map((problem) => (
                <div key={problem.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-red-200 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
                    {problemIcons[problem.icon]}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{problem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HARGA */}
        <section className="bg-slate-50 py-20">
          <div className="container-page">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">Harga Transparan</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Layanan & Harga Service AC</h2>
              <p className="mx-auto mt-4 max-w-md text-slate-500">Tidak ada biaya tersembunyi. Harga sudah termasuk jasa teknisi.</p>
            </div>
            <div className="mx-auto mt-12 max-w-2xl space-y-3">
              {AC_SERVICES.map((svc, i) => (
                <div key={svc.slug} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{svc.name}</h3>
                      {i === 0 && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Terlaris</span>}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{svc.description}</p>
                  </div>
                  <div className="ml-4 shrink-0 text-right">
                    <p className="text-xl font-extrabold text-brand">{formatRupiah(svc.price)}</p>
                    <p className="text-xs text-slate-400">mulai dari</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/booking?service=ac" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl">
                Booking Service AC
                <ArrowRight className="h-5 w-5" />
              </Link>
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
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  Service AC {area}
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
                  <summary className="cursor-pointer px-6 py-5 text-base font-semibold text-slate-900 transition group-open:text-brand">
                    {faq.q}
                  </summary>
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
              <div className="relative">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">AC Bermasalah? Jangan Ditunda.</h2>
                <p className="mx-auto mt-4 max-w-md text-lg text-blue-100">Semakin lama ditunda, semakin mahal perbaikannya.</p>
                <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/booking?service=ac" className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-brand shadow-lg sm:w-auto">
                    Booking Service AC
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href={getWhatsAppLink("Halo Benerin, AC saya bermasalah.")} target="_blank" rel="noopener noreferrer" className="w-full rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                    Chat WhatsApp
                  </a>
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
