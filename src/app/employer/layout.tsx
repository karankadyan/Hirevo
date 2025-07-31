import {ReactNode, Suspense} from "react";
import {SidebarGroup, SidebarGroupAction, SidebarGroupLabel} from "@/components/ui/sidebar";
import {SidebarUserButton} from "@/features/users/components/SidebarUserButton";
import {AppSidebar} from "@/components/sidebar/AppSidebar";
import {SidebarNavMenuGroup} from "@/components/sidebar/SidebarNavMenuGroup";
import {ClipboardListIcon, PlusIcon} from "lucide-react";
import Link from "next/link";
import {SidebarOrganizationButton} from "@/features/organizations/components/SidebarOrganizationButton";
import {redirect} from "next/navigation";
import {getCurrentOrganization} from "@/services/clerk/lib/getCurrentAuth";

export default function EmployerLayout({ children }: { children: ReactNode }) {
    return (
        <Suspense>
            <LayoutSuspense>{children}</LayoutSuspense>
        </Suspense>
    )
}

async function LayoutSuspense({children}: { children: ReactNode }) {
    const { orgId } = await getCurrentOrganization()
    if (orgId == null) return redirect("/organizations/select")

    return (
        <AppSidebar content={
            <>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-light">
                        Job Listings
                    </SidebarGroupLabel>
                    <SidebarGroupAction title="Add Job Listing" asChild>
                        <Link href="/employer/job-listings/new">
                            <PlusIcon /> <span className="sr-only">Add Job Listing</span>
                        </Link>
                    </SidebarGroupAction>
                </SidebarGroup>

                <SidebarNavMenuGroup
                    className="mt-auto font-light"
                    items={[
                        {href: "/", icon: <ClipboardListIcon/>, label: "Job Board"},
                    ]}
                />
            </>
        } footerButton={
            <SidebarOrganizationButton/>
        }>
            {
                children
            }
        </AppSidebar>
    )
        ;
}