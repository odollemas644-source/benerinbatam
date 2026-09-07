"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Wrench, Phone } from "lucide-react";
import { BRAND, getWhatsAppLink } from "@/lib/constants";

const navLinks = [
  { href: "/service-ac", label: "Service AC" },
  { href: "/blog", label: "Blog" },
  { href: "/booking", label: "Booking" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-md backdrop-blur-lg" : "bg-white/80 backdrop-blur"}`}>
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-indigo-600 text-white shadow-md shadow-brand/25">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <a
              href={getWhatsAppLink("Halo Benerin, saya mau tanya tentang layanan service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border-2 border-green-500 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              <Phone className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              href="/booking"
              className="rounded-xl bg-gradient-to-r from-brand to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:shadow-lg hover:shadow-brand/30"
            >
              Booking Sekarang
            </Link>
          </div>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-4 pb-5 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={getWhatsAppLink("Halo Benerin, saya mau tanya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-500 py-3 text-sm font-semibold text-green-700"
            >
              <Phone className="h-4 w-4" />
              Chat WhatsApp
            </a>
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-gradient-to-r from-brand to-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-md"
            >
              Booking Sekarang
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
