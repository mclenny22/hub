"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { IconSearch } from "@tabler/icons-react"
import data from "./data.json"

const categories = [
  { value: "shotsBrewed", label: "Shots Brewed" },
  { value: "cupsBrewed", label: "Cups Brewed" },
  { value: "beansGround", label: "Beans Ground" },
  { value: "milkUsed", label: "Milk Used" },
  { value: "plasticSaved", label: "Plastic Saved" },
  { value: "moneySaved", label: "Money Saved" },
]

export default function LeaderboardsPage() {
  const [category, setCategory] = useState(categories[0].value)
  const [search, setSearch] = useState("")
  const isMobile = useIsMobile()

  // Filter and sort data
  const filtered = data
    .filter(row => row.username.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b[category as keyof typeof b] as number) - (a[category as keyof typeof a] as number))
    .map((row, idx) => ({ ...row, rank: idx + 1 }))

  const categoryLabel = categories.find(c => c.value === category)?.label || "Value"

  function renderValue(row: any, category: string) {
    if (category === "moneySaved") return `$${(row[category] as number).toLocaleString()}`
    if (category === "plasticSaved") return `${row[category]} Bottles`
    if (category === "milkUsed") return `${(row[category] as number).toLocaleString()} ml`
    if (category === "beansGround") return `${(row[category] as number).toLocaleString()} g`
    return (row[category] as number).toLocaleString()
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
        <SiteHeader title="Leaderboards" />
        <div className="flex flex-1 flex-col items-center justify-start p-8">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col items-start flex-1 mb-2">
              <h1 className="text-3xl font-bold mb-2 text-left">TK-02 Leaderboards</h1>
              <p className="text-left max-w-xl">
                Welcome to the Terra Kaffe Leaderboards!
                <br />
                Select a category tab to see the top users.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full items-end sm:items-center justify-between gap-2">
              {isMobile ? (
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full sm:w-auto min-w-[120px]">
                    <SelectValue>{categories.find(c => c.value === category)?.label}</SelectValue>
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
              <div className="relative w-full sm:w-auto max-w-xs mt-2 sm:mt-0">
                <Input
                  className="pl-10"
                  placeholder="Search username..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={20} />
              </div>
            </div>
            <div style={{ height: 20 }} />
          </div>
          <div className="w-full overflow-x-auto max-w-full">
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
      </SidebarInset>
    </SidebarProvider>
  )
} 