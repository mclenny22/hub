import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 gap-y-4 px-4 lg:px-6 sm:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Total shots Brewed</CardDescription>
          <CardTitle className="text-3xl font-bold">1,267,364</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingUp className="size-4" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Active Requests</CardDescription>
          <CardTitle className="text-3xl font-bold">36</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingDown className="size-4" />
              -6%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Top Brewer’s Shots</CardDescription>
          <CardTitle className="text-3xl font-bold">926</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingUp className="size-4" />
              +21.3%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Total Money Saved</CardDescription>
          <CardTitle className="text-3xl font-bold">$1,200,000</CardTitle>
          <CardAction>
            <Badge variant="outline" className="gap-1">
              <IconTrendingUp className="size-4" />
              +1.3%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}
