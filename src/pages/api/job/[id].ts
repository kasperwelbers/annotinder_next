import type { NextApiRequest, NextApiResponse } from "next";
import { apiJobSchema } from "./index";

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "GET") {
  }

  if (req.method === "POST") {
    const { data, success, error } = apiJobSchema.safeParse(req.body);
    if (!success) {
      res.status(400).send(error);
      return;
    }
    console.log(data);
    // check if id exists, if not return error
    // update all non missing fields
  }

  res.status(200).send("OK");
}
