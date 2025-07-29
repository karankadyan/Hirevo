import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";
import {AppSidebarClient} from "@/app/_AppSidebarClient";

export default function Home() {
  return (
    <SidebarProvider className="overflow-y-hidden">
        <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
            <SidebarHeader className="flex-row">
                <SidebarTrigger />
                <span className="mt-0.5 text-xl text-nowrap tracking-wide font-light">Hirevo</span>
            </SidebarHeader>
            <SidebarContent>
                SIDEBAR CONTENT
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            UserProfileButton
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <main className="flex-1">
            APPLICATIONS WILL GO HERE
        </main>
        </AppSidebarClient>
    </SidebarProvider>
  );
}
