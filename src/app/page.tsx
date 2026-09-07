import Link from "next/link";
import {
  Snowflake,
  Tv,
  Sparkles,
  Zap,
  Droplets,
  ChevronRight,
  Shield,
  Clock,
  BadgeCheck,
  Banknote,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WaFloat from "@/components/wa-float";
import {
  SERVICE_CATEGORIES,
  HOW_IT_WORKS,
  TRUST_POINTS,
  AREAS,
  BRAND,
  getWhatsAppLink,
  formatRupiah,
} from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Snowflake: <Snowflake className="h-7 w-7" />,
  Tv: <Tv className="h-7 w-7" />,
  Sparkles: <Sparkles className="h-7 w-7" />,
  Zap: <Zap className="h-7 w-7" />,
  Droplets: <Droplets className="h-7 w-7" />,
};

const trustIcons = [
  <BadgeCheck key="1" className="h-8 w-8 text-brand" />,
  <Banknote key="2" className="h-8 w-8 text-brand" />,
  <Shield key="3" className="h-8 w-8 text-brand" />,
  <Clock key="4" className="h-8 w-8 text-brand" />,
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-gradient-to-b from-brand-light/40 to-white py-16 sm:py-24">
          <div className="container-page text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Service Rumah & Kantor di Batam.{" "}
              <span className="text-brand">Tinggal Panggil, Beres.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
              Teknisi terverifikasi datang ke lokasi. Harga transparan, tidak ada biaya tersembunyi. Garansi pekerjaan 7 hari.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/booking" className="w-full rounded-xl bg-brand px-8 py-3.5 text-base font-semibold text-white shadow transition hover:bg-brand-dark sm:w-auto">
                Booking Sekarang
              </Link>
              <a href={getWhatsAppLink("Halo Benerin, saya mau tanya tentang layanan service.")} target="_blank" rel="noopener noreferrer" className="w-full rounded-xl border-2 border-green-600 px-8 py-3.5 text-base font-semibold text-green-700 transition hover:bg-green-50 sm:w-auto">
                Chat WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* LAYANAN */}
        <section className="py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Layanan Kami</h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-slate-500">Satu tempat untuk berbagai kebutuhan service rumah dan kantor di Batam.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_CATEGORIES.map((svc) => (
                <Link key={svc.id} href={`/${svc.slug}`} className="group relative flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-brand hover:shadow-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light text-brand">
                    {iconMap[svc.icon]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900 group-hover:text-brand">{svc.name}</h3>
                      {svc.popular && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">Populer</span>}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{svc.tagline}</p>
                    <p className="mt-2 text-sm font-medium text-brand">Mulai {formatRupiah(svc.startingPrice)}</p>
                  </div>
                  <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CARA KERJA */}
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Cara Kerja</h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-slate-500">Pesan teknisi dalam hitungan menit, tanpa repot.</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {HOW_IT_WORKS.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">{item.step}</div>
                  <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KENAPA BENERIN */}
        <section className="py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Kenapa {BRAND.name}?</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_POINTS.map((point, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-6">
                  {trustIcons[i]}
                  <h3 className="mt-4 font-semibold text-slate-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AREA */}
        <section className="bg-slate-50 py-16">
          <div className="container-page">
            <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Area Layanan</h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-slate-500">Kami melayani seluruh area di Batam.</p>
            <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
              {AREAS.map((area) => (
                <span key={area} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">{area}</span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container-page">
            <div className="rounded-3xl bg-brand px-6 py-12 text-center sm:px-12">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Punya masalah di rumah atau kantor?</h2>
              <p className="mx-auto mt-3 max-w-md text-blue-100">Hubungi kami sekarang. Teknisi datang ke lokasi, harga transparan, garansi pekerjaan.</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/booking" className="w-full rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-brand shadow transition hover:bg-blue-50 sm:w-auto">Booking Sekarang</Link>
                <a href={getWhatsAppLink("Halo Benerin, saya butuh bantuan.")} target="_blank" rel="noopener noreferrer" className="w-full rounded-xl border-2 border-white/50 px-8 py-3.5 text-base font-semibold text-white transition hover:border-white sm:w-auto">Chat WhatsApp</a>
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
