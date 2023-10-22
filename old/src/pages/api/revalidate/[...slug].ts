import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "env/server.mjs";

type Query = {
  query: {
    slug: string[];
  };
};

export default function handler(
  req: NextApiRequest & Query,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .send(`${req.method} not supported. Use POST instead.`);
  }

  const pathToRevalidate = "/" + req.query.slug.join("/");

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(400).send("Missing Authorization");
  } else {
    const tokenValid = authToken === env.REVALIDATE_AUTH_TOKEN;
    if (!tokenValid) {
      return res.status(401).send("Invalid Authorization");
    }
  }

  res.revalidate(pathToRevalidate);
}
