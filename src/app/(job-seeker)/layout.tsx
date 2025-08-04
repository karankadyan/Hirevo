import {ReactNode} from "react";
import {AppSidebar} from "@/components/sidebar/AppSidebar";
import {BrainCircuitIcon, ClipboardListIcon, LayoutDashboard, LogInIcon} from "lucide-react";
import {SidebarUserButton} from "@/features/users/components/SidebarUserButton";
import {SidebarNavMenuGroup} from "@/components/sidebar/SidebarNavMenuGroup";

export default function JobSeekerLayout({
                                            children,
                                            sidebar,
                                        }: {
    children: ReactNode
    sidebar: ReactNode
}) {
    return (
        <AppSidebar content={
            <>
                <SidebarNavMenuGroup
                    className="mt-auto"
                    items={[
                        {href: "/", icon: <ClipboardListIcon/>, label: "Job Board"},
                        {href: "/ai-search", icon: <BrainCircuitIcon/>, label: "AI Search",},
                        {
                            href: "/employer",
                            icon: <LayoutDashboard/>,
                            label: "Employer Dashboard",
                            authStatus: "signedIn",
                        },
                        {href: "/sign-in", icon: <LogInIcon/>, label: "Sign In", authStatus: "signedOut",},
                    ]}
                />
                {sidebar}
            </>
        } footerButton={
            <SidebarUserButton/>
        }>
            {children}
        </AppSidebar>
    )
}