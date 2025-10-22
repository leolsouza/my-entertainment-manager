import { Card, CardContent } from "@/components/ui/card"
import { FileX2 } from "lucide-react"

type EmptyDataProps = {
  title?: string
  description?: string
}

export default function EmptyData({
  title = "Sorry, no data available",
  description = "There are no records to display at the moment.",
}: EmptyDataProps) {
  return (
    <div className="h-full rounded-4xl border">
      <div className="flex flex-col items-center justify-center py-10">
        <Card className="max-w-sm border-none bg-transparent text-center shadow-none">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="bg-muted rounded-full p-4">
              <FileX2 className="text-muted-foreground h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
