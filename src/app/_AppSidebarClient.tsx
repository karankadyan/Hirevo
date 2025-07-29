"use client"

import React from "react";
import {useIsMobile} from "@/hooks/use-mobile";

export function AppSidebarClient({ children } : {
  children: React.ReactNode
}) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return null
    }
    return children;
}