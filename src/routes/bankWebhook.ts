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

bankWebhook.get(
  "/bankwebhook",
  zValidator("json", bankWebhookSchema),
  async (c) => {
    const data = c.req.valid("json");
    try {
      await db.transaction(async (tx) => {
        await tx
          .update(schema.balance)
          .set({ amount: Number(schema.balance.amount) + data.amount })
          .where(eq(schema.balance.userId, data.userId));
        await tx
          .update(schema.onRampTransaction)
          .set({ status: "success" })
          .where(eq(schema.onRampTransaction.id, data.userId));
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
