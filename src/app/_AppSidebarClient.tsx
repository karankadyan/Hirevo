"use client"

import React from "react";
import {useIsMobile} from "@/hooks/use-mobile";
import {SidebarTrigger} from "@/components/ui/sidebar";

export function AppSidebarClient({children}: {
    children: React.ReactNode
}) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <div className="flex flex-col w-full">
                <div className="p-2 border-b flex items-center gap-1">
                    <SidebarTrigger />
                    <span className="mt-0.5 text-xl tracking-wide font-light">Hirevo</span>
                </div>
                <div className="flex-1 flex">{children}</div>
            </div>
        )
    }
    return children;
}