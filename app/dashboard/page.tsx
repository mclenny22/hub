"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import leaderboardData from "../leaderboards/data.json"
import news from "../news/news.json"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type LeaderboardRow = {
  username: string;
  shotsBrewed: number;
  cupsBrewed: number;
  beansGround: number;
  milkUsed: number;
  plasticSaved: number;
  moneySaved: number;
};

const categories = [
  { value: "shotsBrewed", label: "Shots Brewed" },
  { value: "cupsBrewed", label: "Cups Brewed" },
  { value: "beansGround", label: "Beans Ground" },
  { value: "milkUsed", label: "Milk Used" },
  { value: "plasticSaved", label: "Plastic Saved" },
  { value: "moneySaved", label: "Money Saved" },
]

export default function Page() {
  const [category, setCategory] = useState(categories[0].value)
  const [isCompact, setIsCompact] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 899px)")
    const onChange = () => setIsCompact(mql.matches)
    mql.addEventListener("change", onChange)
    setIsCompact(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // Top 10 users for selected category
  const filtered = leaderboardData
    .slice()
    .sort((a: LeaderboardRow, b: LeaderboardRow) => (b[category as keyof LeaderboardRow] as number) - (a[category as keyof LeaderboardRow] as number))
    .slice(0, 10)
    .map((row, idx) => ({ ...row, rank: idx + 1 }))

  const categoryLabel = categories.find(c => c.value === category)?.label || "Value"

  function renderValue(row: LeaderboardRow, category: string) {
    if (category === "moneySaved") return `$${(row[category as keyof LeaderboardRow] as number).toLocaleString()}`
    if (category === "plasticSaved") return `${row[category as keyof LeaderboardRow]} Bottles`
    if (category === "milkUsed") return `${(row[category as keyof LeaderboardRow] as number).toLocaleString()} ml`
    if (category === "beansGround") return `${(row[category as keyof LeaderboardRow] as number).toLocaleString()} g`
    return (row[category as keyof LeaderboardRow] as number).toLocaleString()
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                {/* Most Recent 4 Articles */}
                <div className="mb-2">
                  <div className="mb-2">
                    <h2 className="text-2xl font-semibold">Latest News</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 gap-y-4 px-0 sm:grid-cols-2 xl:grid-cols-4 w-full pb-8 pt-2">
                    {news
                      .slice()
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 4)
                      .map(article => (
                        <Card key={article.id} className="flex flex-col h-full max-h-[300px] overflow-hidden">
                          <CardHeader>
                            <CardDescription className="mb-2 text-xs">{new Date(article.date).toLocaleDateString()} • {article.author}</CardDescription>
                            <CardTitle className="text-lg mb-1">{article.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3">{article.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Button asChild variant="outline" size="sm">
                              <a href={`/news/${article.id}`}>Read more</a>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
              <div className="px-4 lg:px-6">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col sm:flex-row w-full items-end sm:items-center justify-between gap-2">
                    <div className="text-2xl font-semibold mb-2 sm:mb-0"> Top 10 Leaderboard</div>
                    {isCompact ? (
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="w-full sm:w-auto min-w-[120px]">
                          <SelectValue>{categoryLabel}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(c => (
                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Tabs value={category} onValueChange={setCategory} className="w-full sm:w-auto">
                        <TabsList className="mb-0">
                          {categories.map(c => (
                            <TabsTrigger key={c.value} value={c.value} className="min-w-[120px]">
                              {c.label}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    )}
                  </div>
                  <div className="rounded-[10px] overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">Rank</TableHead>
                          <TableHead>Username</TableHead>
                          <TableHead className="text-right">{categoryLabel}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map(row => (
                          <TableRow key={row.username} className={row.rank <= 3 ? (row.rank === 1 ? "bg-yellow-400/80" : row.rank === 2 ? "bg-gray-300/80" : "bg-amber-400/60") : "bg-muted"}>
                            <TableCell className="font-semibold">#{row.rank}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell className="text-right font-semibold">
                              {renderValue(row, category)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
