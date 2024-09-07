import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insertUserSchema } from "../db/schema";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

export const userRouter = new Hono();

const signupSchema = insertUserSchema.omit({
  id: true,
});
userRouter.post("/signup", zValidator("json", signupSchema), async (c) => {
  const validate = c.req.valid("json");
  const data = await c.req.json();
  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email));
    console.log(existingUser);

    if (existingUser.length > 0) {
      return c.json(
        {
          msg: "User already exits with this email",
        },
        411
      );
    }
  } catch (e) {
    console.log(e);
  }
  const createUser = await db
    .insert(schema.users)
    .values({ name: data.name, email: data.email, password: data.password })
    .returning();
  return c.text("signuproute");
});

userRouter.post("/signin", async (c) => {
  return c.text("signinroute");
});
