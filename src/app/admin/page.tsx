"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ORDER_STATUS_MAP, formatRupiah } from "@/lib/constants";
import {
  ClipboardList,
  TrendingUp,
  Users,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import type { Order } from "@/lib/types";

interface Stats {
  totalOrders: number;
  newOrders: number;
  totalRevenue: number;
  totalMargin: number;
  totalCustomers: number;
  totalVendors: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    newOrders: 0,
    totalRevenue: 0,
    totalMargin: 0,
    totalCustomers: 0,
    totalVendors: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Orders
      const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      // Customers count
      const { count: customerCount } = await supabase
        .from("customers")
        .select("*", { count: "exact", head: true });

      // Vendors count
      const { count: vendorCount } = await supabase
        .from("vendors")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      if (orders) {
        const totalRevenue = orders.reduce(
          (sum, o) => sum + (o.customer_price || 0),
          0
        );
        const totalMargin = orders.reduce(
          (sum, o) => sum + (o.margin || 0),
          0
        );
        const newOrders = orders.filter((o) => o.status === "new").length;

        setStats({
          totalOrders: orders.length,
          newOrders,
          totalRevenue,
          totalMargin,
          totalCustomers: customerCount || 0,
          totalVendors: vendorCount || 0,
        });
        setRecentOrders(orders.slice(0, 10) as Order[]);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      </div>
    );
  }

  const statCards = [
    {
      label: "Order Baru",
      value: stats.newOrders,
      icon: ClipboardList,
      color: "text-blue-600 bg-blue-50",
      alert: stats.newOrders > 0,
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: ClipboardList,
      color: "text-slate-600 bg-slate-100",
    },
    {
      label: "Revenue",
      value: formatRupiah(stats.totalRevenue),
      icon: TrendingUp,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Gross Margin",
      value: formatRupiah(stats.totalMargin),
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Vendors Aktif",
      value: stats.totalVendors,
      icon: Users,
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border bg-white p-5 ${
              card.alert ? "border-blue-300 ring-2 ring-blue-100" : "border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                {card.label}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.color}`}
              >
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Order Terbaru</h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
          >
            Lihat semua <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-400">
            Belum ada order.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs font-medium text-slate-500">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Layanan</th>
                  <th className="px-5 py-3">Area</th>
                  <th className="px-5 py-3">Harga</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const status = ORDER_STATUS_MAP[order.status] || {
                    label: order.status,
                    color: "bg-gray-100 text-gray-800",
                  };
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-slate-50 transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/orders?id=${order.id}`}
                          className="font-medium text-brand hover:underline"
                        >
                          {order.order_number}
                        </Link>
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-medium text-slate-900">
                          {order.customer_name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {order.customer_phone}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {order.service_name}
                        {order.quantity > 1 && (
                          <span className="text-slate-400">
                            {" "}
                            ×{order.quantity}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-slate-600">{order.area}</td>
                      <td className="px-5 py-3 font-medium text-slate-900">
                        {formatRupiah(order.customer_price)}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-400">
                        {new Date(order.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>
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
