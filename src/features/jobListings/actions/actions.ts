"use server"

import { z } from "zod"
import { jobListingSchema } from "@/features/jobListings/actions/schemas";
import { getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth";
import {redirect} from "next/navigation";
import {insertJobListing} from "@/features/jobListings/db/jobListings";

export async function createJobListing(unsafeData: z.infer<typeof jobListingSchema>) {
    const {orgId} = await getCurrentOrganization();

    if (orgId == null) {
        return {
            error: true,
            message: "You don't have permissions to create a job listing"
        }
    }
    const { success, data } = jobListingSchema.safeParse(unsafeData);
    if (!success) {
        return {
            error: true,
            message: "There was an error creating the job listing"
        }
    }
    const jobListing = await insertJobListing({
        ...data,
        organizationId: orgId,
        status: "draft",
    })
    redirect(`/employer/job-listings/${jobListing.id}`)
}

