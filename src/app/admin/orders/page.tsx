"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ORDER_STATUS_MAP, formatRupiah, getWhatsAppLink } from "@/lib/constants";
import { ExternalLink, MessageCircle } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = [
  "new",
  "confirmed",
  "assigned",
  "in_progress",
  "completed",
  "paid",
  "closed",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [vendors, setVendors] = useState<{ id: string; name: string; phone: string }[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchVendors();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*, vendors(name, phone)")
      .order("created_at", { ascending: false });

    if (data) {
      const mapped = data.map((o: Record<string, unknown>) => ({
        ...o,
        vendor_name: (o.vendors as Record<string, string> | null)?.name ?? null,
        vendor_phone: (o.vendors as Record<string, string> | null)?.phone ?? null,
      }));
      setOrders(mapped as Order[]);
    }
    setLoading(false);
  }

  async function fetchVendors() {
    const { data } = await supabase
      .from("vendors")
      .select("id, name, phone")
      .eq("is_active", true)
      .order("score", { ascending: false });
    if (data) setVendors(data);
  }

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
    }
  }

  async function assignVendor(orderId: string, vendorId: string) {
    await supabase
      .from("orders")
      .update({ vendor_id: vendorId, status: "assigned" })
      .eq("id", orderId);
    fetchOrders();
  }

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
            filter === "all"
              ? "bg-brand text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Semua ({orders.length})
        </button>
        {STATUSES.map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          if (count === 0) return null;
          const info = ORDER_STATUS_MAP[s];
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                filter === s
                  ? "bg-brand text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {info.label} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Order list */}
        <div className="space-y-2 lg:col-span-2">
          {filteredOrders.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">
              Tidak ada order.
            </p>
          ) : (
            filteredOrders.map((order) => {
              const status = ORDER_STATUS_MAP[order.status];
              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`w-full rounded-xl border bg-white p-4 text-left transition hover:shadow-sm ${
                    selectedOrder?.id === order.id
                      ? "border-brand ring-2 ring-brand/20"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {order.order_number}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">
                        {order.customer_name} — {order.service_name}
                        {order.quantity > 1 && ` ×${order.quantity}`}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {order.area} ·{" "}
                        {order.preferred_date &&
                          new Date(order.preferred_date).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "short" }
                          )}{" "}
                        {order.preferred_time}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-slate-900">
                      {formatRupiah(order.customer_price)}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Order detail panel */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <div className="sticky top-20 space-y-4 rounded-xl border border-slate-200 bg-white p-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedOrder.order_number}
                </h3>
                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                    ORDER_STATUS_MAP[selectedOrder.status].color
                  }`}
                >
                  {ORDER_STATUS_MAP[selectedOrder.status].label}
                </span>
              </div>

              {/* Customer */}
              <div>
                <h4 className="text-xs font-medium text-slate-400">Customer</h4>
                <p className="font-medium text-slate-900">
                  {selectedOrder.customer_name}
                </p>
                <a
                  href={`https://wa.me/${selectedOrder.customer_phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-green-600 hover:underline"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {selectedOrder.customer_phone}
                </a>
              </div>

              {/* Service */}
              <div>
                <h4 className="text-xs font-medium text-slate-400">Layanan</h4>
                <p className="text-slate-900">
                  {selectedOrder.service_name} ×{selectedOrder.quantity}
                </p>
              </div>

              {/* Location */}
              <div>
                <h4 className="text-xs font-medium text-slate-400">Lokasi</h4>
                <p className="text-slate-900">{selectedOrder.area}</p>
                <p className="text-sm text-slate-500">
                  {selectedOrder.address}
                </p>
              </div>

              {/* Schedule */}
              <div>
                <h4 className="text-xs font-medium text-slate-400">Jadwal</h4>
                <p className="text-slate-900">
                  {selectedOrder.preferred_date
                    ? new Date(selectedOrder.preferred_date).toLocaleDateString(
                        "id-ID",
                        { weekday: "long", day: "numeric", month: "long" }
                      )
                    : "-"}{" "}
                  · {selectedOrder.preferred_time || "-"}
                </p>
              </div>

              {/* Deskripsi */}
              {selectedOrder.description && (
                <div>
                  <h4 className="text-xs font-medium text-slate-400">
                    Deskripsi Masalah
                  </h4>
                  <p className="text-sm text-slate-600">
                    {selectedOrder.description}
                  </p>
                </div>
              )}

              {/* Pricing */}
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Harga customer</span>
                  <span className="font-medium">
                    {formatRupiah(selectedOrder.customer_price)}
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-slate-500">Fee vendor</span>
                  <span>{formatRupiah(selectedOrder.vendor_fee)}</span>
                </div>
                <div className="mt-1 flex justify-between border-t border-slate-200 pt-1 text-sm font-semibold">
                  <span className="text-green-700">Margin</span>
                  <span className="text-green-700">
                    {formatRupiah(selectedOrder.margin)}
                  </span>
                </div>
              </div>

              {/* Assign Vendor */}
              {(selectedOrder.status === "new" ||
                selectedOrder.status === "confirmed") && (
                <div>
                  <h4 className="mb-1 text-xs font-medium text-slate-400">
                    Assign Vendor
                  </h4>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        assignVendor(selectedOrder.id, e.target.value);
                      }
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    defaultValue=""
                  >
                    <option value="">— Pilih vendor —</option>
                    {vendors.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.phone})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Vendor info */}
              {selectedOrder.vendor_name && (
                <div>
                  <h4 className="text-xs font-medium text-slate-400">Vendor</h4>
                  <p className="font-medium text-slate-900">
                    {selectedOrder.vendor_name}
                  </p>
                  {selectedOrder.vendor_phone && (
                    <a
                      href={`https://wa.me/${selectedOrder.vendor_phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-green-600 hover:underline"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {selectedOrder.vendor_phone}
                    </a>
                  )}
                </div>
              )}

              {/* Update Status */}
              <div>
                <h4 className="mb-1 text-xs font-medium text-slate-400">
                  Update Status
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => {
                    const info = ORDER_STATUS_MAP[s];
                    const isActive = selectedOrder.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() =>
                          updateOrderStatus(selectedOrder.id, s)
                        }
                        disabled={isActive}
                        className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                          isActive
                            ? "bg-brand text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {info.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timestamps */}
              <p className="text-xs text-slate-400">
                Dibuat:{" "}
                {new Date(selectedOrder.created_at).toLocaleString("id-ID")}
              </p>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-400">
              Klik order untuk melihat detail
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
