"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import news from "../news.json"
import { useParams, notFound } from "next/navigation"

export default function ArticlePage() {
  const params = useParams();
  const articleId = Array.isArray(params.articleId) ? params.articleId[0] : params.articleId;
  const article = news.find((a) => a.id === articleId);

  if (!article) return notFound();

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="News" />
        <div className="flex flex-1 flex-col items-center justify-start p-8">
          <Card className="w-full max-w-[900px] mb-8 overflow-hidden p-0">
            <Image src={article.heroImage || "/news/placeholder.jpg"} alt={article.title || "Article Hero"} width={900} height={350} className="w-full h-[350px] max-w-full object-cover" />
          </Card>
          <div className="flex flex-col items-center w-full">
            <div className="prose prose-lg text-left w-full max-w-[800px]">
              <div className="max-w-[600px] mx-auto">
                <h1 className="font-bold text-3xl mb-4 text-center">{article.title}</h1>
                <div className="mb-4 text-xs text-muted-foreground text-center">{new Date(article.date).toLocaleDateString()} • {article.author}</div>
              </div>
              {article.content.map((block, idx) => {
                if (block.type === "section") {
                  return <div key={idx} className="max-w-[600px] mx-auto"><h2 className="text-xl font-semibold mt-8 mb-2 text-left">{block.value}</h2></div>;
                } else if (block.type === "text") {
                  return <div key={idx} className="max-w-[600px] mx-auto"><p className="mb-6">{block.value}</p></div>;
                } else if (block.type === "code") {
                  return (
                    <pre key={idx} className="mb-6 rounded-lg bg-zinc-900 text-white text-left overflow-x-auto p-4 text-sm w-full max-w-[800px] mx-auto">
                      <code className={`language-${block.language || "js"}`}>{block.value}</code>
                    </pre>
                  );
                } else {
                  return (
                    <div key={idx} className="w-full max-w-[800px] mx-auto">
                      <Image
                        src={block.src || "/news/placeholder.jpg"}
                        alt={block.alt || ""}
                        width={800}
                        height={400}
                        className="w-full rounded-lg my-8 object-cover"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 