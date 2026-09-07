import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronRight, BookOpen } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WaFloat from "@/components/wa-float";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog — Tips & Panduan Service Rumah",
  description: "Tips perawatan AC, listrik, plumbing, dan panduan service rumah di Batam. Artikel bermanfaat dari Benerin.",
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-hero-gradient py-16">
          <div className="container-page text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand shadow-sm backdrop-blur">
              <BookOpen className="h-4 w-4" />
              Blog & Tips
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Tips & Panduan Service Rumah</h1>
            <p className="mx-auto mt-4 max-w-lg text-slate-600">Artikel bermanfaat seputar perawatan AC, listrik, plumbing, dan tips rumah tangga di Batam.</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-page">
            <div className="mx-auto max-w-3xl space-y-5">
              {ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full bg-brand-light px-2.5 py-1 font-semibold text-brand">{article.category}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                    <span>{new Date(article.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-slate-900 transition group-hover:text-brand">{article.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{article.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Baca selengkapnya <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
