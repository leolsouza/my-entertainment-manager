"use client"

import Image, { StaticImageData } from "next/image"
import React, { SyntheticEvent, useState } from "react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react"
import NoPosterAvailable from "@/assets/no-poster-available.jpg"
import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

type FavoriteCardActionsProps = {
  src?: string
  title?: string
  noAvailableImage?: StaticImageData
  isEditable?: boolean
  handleOpenModal: () => void
  onRemoveFavorite: () => Promise<void>
}

export default function FavoriteCardActions({
  src,
  title,
  noAvailableImage,
  handleOpenModal,
  isEditable = false,
  onRemoveFavorite,
}: FavoriteCardActionsProps) {
  const [imgSrc, setImgSrc] = useState(
    src || noAvailableImage?.src || NoPosterAvailable.src
  )

  const safeTitle = title ?? "No available"

  return (
    <Card
      className="shaflex-col relative flex h-full gap-1 overflow-hidden pt-0 pb-3"
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="left" align="start" className="w-50">
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                handleOpenModal()
              }}
              className="cursor-pointer"
            >
              {isEditable ? (
                <>
                  <Pencil className="mr-2 h-4 w-4 text-inherit" />
                  Edit
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4 text-inherit" />
                  See details
                </>
              )}
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                onRemoveFavorite()
              }}
              className="cursor-pointer text-red-600 focus:text-red-300"
            >
              <Trash className="mr-2 h-4 w-4 text-inherit" /> Remove from
              favorites
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>

      <CardFooter className="mt-auto flex h-14 items-center justify-center px-2 text-center font-medium">
        <span className="line-clamp-2 w-full text-ellipsis">{safeTitle}</span>
      </CardFooter>
    </Card>
  )
}
