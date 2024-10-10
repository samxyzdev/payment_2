import { Hono } from "hono";
import { jwt, verify } from "hono/jwt";
import { db } from "../db/index";
import * as schema from "../db/schema";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { p2pTransferSchema, onramp } from "../db/schema";
import { z } from "zod";
export const paymentRouter = new Hono<{
  Variables: {
    userId: number;
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
      c.set("userId", user.id as number);
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
  const userId = c.get("userId").id;
  if (isNaN(userId)) {
    return c.json({ msg: "Invalid user ID" }, 400);
  }
  const balance = await db
    .select({ userBalance: schema.balance.amount })
    .from(schema.balance)
    .where(eq(schema.balance.userId, userId));
  const finaleBalance = balance[0];
  return c.json({
    msg: finaleBalance,
  });
});

const onrampSchema = onramp.omit({
  id: true,
  token: true,
  createdAt: true,
  status: true,
  userId: true,
});
paymentRouter.post("/onramp", zValidator("json", onrampSchema), async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("userId").id;
  if (isNaN(userId)) {
    return c.json({ msg: "Invalid user ID" }, 400);
  }
  const token = (Math.random() * 1000).toString();
  console.log(token);

  await db.insert(schema.onRampTransaction).values({
    provider: data.provider,
    status: "Processing",
    token: token,
    userId: userId,
    amount: data.amount * 100,
    type: "Credit",
  });
  // insert into transaciton history
  await db.insert(schema.transactionHistory).values({
    status: "Processing",
    type: "Credit",
    amount: data.amount * 100,
    userId: userId,
  });
  return c.json({
    msg: "Done",
  });
});

// recepitn email
// amount
const p2pSchema = p2pTransferSchema
  .omit({
    id: true,
    fromUserId: true,
    toUserId: true,
  })
  .extend({
    email: z.string().email(),
  });

paymentRouter.post("/p2ptransfer", zValidator("json", p2pSchema), async (c) => {
  const data = c.req.valid("json");
  const userId = c.get("userId").id;
  if (isNaN(userId)) {
    return c.json({ msg: "Invalid user ID" }, 400);
  }

  // get the userId from email
  const getUserIdFromEmailBackend = await db
    .select() // { id: schema.users.id } i am not doing this here because it taking more time and in the end i have extract the userId.
    .from(schema.users)
    .where(eq(schema.users.email, data.email));
  // extractin userId
  const extractedUserId = getUserIdFromEmailBackend[0].id;
  // checking if user exits in our database
  const checkSenderUser = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, userId));
  if (!checkSenderUser) {
    return c.json(
      {
        msg: "User doesn't exist with us",
      },
      411
    );
  }
  // checker user balance of sender
  let senderUserBalance;
  try {
    senderUserBalance = await db
      .select()
      .from(schema.balance)
      .where(eq(schema.balance.id, userId));
  } catch (error) {
    return c.json(
      {
        msg: "An error occurred while checking balance",
      },
      500
    );
  }
  if (!senderUserBalance || senderUserBalance.length === 0) {
    return c.json(
      {
        msg: "No balance found for this user",
      },
      404
    );
  }
  const balanceAmount = senderUserBalance[0].amount;
  if (balanceAmount === undefined) {
    return c.json(
      {
        msg: "Balance amount is not available",
      },
      500
    );
  }
  if (balanceAmount < data.amount) {
    return c.json(
      {
        msg: "You do not have enough money to send",
      },
      411
    );
  }
  // checking if receipent exist in our db
  let checkReceiverUser;
  try {
    checkReceiverUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, extractedUserId));
  } catch (error) {
    console.log(error);
  }
  if (!checkReceiverUser) {
    return c.json(
      {
        msg: "User doesn't exist with us",
      },
      411
    );
  }
  const senderAmount = Number(senderUserBalance[0].amount);
  if (isNaN(senderAmount)) {
    return c.json({ msg: "Invalid sender balance" }, 500);
  }
  if (isNaN(data.amount) || isNaN(extractedUserId)) {
    return c.json({ msg: "Invalid transfer data" }, 400);
  }
  // decreasing sender balance and updating receipetn balance
  await db.transaction(async (tx) => {
    // Get the current balance of sender before updating
    const currentBalance = await tx
      .select()
      .from(schema.balance)
      .where(eq(schema.balance.userId, userId));
    // First update: Subtract amount
    const newBalance = Number(currentBalance[0].amount) - data.amount;
    // Check for NaN before updating
    if (isNaN(newBalance)) {
      console.error(
        "Invalid new balance calculated. Current Balance:",
        currentBalance[0].amount,
        "Data Amount:",
        data.amount
      );
      throw new Error("Invalid balance calculation.");
    }
    await tx
      .update(schema.balance)
      .set({ amount: newBalance })
      .where(eq(schema.balance.userId, userId));
    // Second update: Add amount
    const currentBalanceTo = await tx
      .select()
      .from(schema.balance)
      .where(eq(schema.balance.userId, Number(extractedUserId)));
    // Second update: Add amount
    const newBalanceTo = Number(currentBalanceTo[0].amount) + data.amount;
    // Check for NaN before updating
    if (isNaN(newBalanceTo)) {
      console.error(
        "Invalid new balance calculated for recipient. Current Balance:",
        currentBalanceTo[0].amount,
        "Data Amount:",
        data.amount
      );
      throw new Error("Invalid balance calculation.");
    }

    await tx
      .update(schema.balance)
      .set({ amount: newBalanceTo })
      .where(eq(schema.balance.userId, Number(extractedUserId)));

    // Insert p2p transfer
    await tx.insert(schema.p2pTransfer).values({
      fromUserId: userId,
      toUserId: extractedUserId,
      amount: data.amount,
    });
    // Insert into transacitonHistory
    console.log("inserting into inset");

    await tx.insert(schema.transactionHistory).values({
      status: "Success",
      type: "Debit",
      amount: data.amount,
      userId: userId,
    });
    console.log("insert complete");
  });
  return c.json({
    msg: "Your p2p transaction got succesfull",
  });
});

paymentRouter.get("/status", async (c) => {
  const userId = c.get("userId").id;
  if (isNaN(userId)) {
    return c.json({ msg: "Invalid user ID" }, 400);
  }
  const result = await db
    .select({
      amount: schema.transactionHistory.amount,
      date: schema.transactionHistory.createdAt,
      status: schema.transactionHistory.status,
      type: schema.transactionHistory.type,
    })
    .from(schema.transactionHistory)
    .where(eq(schema.transactionHistory.userId, userId));
  if (result.length === 0) {
    return c.json({ msg: "No transactions found for this user" });
  }

  // [{},{}]
  const extractedValues = result.map(({ amount, date, status, type }) => ({
    amount: type === "Debit" ? amount : amount / 100, // conditionally set amount
    date,
    status,
    type,
  }));
  return c.json({
    extractedValues,
  });
});
