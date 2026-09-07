import type { Metadata } from "next";
import Link from "next/link";
import {
  Thermometer,
  Droplets,
  Wind,
  Volume2,
  PowerOff,
  Zap,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WaFloat from "@/components/wa-float";
import {
  AC_SERVICES,
  AC_PROBLEMS,
  FAQ_AC,
  AREAS,
  BRAND,
  formatRupiah,
  getWhatsAppLink,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Service AC Batam — Cuci AC & Isi Freon, Teknisi Datang ke Rumah",
  description:
    "Service AC Batam terpercaya. Cuci AC mulai Rp90.000, isi freon, bongkar pasang. Teknisi terverifikasi datang ke rumah. Garansi 7 hari.",
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
        <section className="bg-gradient-to-b from-brand-light/40 to-white py-14 sm:py-20">
          <div className="container-page text-center">
            <p className="text-sm font-semibold tracking-wide text-brand">
              Service AC Batam
            </p>
            <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              AC Bermasalah? Teknisi Kami Datang ke Rumah.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-slate-600">
              Cuci AC mulai Rp90.000. Teknisi terverifikasi, harga transparan,
              garansi pekerjaan 7 hari. Seluruh area Batam.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/booking?service=ac"
                className="w-full rounded-xl bg-brand px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-brand-dark sm:w-auto"
              >
                Booking Service AC
              </Link>
              <a
                href={getWhatsAppLink(
                  "Halo Benerin, saya mau service AC. Bisa bantu?"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border-2 border-green-600 px-8 py-3.5 text-base font-semibold text-green-700 transition hover:bg-green-50 sm:w-auto"
              >
                Tanya via WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* MASALAH UMUM */}
        <section className="py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Masalah AC yang Sering Terjadi
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {AC_PROBLEMS.map((problem) => (
                <div
                  key={problem.title}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                    {problemIcons[problem.icon]}
                  </div>
                  <h3 className="mt-3 font-semibold text-slate-900">
                    {problem.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DAFTAR LAYANAN + HARGA */}
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Layanan & Harga Service AC
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-slate-500">
              Harga transparan, tidak ada biaya tersembunyi.
            </p>
            <div className="mx-auto mt-10 max-w-2xl space-y-3">
              {AC_SERVICES.map((svc) => (
                <div
                  key={svc.slug}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">{svc.name}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">
                      {svc.description}
                    </p>
                  </div>
                  <div className="ml-4 shrink-0 text-right">
                    <p className="text-lg font-bold text-brand">
                      {formatRupiah(svc.price)}
                    </p>
                    <p className="text-xs text-slate-400">mulai dari</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/booking?service=ac"
                className="inline-block rounded-xl bg-brand px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-brand-dark"
              >
                Booking Service AC
              </Link>
            </div>
          </div>
        </section>

        {/* AREA */}
        <section className="py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Area Service AC
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-slate-500">
              Teknisi kami melayani service AC di seluruh area Batam.
            </p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
              {AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  Service AC {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <div className="mx-auto mt-10 max-w-2xl space-y-4">
              {FAQ_AC.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-slate-200 bg-white"
                >
                  <summary className="cursor-pointer px-5 py-4 font-medium text-slate-900">
                    {faq.q}
                  </summary>
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-500">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container-page">
            <div className="rounded-3xl bg-brand px-6 py-12 text-center sm:px-12">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                AC Bermasalah? Jangan Ditunda.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-blue-100">
                Semakin lama ditunda, semakin mahal perbaikannya. Booking
                sekarang, teknisi datang hari ini.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/booking?service=ac"
                  className="w-full rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand shadow sm:w-auto"
                >
                  Booking Service AC
                </Link>
                <a
                  href={getWhatsAppLink(
                    "Halo Benerin, AC saya bermasalah. Bisa kirim teknisi?"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl border-2 border-white/50 px-8 py-3.5 text-base font-semibold text-white sm:w-auto"
                >
                  Chat WhatsApp
                </a>
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
