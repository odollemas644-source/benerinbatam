"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ORDER_STATUS_MAP, formatRupiah } from "@/lib/constants";
import { ClipboardList, TrendingUp, Users, DollarSign, ChevronRight, AlertCircle } from "lucide-react";
import type { Order } from "@/lib/types";

interface Stats { totalOrders: number; newOrders: number; totalRevenue: number; totalMargin: number; totalCustomers: number; totalVendors: number; }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, newOrders: 0, totalRevenue: 0, totalMargin: 0, totalCustomers: 0, totalVendors: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    try {
      const { data: orders } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      const { count: customerCount } = await supabase.from("customers").select("*", { count: "exact", head: true });
      const { count: vendorCount } = await supabase.from("vendors").select("*", { count: "exact", head: true }).eq("is_active", true);
      if (orders) {
        setStats({
          totalOrders: orders.length,
          newOrders: orders.filter((o) => o.status === "new").length,
          totalRevenue: orders.reduce((s, o) => s + (o.customer_price || 0), 0),
          totalMargin: orders.reduce((s, o) => s + (o.margin || 0), 0),
          totalCustomers: customerCount || 0,
          totalVendors: vendorCount || 0,
        });
        setRecentOrders(orders.slice(0, 10) as Order[]);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  if (loading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" /></div>;

  const statCards = [
    { label: "Order Baru", value: stats.newOrders, icon: AlertCircle, gradient: "from-blue-500 to-indigo-600", alert: stats.newOrders > 0 },
    { label: "Total Orders", value: stats.totalOrders, icon: ClipboardList, gradient: "from-slate-500 to-slate-700" },
    { label: "Revenue", value: formatRupiah(stats.totalRevenue), icon: TrendingUp, gradient: "from-green-500 to-emerald-600" },
    { label: "Gross Margin", value: formatRupiah(stats.totalMargin), icon: DollarSign, gradient: "from-emerald-500 to-teal-600" },
    { label: "Customers", value: stats.totalCustomers, icon: Users, gradient: "from-purple-500 to-violet-600" },
    { label: "Vendors Aktif", value: stats.totalVendors, icon: Users, gradient: "from-orange-500 to-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className={`rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${card.alert ? "border-blue-300 ring-2 ring-blue-100" : "border-slate-200"}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{card.label}</span>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-md`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-bold text-slate-900">Order Terbaru</h2>
          <Link href="/admin/orders" className="flex items-center gap-1 text-sm font-semibold text-brand hover:underline">
            Lihat semua <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <ClipboardList className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-3 text-sm text-slate-400">Belum ada order.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-3.5">Order</th>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Layanan</th>
                  <th className="px-6 py-3.5">Area</th>
                  <th className="px-6 py-3.5">Harga</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const status = ORDER_STATUS_MAP[order.status] || { label: order.status, color: "bg-gray-100 text-gray-800" };
                  return (
                    <tr key={order.id} className="border-b border-slate-50 transition hover:bg-slate-50/50">
                      <td className="px-6 py-4"><Link href={`/admin/orders?id=${order.id}`} className="font-bold text-brand hover:underline">{order.order_number}</Link></td>
                      <td className="px-6 py-4"><div className="font-medium text-slate-900">{order.customer_name}</div><div className="text-xs text-slate-400">{order.customer_phone}</div></td>
                      <td className="px-6 py-4 text-slate-600">{order.service_name}{order.quantity > 1 && <span className="text-slate-400"> ×{order.quantity}</span>}</td>
                      <td className="px-6 py-4 text-slate-600">{order.area}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{formatRupiah(order.customer_price)}</td>
                      <td className="px-6 py-4"><span className={`inline-block rounded-lg px-3 py-1 text-xs font-bold ${status.color}`}>{status.label}</span></td>
                      <td className="px-6 py-4 text-slate-400">{new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
