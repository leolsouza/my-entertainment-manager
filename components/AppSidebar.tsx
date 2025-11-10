import { User2, EthernetPort, Book, Video } from "lucide-react"
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
} from "./ui/sidebar"
import Logo from "@/assets/logo.png"
import Link from "next/link"
import Image from "next/image"
import { User } from "@supabase/supabase-js"

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
  authUser: User
}

export default function AppSidebar({ authUser }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Image src={Logo} alt="logo" width={300} priority />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator style={{ width: "auto" }} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {favoriteRoutes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
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
            <div className="flex w-full items-center justify-start gap-1 px-2 text-sm">
              <User2 className="size-4" />
              {authUser?.email}
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="mt-2">
            <SidebarMenuButton asChild>
              <Link href="/signin">Logout</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
