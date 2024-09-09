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
          .then((res) => res[0]?.amount);
        await tx
          .update(schema.balance)
          .set({ amount: currentBalance + Number(data.amount) })
          .where(eq(schema.balance.userId, data.userId));
        await tx
          .update(schema.onRampTransaction)
          .set({ status: "success" })
          .where(eq(schema.onRampTransaction.userId, data.userId));
        console.log(1);
      });
    } catch (e) {
      console.error(e);
      return c.json(
        {
          msg: "Erro while processing webhook",
        },
        200
      );
    }
    return c.json({
      msg: "Captured",
    });
  }
);
