"use client";

import {
  ChevronsUpDown,
  LogOut,
  User,
  LayoutDashboard,
  Archive,
} from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Search from "./Search";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import TagList from "./TagList";

const NavUser = () => {
   const router = useRouter();

   const { data: session, isPending } = authClient.useSession()

   if(isPending) return (
        <div className="flex justify-center items-center m-auto min-h-screen">
          <Spinner className="size-8" />
        </div>
   )

   const user = session?.user

    const handleLogout = async () => {
      await authClient.signOut({
       fetchOptions: {
         onSuccess: ()=> {
           router.push("/")
          } 
        },
      })
    }
    
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback className="rounded-lg">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                   {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 size-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {

const links = [
  {title: "Dashboard", icon: <LayoutDashboard />, href: "/dashboard"},
  {title: "Archive", icon: <Archive />, href: "/archive"},
]

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-medium">Vioset</span>
          <span className="text-xs text-muted-foreground">
          Manage All Your URL&apos;s
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <ScrollArea className="min-h-0 flex-1">

            <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
              {links.map(link => (
              <SidebarMenuButton key={link.title}>
              <a className="flex items-center gap-3" href={link.href}>
                {link.icon}
              <span>{link.title}</span>
              </a>
              </SidebarMenuButton>
              ))}
              </SidebarMenuItem>
                   
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <TagList />
  

        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
      <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

interface ApplicationShellProps {
  className?: string;
  children: React.ReactNode
}

export function ApplicationShell({ className, children }: ApplicationShellProps) {
  return (
    <SidebarProvider className={cn(className)}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 hidden data-[orientation=vertical]:h-4 md:block"
            />
          </div>
          <Search />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
          {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}