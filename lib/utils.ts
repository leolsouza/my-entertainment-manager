import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function unixTimestampToDate(unixTimestamp: number): Date {
  const date = new Date(unixTimestamp * 1000) 
  return date
}

export function resetPage(params: URLSearchParams):void{
  params.delete("page")
}

