"use client"

import * as React from "react"
import {
    BookOpen,
    Bot,
    Frame,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { TeamSwitcher } from "./team-switcher"
import { trpc } from "@/app/_trpc/client"
import { Skeleton } from "./ui/skeleton"
import { useRouter } from "next/navigation"

// This is sample data.
const sample_data = {
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    // eslint-disable-next-line
    const { data, isLoading, isError, refetch } = trpc.workspaceRouter.getAllUserWorkspaces.useQuery();

    const { isLoaded, user } = useUser();

    const router = useRouter();

    if (isError || data?.code == 404) {
        router.push("/registration");
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                {isLoading ? <Skeleton className='h-[45px] w-full bg-gray-600 rounded-md' /> :
                    <TeamSwitcher teams={data?.data as { name: string, id: number }[] || []} />
                }

            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sample_data.navMain} />
                <NavProjects projects={sample_data.projects} />
            </SidebarContent>
            <SidebarFooter>
                {isLoaded && <NavUser user={{ name: user?.firstName + " " + user?.lastName, email: user?.emailAddresses.toString() || "", avatar: user?.imageUrl.toString() || ((user?.firstName?.[0] || "C") + (user?.lastName?.[0] || "N")) }} />}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
