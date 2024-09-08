import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insertUserSchema } from "../db/schema";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { compare, hash } from "bcrypt";

export const userRouter = new Hono();

const signupSchema = insertUserSchema.omit({
  id: true,
});
userRouter.post("/signup", zValidator("json", signupSchema), async (c) => {
  const data = c.req.valid("json");
  const hashedpassword = await hash(data.password, 10);
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
      .values({ name: data.name, email: data.email, password: hashedpassword })
      .returning();

    if (!createUser) {
      return c.json(
        {
          msg: "There was some problem",
        },
        200
      );
    }
    const token = await sign(createUser[0], process.env.JWT_SECRET || "");
    localStorage.setItem("Bearer", token);
    return c.json({
      msg: token,
    });
  } catch (e) {
    console.log(e);
  }
});

const signinSchema = insertUserSchema.omit({
  id: true,
  name: true,
});
userRouter.post("/signin", zValidator("json", signinSchema), async (c) => {
  const data = c.req.valid("json");
  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email));
    if (!existingUser.length) {
      return c.json(
        {
          msg: "User doesn't exist please create new one",
        },
        403
      );
    }
    if (await compare(data.password, existingUser[0].password)) {
      const token = await sign(existingUser[0], process.env.JWT_SECRET || "");
      localStorage.setItem("token", token);
      return c.json({
        msg: token,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

const updateSchema = insertUserSchema.omit({
  id: true,
  password: true,
});
userRouter.post("/update", zValidator("json", updateSchema), async (c) => {
  console.log(1);
  const data = c.req.valid("json");
  console.log(data);
  console.log(2);
  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email));
    console.log(existingUser);
    console.log(3);
    if (!existingUser.length) {
      return c.json(
        {
          msg: "User doesn't exist please create new one",
        },
        403
      );
    }
    console.log(4);
    const updateUser = await db
      .update(schema.users)
      .set({ name: data.name })
      .where(eq(schema.users.name, existingUser[0].name))
      .returning({ updatedName: schema.users.name });

    console.log(updateSchema);
    console.log(5);
    return c.json(
      {
        msg: `User name is updated with ${updateUser[0].updatedName}`,
      },
      200
    );
  } catch (e) {
    console.log(e);
  }
});

const deleteSchema = insertUserSchema.omit({
  id: true,
  name: true,
});
userRouter.post("/delete", zValidator("json", deleteSchema), async (c) => {
  const data = c.req.valid("json");
  try {
    const existingUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, data.email));
    if (!existingUser.length) {
      return c.json(
        {
          msg: "User doesn't exist please create new one",
        },
        403
      );
    }
    const deleteUser = await db
      .delete(schema.users)
      .where(eq(schema.users.email, existingUser[0].email));
    return c.json(
      {
        msg: `User with email ${data.email} has been deleted`,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        msg: "An error occurred while deleting the user",
      },
      500
    );
  }
});
