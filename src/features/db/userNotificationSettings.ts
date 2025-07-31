import { db } from "@/drizzle/db"
import { UserNotificationSettingsTable, UserTable } from "@/drizzle/schema/userNotificationSettings";

export async function insertUserNotificationSettings(
    settings: typeof UserNotificationSettingsTable.$inferInsert) {
    await db
        .insert(UserNotificationSettingsTable)
        .values(settings)
        .onConflictDoNothing()
}