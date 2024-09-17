import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { paymentRouter } from "./routes/payment";
import { bankWebhook } from "./routes/bankWebhook";
import { cors } from "hono/cors";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use("/api/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/payment", paymentRouter);
app.route("/api/v1/verify", bankWebhook);

export default app;
