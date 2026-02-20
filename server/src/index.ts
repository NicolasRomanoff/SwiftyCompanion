import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";

config();

const app = new Hono();

app.get("/:userLogin", async (c) => {
  const userLogin = c.req.param("userLogin");

  const tokenResponse = await fetch("https://api.intra.42.fr/oauth/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SCHOOL_42_UID ?? "",
      client_secret: process.env.SCHOOL_42_SECRET ?? "",
    }),
  });
  const token = await tokenResponse.json();
  const userResponse = await fetch(
    `https://api.intra.42.fr/v2/users?filter[login]=${userLogin}`,
    {
      headers: { Authorization: `Bearer ${token.access_token}` },
    },
  );

  const userInfo = await userResponse.json();
  return c.json(userInfo);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
