import {ReactNode, Suspense} from "react";
import {
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";
import {SidebarUserButton} from "@/features/users/components/SidebarUserButton";
import {AppSidebar} from "@/components/sidebar/AppSidebar";
import {SidebarNavMenuGroup} from "@/components/sidebar/SidebarNavMenuGroup";
import {ClipboardListIcon, PlusIcon} from "lucide-react";
import Link from "next/link";
import {SidebarOrganizationButton} from "@/features/organizations/components/SidebarOrganizationButton";
import {redirect} from "next/navigation";
import {getCurrentOrganization} from "@/services/clerk/lib/getCurrentAuth";
import {hasOrgUserPermission} from "@/services/clerk/lib/orgUserPermissions";
import {AsyncIf} from "@/components/AsyncIf";
import {sortJobListingsByStatus} from "@/features/jobListings/lib/utils";
import {JobListingStatus, JobListingTable} from "@/drizzle/schema/jobListing";
import {JobListingMenuGroup} from "@/app/employer/_JobListingMenugroup";
import {cacheTag} from "next/dist/server/use-cache/cache-tag";
import {getJobListingOrganizationTag} from "@/features/jobListings/db/cache/jobListings";
import {JobListingApplicationTable} from "@/drizzle/schema/jobListingApplication";
import {count, desc, eq} from "drizzle-orm";
import {db} from "@/drizzle/db";

export default function EmployerLayout({children}: { children: ReactNode }) {
    return (
        <Suspense>
            <LayoutSuspense>{children}</LayoutSuspense>
        </Suspense>
    )
}

async function LayoutSuspense({children}: { children: ReactNode }) {
    const {orgId} = await getCurrentOrganization()
    if (orgId == null) return redirect("/organizations/select")

    return (
        <AppSidebar content={
            <>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-light">
                        Job Listings
                    </SidebarGroupLabel>
                    <AsyncIf
                        condition={() => hasOrgUserPermission("org:job_listings:create")}
                    >
                        <SidebarGroupAction title="Add Job Listing" asChild>
                            <Link href="/employer/job-listings/new">
                                <PlusIcon/> <span className="sr-only">Add Job Listing</span>
                            </Link>
                        </SidebarGroupAction>
                    </AsyncIf>
                </SidebarGroup>

                <SidebarGroupContent className="group-data-[state=collapsed]:hidden">
                    <Suspense>
                        <JobListingMenu orgId={orgId} />
                    </Suspense>
                </SidebarGroupContent>

                <SidebarNavMenuGroup
                    className="mt-auto"
                    items={[
                        {href: "/", icon: <ClipboardListIcon/>, label: "Job Board"},
                    ]}
                />
            </>
        } footerButton={
            <SidebarOrganizationButton/>
        }>
            { children }
        </AppSidebar>
    );
}

async function JobListingMenu({ orgId }: { orgId: string }) {
    const jobListings = await getJobListings(orgId)

    if (
        jobListings.length === 0 &&
        (await hasOrgUserPermission("org:job_listings:create"))
    ) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/employer/job-listings/new">
                            <PlusIcon />
                            <span>Create your first job listing</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    return Object.entries(Object.groupBy(jobListings, j => j.status))
        .sort(([a], [b]) => {
            return sortJobListingsByStatus(
                a as JobListingStatus,
                b as JobListingStatus
            )
        })
        .map(([status, jobListings]) => (
            <JobListingMenuGroup
                key={status}
                status={status as JobListingStatus}
                jobListings={jobListings}
            />
        ))
}

async function getJobListings(orgId: string) {
    "use cache"
    cacheTag(getJobListingOrganizationTag(orgId))

    const data = await db
        .select({
            id: JobListingTable.id,
            title: JobListingTable.title,
            status: JobListingTable.status,
            applicationCount: count(JobListingApplicationTable.userId),
        })
        .from(JobListingTable)
        .where(eq(JobListingTable.organizationId, orgId))
        .leftJoin(
            JobListingApplicationTable,
            eq(JobListingTable.id, JobListingApplicationTable.jobListingId)
        )
        .groupBy(JobListingApplicationTable.jobListingId, JobListingTable.id)
        .orderBy(desc(JobListingTable.createdAt))

    // data.forEach(jobListing => {
    //     cacheTag(getJobListingApplicationJobListingTag(jobListing.id))
    // })

    return data
}
