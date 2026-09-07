"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  AC_SERVICES,
  AREAS,
  TIME_SLOTS,
  BRAND,
  formatRupiah,
  getWhatsAppLink,
} from "@/lib/constants";

function BookingFormInner() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [form, setForm] = useState({
    service_slug: "",
    name: "",
    phone: "",
    area: "",
    address: "",
    description: "",
    quantity: 1,
    preferred_date: "",
    preferred_time: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (preselectedService === "ac" && !form.service_slug) {
      setForm((f) => ({ ...f, service_slug: AC_SERVICES[0].slug }));
    }
  }, [preselectedService, form.service_slug]);

  const selectedService = AC_SERVICES.find(
    (s) => s.slug === form.service_slug
  );

  function update(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.order_number) {
        setOrderNumber(data.order_number);
        setSubmitted(true);
      } else {
        alert("Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.");
      }
    } catch {
      alert("Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            Booking Berhasil!
          </h2>
          <p className="mt-2 text-slate-600">
            Order <span className="font-semibold">{orderNumber}</span> sudah
            kami terima. Admin kami akan menghubungi Anda via WhatsApp dalam 15
            menit untuk konfirmasi jadwal dan teknisi.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={getWhatsAppLink(
                `Halo Benerin, saya baru booking order ${orderNumber}. Mohon konfirmasi.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Konfirmasi via WhatsApp
            </a>
            <Link
              href="/"
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Booking Service
        </h1>
        <p className="mt-2 text-slate-500">
          Isi form di bawah, admin kami akan menghubungi Anda dalam 15 menit.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Layanan */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Pilih Layanan *
            </label>
            <select
              required
              value={form.service_slug}
              onChange={(e) => update("service_slug", e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            >
              <option value="">— Pilih layanan —</option>
              <optgroup label="Service AC">
                {AC_SERVICES.map((svc) => (
                  <option key={svc.slug} value={svc.slug}>
                    {svc.name} — {formatRupiah(svc.price)}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Jumlah */}
          {selectedService && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Jumlah Unit
              </label>
              <select
                value={form.quantity}
                onChange={(e) => update("quantity", Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} unit
                  </option>
                ))}
              </select>
              {selectedService && (
                <p className="mt-1.5 text-sm font-medium text-brand">
                  Estimasi: {formatRupiah(selectedService.price * form.quantity)}
                </p>
              )}
            </div>
          )}

          {/* Nama */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Nama Lengkap *
            </label>
            <input
              required
              type="text"
              placeholder="Nama Anda"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Nomor WhatsApp *
            </label>
            <input
              required
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            />
          </div>

          {/* Area */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Area / Kecamatan *
            </label>
            <select
              required
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            >
              <option value="">— Pilih area —</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Alamat */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Alamat Lengkap *
            </label>
            <textarea
              required
              rows={2}
              placeholder="Nama perumahan/apartemen, blok, nomor rumah, patokan"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            />
          </div>

          {/* Deskripsi masalah */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Deskripsi Masalah
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan masalah atau kebutuhan Anda (opsional)"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
            />
          </div>

          {/* Tanggal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Tanggal *
              </label>
              <input
                required
                type="date"
                min={minDate}
                value={form.preferred_date}
                onChange={(e) => update("preferred_date", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Waktu *
              </label>
              <select
                required
                value={form.preferred_time}
                onChange={(e) => update("preferred_time", e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none"
              >
                <option value="">— Pilih —</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-base font-semibold text-white shadow transition hover:bg-brand-dark disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Booking"
            )}
          </button>

          <p className="text-center text-xs text-slate-400">
            Atau langsung{" "}
            <a
              href={getWhatsAppLink("Halo Benerin, saya mau booking service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline"
            >
              chat WhatsApp
            </a>{" "}
            untuk booking lebih cepat.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand" /></div>}>
        <BookingFormInner />
      </Suspense>
      <Footer />
    </>
  );
}
