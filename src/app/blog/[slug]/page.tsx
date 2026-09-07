import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WaFloat from "@/components/wa-float";
import { ARTICLES } from "@/lib/articles";
import { ARTICLE_CONTENT } from "@/lib/article-content";
import { getWhatsAppLink } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: { title: article.title, description: article.description, type: "article", locale: "id_ID" },
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={i} className="mt-10 mb-4 text-2xl font-extrabold text-slate-900">{trimmed.replace("## ", "")}</h2>);
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      elements.push(<p key={i} className="mt-4 mb-1 font-bold text-slate-800">{trimmed.replace(/\*\*/g, "")}</p>);
    } else {
      elements.push(<p key={i} className="mt-4 leading-relaxed text-slate-600">{trimmed}</p>);
    }
  });
  return elements;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  const content = ARTICLE_CONTENT[slug];
  if (!article || !content) return notFound();

  const otherArticles = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <article className="py-12">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:underline">
                <ArrowLeft className="h-4 w-4" />Semua Artikel
              </Link>

              <div className="mt-6">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="rounded-full bg-brand-light px-2.5 py-1 font-semibold text-brand">{article.category}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                  <span>{new Date(article.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">{article.title}</h1>
                <p className="mt-4 text-lg text-slate-500">{article.description}</p>
              </div>

              <hr className="my-8 border-slate-200" />

              <div>{renderContent(content)}</div>

              {/* CTA */}
              <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand to-indigo-600 p-8 text-center shadow-lg">
                <h3 className="text-xl font-bold text-white">Butuh Service di Batam?</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-blue-100">Konsultasi gratis. Teknisi terverifikasi datang ke rumah.</p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a href={getWhatsAppLink("Halo Benerin, saya baca artikel di website. Mau tanya tentang service.")} target="_blank" rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 sm:w-auto">
                    <MessageCircle className="h-4 w-4" />Hubungi WhatsApp
                  </a>
                  <Link href="/booking" className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand sm:w-auto">Booking Online</Link>
                </div>
              </div>

              {/* Related */}
              {otherArticles.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-xl font-bold text-slate-900">Artikel Lainnya</h3>
                  <div className="mt-6 space-y-4">
                    {otherArticles.map((a) => (
                      <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand/30 hover:shadow-md">
                        <div>
                          <h4 className="font-semibold text-slate-900 group-hover:text-brand">{a.title}</h4>
                          <p className="mt-1 text-sm text-slate-500">{a.readTime}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 group-hover:text-brand" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
      <WaFloat />
    </>
  );
}
