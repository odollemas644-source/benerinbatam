"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Wrench } from "lucide-react";
import { BRAND, getWhatsAppLink } from "@/lib/constants";

const navLinks = [
  { href: "/service-ac", label: "Service AC" },
  { href: "/booking", label: "Booking" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getWhatsAppLink("Halo Benerin, saya mau tanya tentang layanan service.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            WhatsApp
          </a>
          <Link
            href="/booking"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Booking Sekarang
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-slate-700"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <a
              href={getWhatsAppLink("Halo Benerin, saya mau tanya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-green-600 py-2.5 text-center text-sm font-semibold text-white"
            >
              Chat WhatsApp
            </a>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-brand py-2.5 text-center text-sm font-semibold text-white"
            >
              Booking Sekarang
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
