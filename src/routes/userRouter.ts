import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insertUserSchema } from "../db/schema";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { decode, sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

const signupSchema = insertUserSchema.omit({
  id: true,
});
userRouter.post("/signup", zValidator("json", signupSchema), async (c) => {
  const data = c.req.valid("json");
  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email));

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
  try {
    const createUser = await db
      .insert(schema.users)
      .values({ name: data.name, email: data.email, password: data.password })
      .returning();
    if (!createUser) {
      return c.json(
        {
          msg: "There was some problem",
        },
        200
      );
    }
    const token = sign(createUser[0], c.env.JWT_SECRET);
    return c.json({
      msg: token,
    });
  } catch (e) {
    console.log(e);
  }
});

userRouter.post("/signin", async (c) => {
  return c.text("signinroute");
});
