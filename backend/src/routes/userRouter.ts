import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { insertUserSchema } from "../db/schema";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";

export const userRouter = new Hono();

interface newUserIdSchema {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const signupSchema = insertUserSchema.omit({
  id: true,
});
userRouter.post("/signup", zValidator("json", signupSchema), async (c) => {
  const data = c.req.valid("json");
  const hashedpassword = await Bun.password.hash(data.password);
  let newUserId: newUserIdSchema | null = null;
  // Checking Existing User --------------------
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
    console.error("Error while checking existing user:", e);
    return c.json(
      {
        msg: "Error chekking existing user",
      },
      500
    );
  }
  //--------------------------------------------
  // Creating New User--------------------------
  try {
    //----------------------------------------
    await db.transaction(async (tx) => {
      const [newUser] = await tx
        .insert(schema.users)
        .values({
          name: data.name,
          email: data.email,
          password: hashedpassword,
        })
        .returning();
      //---------------------------
      newUserId = newUser;
      //-----------------------------------------
      await tx.insert(schema.balance).values({
        amount: 0,
        userId: newUser.id,
      });
    });
    //-----------------------------------------
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = await sign({ id: newUserId }, jwtSecret);
    //-------------------------------------
    console.log("HWLLO FROM EERROR");

    return c.json({
      jwtToken: token,
    });
  } catch (e) {
    console.error("Erro during signup process:", e);
    return c.json(
      {
        msg: "There was some problem",
      },
      500
    );
  }
});
// --------------------------------------------------

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
    if (await Bun.password.verify(data.password, existingUser[0].password)) {
      const token = await sign(existingUser[0], process.env.JWT_SECRET || "");
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
    const updateUser = await db
      .update(schema.users)
      .set({ name: data.name })
      .where(eq(schema.users.name, existingUser[0].name))
      .returning({ updatedName: schema.users.name });
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
