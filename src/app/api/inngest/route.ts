import { inngest } from "@/services/inngest/client"
import { serve } from "inngest/next"
import {
    clerkCreateOrganization,
    clerkCreateUser,
    clerkDeleteUser,
    clerkUpdateUser
} from "@/services/inngest/functions/clerk";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        clerkCreateUser,
        clerkUpdateUser,
        clerkDeleteUser,
        clerkCreateOrganization,
    ],
})