"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AREAS } from "@/lib/constants";
import { Plus, X, Star, MessageCircle } from "lucide-react";
import type { Vendor } from "@/lib/types";

const CATEGORIES = [
  { id: "ac", label: "Service AC" },
  { id: "elektronik", label: "Elektronik" },
  { id: "cleaning", label: "Cleaning" },
  { id: "listrik", label: "Listrik" },
  { id: "plumbing", label: "Plumbing" },
];

const emptyForm = {
  name: "",
  phone: "",
  address: "",
  areas: [] as string[],
  categories: [] as string[],
  bank_name: "",
  bank_account: "",
  bank_holder: "",
  notes: "",
};

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    const { data } = await supabase
      .from("vendors")
      .select("*")
      .order("score", { ascending: false });
    if (data) setVendors(data as Vendor[]);
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("vendors").insert({
      name: form.name,
      phone: form.phone.replace(/\D/g, ""),
      address: form.address || null,
      areas: form.areas,
      categories: form.categories,
      bank_name: form.bank_name || null,
      bank_account: form.bank_account || null,
      bank_holder: form.bank_holder || null,
      notes: form.notes || null,
    });

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      setShowForm(false);
      setForm(emptyForm);
      fetchVendors();
    }
    setSaving(false);
  }

  async function toggleActive(id: string, currentlyActive: boolean) {
    await supabase
      .from("vendors")
      .update({ is_active: !currentlyActive })
      .eq("id", id);
    fetchVendors();
  }

  function toggleArrayItem(field: "areas" | "categories", value: string) {
    setForm((f) => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter((v) => v !== value)
        : [...f[field], value],
    }));
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{vendors.length} vendor terdaftar</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Batal" : "Tambah Vendor"}
        </button>
      </div>

      {/* Add vendor form */}
      {showForm && (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Nama *
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
                placeholder="Nama teknisi/vendor"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Nomor WA *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Alamat
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Kategori Layanan *
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleArrayItem("categories", cat.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    form.categories.includes(cat.id)
                      ? "bg-brand text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Areas */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">
              Area Kerja *
            </label>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArrayItem("areas", area)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    form.areas.includes(area)
                      ? "bg-brand text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Bank */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Bank
              </label>
              <input
                type="text"
                value={form.bank_name}
                onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
                placeholder="BCA, BNI, dll"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                No. Rekening
              </label>
              <input
                type="text"
                value={form.bank_account}
                onChange={(e) =>
                  setForm({ ...form, bank_account: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">
                Atas Nama
              </label>
              <input
                type="text"
                value={form.bank_holder}
                onChange={(e) =>
                  setForm({ ...form, bank_holder: e.target.value })
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">
              Catatan
            </label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              placeholder="Catatan internal tentang vendor ini"
            />
          </div>

          <button
            type="submit"
            disabled={saving || form.categories.length === 0 || form.areas.length === 0}
            className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan Vendor"}
          </button>
        </form>
      )}

      {/* Vendor list */}
      <div className="space-y-2">
        {vendors.map((v) => (
          <div
            key={v.id}
            className={`rounded-xl border bg-white p-4 ${
              v.is_active ? "border-slate-200" : "border-red-200 bg-red-50/50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{v.name}</h3>
                  {v.is_verified && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Verified
                    </span>
                  )}
                  {!v.is_active && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                      Non-aktif
                    </span>
                  )}
                </div>
                <a
                  href={`https://wa.me/${v.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-green-600 hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {v.phone}
                </a>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {v.categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                    >
                      {cat}
                    </span>
                  ))}
                  {v.areas.map((area) => (
                    <span
                      key={area}
                      className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{v.score}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">
                  {v.total_jobs} jobs
                </p>
                <button
                  onClick={() => toggleActive(v.id, v.is_active)}
                  className={`mt-2 rounded px-3 py-1 text-xs font-medium ${
                    v.is_active
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {v.is_active ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {vendors.length === 0 && !showForm && (
        <div className="py-16 text-center">
          <p className="text-slate-400">Belum ada vendor terdaftar.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white"
          >
            Tambah Vendor Pertama
          </button>
        </div>
      )}
    </div>
  );
}
