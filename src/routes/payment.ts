import { Hono } from "hono";
import { jwt, verify } from "hono/jwt";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";

export const paymentRouter = new Hono<{
  Variables: {
    userId: string;
  };
}>();

paymentRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ msg: "please relogin" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = await verify(token, process.env.JWT_SECRET || "");
    if (user) {
      c.set("userId", user.id as string);
      await next();
    } else {
      return c.json({
        msg: "You are not logged in",
      });
    }
  } catch (e) {
    return c.json(
      {
        msg: "You are not logged in",
      },
      200
    );
  }
});

paymentRouter.get("/balance", async (c) => {
  const userId = Number(c.get("userId"));
  const balance = await db
    .select({ userBalance: schema.balance.amount })
    .from(schema.balance)
    .where(eq(schema.balance.userId, userId));
  return c.json({
    msg: balance,
  });
});
