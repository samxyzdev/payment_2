import { Hono } from "hono";
import { db } from "../db";
import * as schema from "../db/schema";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

export const bankWebhook = new Hono();

const bankWebhookSchema = z.object({
  token: z.string(),
  userId: z.number(),
  amount: z.number(),
});

bankWebhook.post(
  "/bankwebhook",
  zValidator("json", bankWebhookSchema),
  async (c) => {
    const data = c.req.valid("json");
    try {
      await db.transaction(async (tx) => {
        const currentBalance = await tx
          .select()
          .from(schema.balance)
          .where(eq(schema.balance.userId, data.userId))
          .execute()
          .then((res) => {
            console.log("Balance query result:", res);
            return res[0]?.amount ?? 0;
          });
        if (!currentBalance) {
          console.error(`No balance found for userId: ${data.userId}`);
        }

        if (isNaN(currentBalance) || isNaN(data.amount)) {
          throw new Error("Invalid balance or amount");
        }
        const updateBalance = await tx
          .update(schema.balance)
          .set({ amount: currentBalance + data.amount })
          .where(eq(schema.balance.userId, data.userId))
          .execute();

        console.log("Balance update result:", updateBalance);

        await tx
          .update(schema.onRampTransaction)
          .set({ status: "Success" })
          .where(eq(schema.onRampTransaction.userId, data.userId));
        // update it into transaction history
        await tx
          .update(schema.transactionHistory)
          .set({ status: "Success" })
          .where(eq(schema.transactionHistory.userId, data.userId));
      });
    } catch (e) {
      console.error(e);
      return c.json(
        {
          msg: "Error while processing webhook",
        },
        200
      );
    }
    return c.json({
      msg: "Captured",
    });
  }
);
