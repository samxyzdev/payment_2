import { db } from "../db";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

export async function existingUserCheck(data: any) {
  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email));
    if (existingUser) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
