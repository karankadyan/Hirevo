"use client"

import { useIsDarkMode } from "@/hooks/useIsDarkMode"
import { Toaster as Sonner, ToasterProps } from "sonner"
import React from "react";

const Toaster = ({ ...props }: ToasterProps) => {
    const isDarkMode = useIsDarkMode()

  return (
    <Sonner theme={isDarkMode ? "dark" : "light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
