"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardList, Users, Wrench, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
  { href: "/admin/vendors", label: "Vendors", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") setAuthed(true);
    setChecking(false);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "benerin2026")) {
      sessionStorage.setItem("admin_auth", "true"); setAuthed(true);
    } else { alert("Password salah"); }
  }

  if (checking) return <div className="flex h-screen items-center justify-center bg-slate-100"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" /></div>;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-indigo-600 text-white shadow-lg shadow-brand/25">
              <Wrench className="h-7 w-7" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900">Benerin Admin</span>
            <p className="text-sm text-slate-500">Masuk untuk mengelola orders</p>
          </div>
          <input type="password" placeholder="Password admin" value={password} onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border border-slate-300 px-4 py-3.5 text-sm transition focus:border-brand focus:ring-4 focus:ring-brand/10 focus:outline-none" autoFocus />
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-brand to-indigo-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:shadow-lg">
            Masuk
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white shadow-xl transition-transform lg:static lg:shadow-none lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-indigo-600 text-white">
              <Wrench className="h-4 w-4" />
            </div>
            <span className="text-lg font-extrabold text-slate-900">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="h-5 w-5 text-slate-400" /></button>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active ? "bg-gradient-to-r from-brand-light to-indigo-50 font-semibold text-brand" : "text-slate-600 hover:bg-slate-50"}`}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-slate-100 p-4">
          <button onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
            <LogOut className="h-5 w-5" />Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 shadow-sm lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="mr-4 rounded-lg p-1 transition hover:bg-slate-100 lg:hidden">
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">
            {navItems.find((n) => pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href)))?.label ?? "Admin"}
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
