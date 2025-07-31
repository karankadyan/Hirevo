import {EventSchemas, Inngest} from "inngest";
import {DeletedObjectJSON, UserJSON} from "@clerk/nextjs/server";

type ClerkWebHookData<T> = {
    data: {
        data: T
        raw: string
        headers: Record<string, string>
    }
}

type Events = {
    "clerk/user.created": ClerkWebHookData<UserJSON>
    "clerk/user.updated": ClerkWebHookData<UserJSON>
    "clerk/user.deleted": ClerkWebHookData<DeletedObjectJSON>
}
export const inngest = new Inngest({ id: "hirevo", schemas: new EventSchemas().fromRecord<Events>(),})