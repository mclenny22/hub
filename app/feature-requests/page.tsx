"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IconThumbUp, IconAlertCircle } from "@tabler/icons-react"

const featureRequests = [
  {
    id: "APP-22816",
    votes: 2500,
    title: "In-App Voting Access",
    description: "Enable direct access to the Ballot page inside the Terra Kaffe app.",
    status: "online",
    error: null,
  },
  {
    id: "APP-22817",
    votes: 1200,
    title: "Wake-up-Timer",
    description: "Schedule your TK-02 to turn on automatically—so your machine is ready when you are.",
    status: "online",
    error: null,
  },
  {
    id: "FW-1837",
    votes: 1100,
    title: "Additional Drink Profiles",
    description: "Add new pre-programmed drink types like cortado, lungo, or flat whites.",
    status: "online",
    error: null,
  },
  {
    id: "FW-4857",
    votes: 967,
    title: "Eco Mode",
    description: "An energy-saving mode that reduces power draw when idle.",
    status: "offline",
    error: "Your vote couldn't be recorded. Please try again.",
  },
  {
    id: "APP-8274",
    votes: 857,
    title: "Improved Cleaning Notifications",
    description: "More accurate reminders based on your actual usage, not generic cycles.",
    status: "offline",
    error: "It looks like you're offline. Check your connection and try again.",
  },
]

const shippedFeatures = [
  {
    id: "FW-2316",
    title: "Dual-User Profiles",
    description: "Allow households to save multiple personalized drink profiles.",
  },
  {
    id: "APP-7849",
    title: "Coffee Usage Tracker in App",
    description: "Visualize your bean and water consumption by week/month.",
  },
  {
    id: "FW-3625",
    title: "Favorite Drink Quick Button",
    description: "Long-press the touchscreen to instantly brew your #1 favorite drink.",
  },
]

export default function FeatureRequestsPage() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Feature Requests" />
        <div className="flex flex-1 flex-col items-center justify-start p-8">
          <Tabs defaultValue="popular" className="w-full max-w-5xl">
            <div className="flex gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
              <TabsList>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="popular">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-4">
                  {featureRequests.map((req) => (
                    <Card key={req.id} className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Badge variant="outline" className="text-xs font-mono">{req.id}</Badge>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <CardTitle className="text-lg mb-1">{req.title}</CardTitle>
                        <CardDescription>{req.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex items-center gap-2 pt-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconThumbUp className="size-4" />
                          {req.votes.toLocaleString()}
                        </Button>
                        {req.status === "offline" && (
                          <span className="flex items-center text-destructive text-xs gap-1 ml-2">
                            <IconAlertCircle className="size-4" />
                            {req.error}
                          </span>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  <Button className="mt-4 w-full max-w-xs self-center">Propose your own idea</Button>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="mb-2 font-semibold text-muted-foreground">Shipped</div>
                  {shippedFeatures.map((feature) => (
                    <Card key={feature.id} className="bg-emerald-700 text-white border-none">
                      <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Badge variant="secondary" className="text-xs font-mono bg-emerald-900 text-white border-none">{feature.id}</Badge>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <CardTitle className="text-lg mb-1 text-white">{feature.title}</CardTitle>
                        <CardDescription className="text-white/80">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recent">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-4">
                  {/* You can duplicate or change the featureRequests array for recent */}
                  {featureRequests.map((req) => (
                    <Card key={req.id} className="border shadow-sm">
                      <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Badge variant="outline" className="text-xs font-mono">{req.id}</Badge>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <CardTitle className="text-lg mb-1">{req.title}</CardTitle>
                        <CardDescription>{req.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex items-center gap-2 pt-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconThumbUp className="size-4" />
                          {req.votes.toLocaleString()}
                        </Button>
                        {req.status === "offline" && (
                          <span className="flex items-center text-destructive text-xs gap-1 ml-2">
                            <IconAlertCircle className="size-4" />
                            {req.error}
                          </span>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  <Button className="mt-4 w-full max-w-xs self-center">Propose your own idea</Button>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="mb-2 font-semibold text-muted-foreground">Shipped</div>
                  {shippedFeatures.map((feature) => (
                    <Card key={feature.id} className="bg-emerald-700 text-white border-none">
                      <CardHeader className="flex flex-row items-center gap-2 pb-2">
                        <Badge variant="secondary" className="text-xs font-mono bg-emerald-900 text-white border-none">{feature.id}</Badge>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <CardTitle className="text-lg mb-1 text-white">{feature.title}</CardTitle>
                        <CardDescription className="text-white/80">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipped">
              <div className="flex flex-col gap-4">
                {shippedFeatures.map((feature) => (
                  <Card key={feature.id} className="bg-emerald-700 text-white border-none">
                    <CardHeader className="flex flex-row items-center gap-2 pb-2">
                      <Badge variant="secondary" className="text-xs font-mono bg-emerald-900 text-white border-none">{feature.id}</Badge>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardTitle className="text-lg mb-1 text-white">{feature.title}</CardTitle>
                      <CardDescription className="text-white/80">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 