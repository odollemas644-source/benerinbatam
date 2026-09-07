import Link from "next/link";
import { Wrench } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="container-page py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Platform jasa service rumah dan kantor terpercaya di Batam.{" "}
              {BRAND.tagline}
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              Layanan
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/service-ac" className="hover:text-brand">
                  Service AC
                </Link>
              </li>
              <li>
                <Link href="/service-elektronik" className="hover:text-brand">
                  Service Elektronik
                </Link>
              </li>
              <li>
                <Link href="/cleaning-service" className="hover:text-brand">
                  Cleaning Service
                </Link>
              </li>
              <li>
                <Link href="/jasa-listrik" className="hover:text-brand">
                  Jasa Listrik
                </Link>
              </li>
              <li>
                <Link href="/plumbing" className="hover:text-brand">
                  Plumbing
                </Link>
              </li>
            </ul>
          </div>

          {/* Area */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              Area Layanan
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Batam Center</li>
              <li>Nagoya</li>
              <li>Lubuk Baja</li>
              <li>Bengkong</li>
              <li>Sekupang & area lainnya</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              Hubungi Kami
            </h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>WhatsApp: {BRAND.phone}</li>
              <li>Instagram: {BRAND.instagram}</li>
              <li>TikTok: {BRAND.tiktok}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {BRAND.name}. Seluruh hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
