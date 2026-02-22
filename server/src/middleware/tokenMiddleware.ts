import { createMiddleware } from "hono/factory";

type TToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  created_at: number;
  secret_valid_until: number;
};

export const globalToken = {
  token: null,
  date: null,
} as { token: TToken | null; date: number | null };

const tokenMiddleware = createMiddleware<{
  Variables: { token: TToken };
}>(async (c, next) => {
  if (globalToken.token && (globalToken?.date ?? 0) > new Date().getTime()) {
    c.set("token", globalToken.token);
    await next();
    return;
  }

  const tokenResponse = await fetch("https://api.intra.42.fr/oauth/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SCHOOL_42_UID ?? "",
      client_secret: process.env.SCHOOL_42_SECRET ?? "",
    }),
  });
  const token = await tokenResponse.json();
  globalToken.token = token;
  globalToken.date = new Date().getTime() + (token?.expires_in ?? 0) * 1000;
  c.set("token", token);
  await next();
});

export default tokenMiddleware;
