import { Hono } from "hono";
import { jwt, verify } from "hono/jwt";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { p2pTransferSchema } from "../db/schema";

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

// useid itself
// to userid
// existing user balacne check
// check if user exist on platform

const p2pSchema = p2pTransferSchema.omit({
  id: true,
});
paymentRouter.post("/p2ptransfer", zValidator("json", p2pSchema), async (c) => {
  const data = c.req.valid("json");
  const userId = Number(c.get("userId"));
  const checkUser = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, userId));
  if (!checkUser) {
    return c.json(
      {
        msg: "User doesn't exist with us",
      },
      411
    );
  }
  const existinUserBalance = await db
    .select()
    .from(schema.balance)
    .where(eq(schema.users.id, userId));
  if (existinUserBalance[0].amount < data.amount) {
    return c.json(
      {
        msg: "You don;t have enough money to send",
      },
      411
    );
  }
  await db.transaction(async (tx) => {
    await tx
      .update(schema.balance)
      .set({ amount: Number(schema.balance.amount) - data.amount })
      .where(eq(schema.balance.userId, userId));
    await tx
      .update(schema.balance)
      .set({ amount: Number(schema.balance.amount) + data.amount })
      .where(eq(schema.balance.userId, Number(data.toUserId)));
    await tx.insert(schema.p2pTransfer).values({
      fromUserId: userId,
      toUserId: data.toUserId,
      amount: data.amount,
    });
  });
});
