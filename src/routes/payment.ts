import { Hono } from "hono";
import { jwt, verify } from "hono/jwt";

export const paymentRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
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
    const user = await verify(token, c.env.JWT_SECRET);
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

paymentRouter.get("/balance", (c) => {
  return c.json({
    msg: "Hello",
  });
});
