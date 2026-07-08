"use client"

import {
  LogOut,
  EthernetPort,
  Book,
  Video,
  LayoutDashboard,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar"
import Logo from "@/assets/logo.png"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AuthUser } from "@/types/auth"
import { getInitials } from "@/utils/get-initials"

const discoverRoutes = [
  {
    title: "Movies",
    url: "/dashboard/discover/movies",
    icon: EthernetPort,
  },
  {
    title: "Series",
    url: "/dashboard/discover/series",
    icon: Video,
  },
  {
    title: "Books",
    url: "/dashboard/discover/books",
    icon: Book,
  },
]

const favoriteRoutes = [
  {
    title: "Movies",
    url: "/dashboard/favorites/movies",
    icon: EthernetPort,
  },
  {
    title: "Series",
    url: "/dashboard/favorites/series",
    icon: Video,
  },
  {
    title: "Books",
    url: "/dashboard/favorites/books",
    icon: Book,
  },
]

type AppSidebarProps = {
  authUser: AuthUser
}

export default function AppSidebar({ authUser }: AppSidebarProps) {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()
  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between gap-2 py-4">
        <Image
          src={Logo}
          alt="logo"
          width={160}
          priority
          className="h-auto w-auto max-w-[9rem] group-data-[collapsible=icon]:hidden"
        />
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarSeparator style={{ width: "auto" }} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard"}
                  tooltip="Overview"
                >
                  <Link href="/dashboard" onClick={closeOnMobile}>
                    <LayoutDashboard />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favoriteRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url} onClick={closeOnMobile}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Discover</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {discoverRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url} onClick={closeOnMobile}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator style={{ width: "auto" }} />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/settings"}
              tooltip={authUser?.name}
              size="lg"
            >
              <Link href="/dashboard/settings" onClick={closeOnMobile}>
                <span className="bg-sidebar-primary text-sidebar-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                  {getInitials(authUser?.name)}
                </span>
                <span className="truncate">{authUser?.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="text-muted-foreground"
            >
              <Link href="/signin" onClick={closeOnMobile}>
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
