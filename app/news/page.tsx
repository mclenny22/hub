"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import news from "./news.json"

export default function NewsPage() {
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
          <h1 className="text-3xl font-bold mb-6 text-left w-full">Latest News</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {news.map(article => (
              <Card key={article.id} className="flex flex-col h-full">
                <CardHeader>
                  <CardDescription className="mb-2 text-xs">{new Date(article.date).toLocaleDateString()} | {article.author}</CardDescription>
                  <CardTitle className="text-lg mb-1">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-xs text-muted-foreground">{article.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/news/${article.id}`}>Read Article</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 