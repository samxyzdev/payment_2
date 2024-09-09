import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { paymentRouter } from "./routes/payment";
import { bankWebhook } from "./routes/bankWebhook";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/payment", paymentRouter);
app.route("/api/v1/verify", bankWebhook);

export default app;
