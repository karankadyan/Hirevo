import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css"
import "@mdxeditor/editor/style.css"
import React from "react";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "@/components/ui/sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Hirevo",
    description: "AI powered job platform",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
            {children}
            <Toaster/>
            </body>
            </html>
        </ClerkProvider>
    );
}
