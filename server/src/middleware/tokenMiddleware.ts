import { createMiddleware } from "hono/factory";

type TToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  created_at: number;
  secret_valid_until: number;
};

const tokenMiddleware = createMiddleware<{
  Variables: { token: TToken };
}>(async (c, next) => {
  const tokenResponse = await fetch("https://api.intra.42.fr/oauth/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SCHOOL_42_UID ?? "",
      client_secret: process.env.SCHOOL_42_SECRET ?? "",
    }),
  });
  const token = await tokenResponse.json();
  c.set("token", token);
  await next();
});

export default tokenMiddleware;
