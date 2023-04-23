import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const data = {
    middlecat_url: process.env.MIDDLECAT_URL,
    authorization: "allow_guests", // "no_auth", "allow_guests", "allow_authenticated_guests", "authorized_users_only"
  };

  res.status(200).json(data);
}
