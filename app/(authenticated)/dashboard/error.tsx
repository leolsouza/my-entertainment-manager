"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TriangleAlert } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  return (
    <div className="h-full rounded-4xl border">
      <div className="flex flex-col items-center justify-center py-10">
        <Card className="max-w-sm border-none bg-transparent text-center shadow-none">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="bg-muted rounded-full p-4">
              <TriangleAlert className="text-muted-foreground h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                Something went wrong
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                We couldn&apos;t load this page. It may be a temporary issue
                with an external service.
              </p>
            </div>
            <Button
              onClick={() => {
                router.refresh()
                reset()
              }}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
