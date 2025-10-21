"use client"

import Image, { StaticImageData } from "next/image"
import React, { useState } from "react"
import { Card, CardContent, CardFooter } from "./ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import NoPosterAvailable from "@/assets/no-poster-available.jpg"

type FavoriteCardProps = {
  src?: string
  title?: string
  noAvailableImage?: StaticImageData
}

export default function FavoriteCard({
  noAvailableImage,
  src,
  title,
}: FavoriteCardProps) {
  const [imgSrc, setImgSrc] = useState(
    src || noAvailableImage?.src || NoPosterAvailable.src
  )

  const safeTitle = title ?? "No available"

  return (
    <Card className="flex h-full flex-col gap-1 overflow-hidden pt-0 pb-3">
      <CardContent className="relative aspect-[2/3] w-full p-0">
        <Image
          src={imgSrc}
          alt={safeTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
          onError={() => setImgSrc(NoPosterAvailable.src)}
        />
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
