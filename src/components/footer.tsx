import Link from "next/link";
import { Wrench, MapPin, Phone, AtSign } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-indigo-500 text-white">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-lg font-extrabold text-white">{BRAND.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Platform jasa service rumah dan kantor terpercaya di Batam. {BRAND.tagline}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Layanan</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/service-ac" className="transition hover:text-white">Service AC</Link></li>
              <li><Link href="/booking?category=elektronik" className="transition hover:text-white">Service Elektronik</Link></li>
              <li><Link href="/booking?category=cleaning" className="transition hover:text-white">Cleaning Service</Link></li>
              <li><Link href="/booking?category=listrik" className="transition hover:text-white">Jasa Listrik</Link></li>
              <li><Link href="/booking?category=plumbing" className="transition hover:text-white">Plumbing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Area Layanan</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand" />Batam Center</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand" />Nagoya</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand" />Lubuk Baja</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand" />Bengkong</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-brand" />Sekupang & lainnya</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                WhatsApp
              </li>
              <li className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/10">
                  <AtSign className="h-4 w-4 text-pink-400" />
                </div>
                {BRAND.instagram}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-700/50 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {BRAND.name}. Seluruh hak dilindungi.</p>
          <p className="text-xs text-slate-500">Batam, Kepulauan Riau, Indonesia 🇮🇩</p>
        </div>
      </div>
    </footer>
  );
}
