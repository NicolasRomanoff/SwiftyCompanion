import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import tokenMiddleware from "./middleware/tokenMiddleware.js";

config();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:8081",
    allowMethods: ["GET"],
  }),
);

app.get("/:userLogin", tokenMiddleware, async (c) => {
  const userLogin = c.req.param("userLogin");
  const { access_token } = c.get("token");

  const res = await fetch(
    `https://api.intra.42.fr/v2/users?filter[login]=${userLogin}`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  const users = await res.json();
  return c.json(users[0]);
});

app.get("/user/:id", tokenMiddleware, async (c) => {
  const id = c.req.param("id");
  const { access_token } = c.get("token");

  const res = await fetch(`https://api.intra.42.fr/v2/users/${id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const user = await res.json();
  return c.json(user);
});

app.onError((error, c) => c.text(error.message));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
