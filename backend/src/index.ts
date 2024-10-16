import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { paymentRouter } from "./routes/payment";
import { bankWebhook } from "./routes/bankWebhook";
import { cors } from "hono/cors";
import { consumeMessages } from "./kafka/kafka";

const app = new Hono();

app.use("/api/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/payment", paymentRouter);
app.route("/api/v1/verify", bankWebhook);

consumeMessages("onramp");

export default app;
