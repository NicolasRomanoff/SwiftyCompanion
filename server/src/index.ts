import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import z from "zod";
import { ProfileSchema } from "../lib/profile.type.js";
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

app.get("/", (c) => c.text("OK"));

app.get("/:userLogin", tokenMiddleware, async (c) => {
  const userLogin = c.req.param("userLogin");
  const { access_token } = c.get("token");

  const usersResponse = await fetch(
    `https://api.intra.42.fr/v2/users?filter[login]=${userLogin}`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  const users = await usersResponse.json();
  if (!users.length) return c.json({ message: "User not found" }, 404);

  const { id } = z.parse(ProfileSchema.pick({ id: true }), users[0]);

  const userResponse = await fetch(`https://api.intra.42.fr/v2/users/${id}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  const user = await userResponse.json();
  return c.json(ProfileSchema.parse(user));
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
