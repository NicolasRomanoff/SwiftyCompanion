import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";

config();

const app = new Hono();

app.get("/", (c) => {
  return c.text(`Hello Hono! ${process.env.SCHOOL_42_UID}`);
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
