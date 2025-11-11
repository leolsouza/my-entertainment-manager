"use client"

import Image, { StaticImageData } from "next/image"
import React, {
  SyntheticEvent,
  useOptimistic,
  useState,
  useTransition,
} from "react"
import { Card, CardContent, CardFooter } from "./ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { Button } from "./ui/button"
import { Star } from "lucide-react"
import NoPosterAvailable from "@/assets/no-poster-available.jpg"
import { cn } from "@/lib/utils"

type FavoriteCardProp = {
  src?: string
  title?: string
  noAvailableImage?: StaticImageData
  isFavorite?: boolean
  onFavoriteChange: () => Promise<void>
  handleOpenModal?: () => void
}

export default function FavoriteCard<T>({
  src,
  title,
  noAvailableImage,
  isFavorite = false,
  onFavoriteChange,
  handleOpenModal,
}: FavoriteCardProp) {
  const [imgSrc, setImgSrc] = useState(
    src || noAvailableImage?.src || NoPosterAvailable.src
  )

  const safeTitle = title ?? "No available"
  return (
    <Card
      className="relative flex h-full flex-col gap-1 overflow-hidden pt-0 pb-3"
      onClick={handleOpenModal}
    >
      <CardContent className="relative aspect-[2/3] w-full p-0">
        <Image
          src={imgSrc}
          alt={safeTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          onError={() => setImgSrc(NoPosterAvailable.src)}
        />

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute top-1 right-1 rounded-full bg-black/50 text-yellow-400 transition-colors hover:bg-black/70",
                  "cursor-pointer opacity-100"
                )}
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation()
                  onFavoriteChange()
                }}
              >
                <Star
                  className={cn(
                    "h-5 w-5 transition-all",
                    isFavorite ? "fill-yellow-400" : ""
                  )}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>

      <CardFooter className="mt-auto flex h-14 items-center justify-center px-2 text-center font-medium">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="line-clamp-2 w-full cursor-default text-ellipsis">
                {safeTitle}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{safeTitle}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
