import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { paymentRouter } from "./routes/payment";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/payment", paymentRouter);

export default app;
