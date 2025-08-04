import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";
import {SignedIn} from "@/services/clerk/components/SignedInStatus";
import {AppSidebarClient} from "@/components/sidebar/_AppSidebarClient";
import {ReactNode} from "react";

export function AppSidebar({
                               children,
                               content,
                               footerButton,
                           }: {
    children: ReactNode
    content: ReactNode
    footerButton: ReactNode
}) {
    return (
        <SidebarProvider className="overflow-y-hidden">
            <AppSidebarClient>
                <Sidebar collapsible="icon" className="overflow-hidden">
                    <SidebarHeader className="flex-row">
                        <SidebarTrigger/>
                        <span className="mt-0.5 text-xl text-nowrap tracking-wider font-bold">Hirevo</span>
                    </SidebarHeader>

                    <SidebarContent>
                        {content}
                    </SidebarContent>

                    <SignedIn>
                        <SidebarFooter>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    {footerButton}
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarFooter>
                    </SignedIn>
                </Sidebar>
                <main className="flex-1">{children}</main>
            </AppSidebarClient>
        </SidebarProvider>
    )
}