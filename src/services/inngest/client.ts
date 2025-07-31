import {EventSchemas, Inngest} from "inngest";
import {
    DeletedObjectJSON,
    OrganizationJSON,
    UserJSON,
} from "@clerk/nextjs/server"

type ClerkWebhookData<T> = {
    data: {
        data: T
        raw: string
        headers: Record<string, string>
    }
}

type Events = {
    "clerk/user.created": ClerkWebhookData<UserJSON>
    "clerk/user.updated": ClerkWebhookData<UserJSON>
    "clerk/user.deleted": ClerkWebhookData<DeletedObjectJSON>
    "clerk/organization.created": ClerkWebhookData<OrganizationJSON>
    "clerk/organization.updated": ClerkWebhookData<OrganizationJSON>
    "clerk/organization.deleted": ClerkWebhookData<DeletedObjectJSON>

}
export const inngest = new Inngest({ id: "hirevo", schemas: new EventSchemas().fromRecord<Events>(),})