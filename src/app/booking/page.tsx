"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Shield, Clock, CreditCard, MessageCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ALL_SERVICES, SERVICE_CATEGORIES, AREAS, TIME_SLOTS, BRAND, getWhatsAppLink } from "@/lib/constants";

function BookingFormInner() {
  const searchParams = useSearchParams();
  const preCategory = searchParams.get("category") || searchParams.get("service") || "";

  const [form, setForm] = useState({
    category: preCategory, service_name: "", name: "", phone: "", area: "",
    address: "", description: "", quantity: 1, preferred_date: "", preferred_time: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const filteredServices = form.category
    ? ALL_SERVICES.filter((s) => s.category === form.category)
    : ALL_SERVICES;

  function update(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const serviceName = form.service_name || filteredServices[0]?.name || "Konsultasi";
      const categoryName = SERVICE_CATEGORIES.find(c => c.id === form.category)?.name || "Service";
      const res = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_slug: form.service_name || "konsultasi",
          name: form.name, phone: form.phone, area: form.area,
          address: form.address, description: `[${categoryName}] ${serviceName}. ${form.description}`,
          quantity: form.quantity, preferred_date: form.preferred_date, preferred_time: form.preferred_time,
        }),
      });
      const data = await res.json();
      if (data.order_number) { setOrderNumber(data.order_number); setSubmitted(true); }
      else { alert("Terjadi kesalahan. Silakan hubungi kami via WhatsApp."); }
    } catch { alert("Terjadi kesalahan. Silakan hubungi kami via WhatsApp."); }
    finally { setSubmitting(false); }
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-slate-900">Booking Berhasil!</h2>
          <p className="mt-3 text-slate-600">Order <span className="font-bold text-brand">{orderNumber}</span> sudah kami terima. Admin kami akan menghubungi Anda via WhatsApp untuk konfirmasi harga dan jadwal.</p>
          <div className="mt-8 flex flex-col gap-3">
            <a href={getWhatsAppLink(`Halo Benerin, saya baru booking order ${orderNumber}.`)} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-700">
              <MessageCircle className="h-4 w-4" />Konfirmasi via WhatsApp
            </a>
            <Link href="/" className="rounded-2xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm transition focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none";

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Booking Service</h1>
          <p className="mt-2 text-slate-500">Isi form di bawah. Kami akan hubungi Anda untuk konfirmasi harga dan jadwal.</p>
        </div>
        <div className="mt-6 flex justify-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-brand" />Konsultasi gratis</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand" />Respon cepat</span>
          <span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5 text-brand" />Bayar setelah selesai</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Kategori */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Kategori Layanan *</label>
            <select required value={form.category} onChange={(e) => { update("category", e.target.value); update("service_name", ""); }} className={inputClass}>
              <option value="">— Pilih kategori —</option>
              {SERVICE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Jenis layanan */}
          {form.category && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Jenis Layanan *</label>
              <select required value={form.service_name} onChange={(e) => update("service_name", e.target.value)} className={inputClass}>
                <option value="">— Pilih jenis —</option>
                {filteredServices.map((svc) => (
                  <option key={svc.slug} value={svc.name}>{svc.name}</option>
                ))}
                <option value="Lainnya">Lainnya (jelaskan di deskripsi)</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Nama *</label>
              <input required type="text" placeholder="Nama Anda" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">No. WhatsApp *</label>
              <input required type="tel" placeholder="08xxxxxxxxxx" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Area *</label>
            <select required value={form.area} onChange={(e) => update("area", e.target.value)} className={inputClass}>
              <option value="">— Pilih area —</option>
              {AREAS.map((area) => (<option key={area} value={area}>{area}</option>))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Alamat Lengkap *</label>
            <textarea required rows={2} placeholder="Perumahan/apartemen, blok, nomor, patokan" value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Deskripsi Masalah</label>
            <textarea rows={3} placeholder="Jelaskan masalah atau kebutuhan Anda" value={form.description} onChange={(e) => update("description", e.target.value)} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Tanggal *</label>
              <input required type="date" min={minDate} value={form.preferred_date} onChange={(e) => update("preferred_date", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Waktu *</label>
              <select required value={form.preferred_time} onChange={(e) => update("preferred_time", e.target.value)} className={inputClass}>
                <option value="">— Pilih —</option>
                {TIME_SLOTS.map((slot) => (<option key={slot} value={slot}>{slot}</option>))}
              </select>
            </div>
          </div>

          <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-indigo-600 py-4 text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl disabled:opacity-60">
            {submitting ? (<><Loader2 className="h-5 w-5 animate-spin" />Mengirim...</>) : "Kirim Booking"}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400">atau</span></div>
          </div>

          <a href={getWhatsAppLink("Halo Benerin, saya mau booking service.")} target="_blank" rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-green-500 py-3.5 text-sm font-semibold text-green-700 transition hover:bg-green-50">
            <MessageCircle className="h-4 w-4" />Booking Langsung via WhatsApp
          </a>
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
