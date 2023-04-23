import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const apiCodebookSchema = z.object({
  id: z.string(),
});

const apiJobSetSchema = z.object({
  name: z.string(),
  codebook: apiCodebookSchema,
});

const apiUnitSchema = z.object({
  id: z.string(),
  unit: z.any(),
  codebook: apiCodebookSchema.optional(),
});

export const apiJobSchema = z.object({
  id: z.string().optional(),
  jobsets: z.array(apiJobSetSchema).optional(),
  units: z.array(apiUnitSchema).optional(),
});

export type ApiJob = z.infer<typeof apiJobSchema>;

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { data, success, error } = apiJobSchema.safeParse(req.body);
    if (!success) {
      res.status(400).send(error);
      return;
    }

    try {
      const newJob = createJob(data);
      // newJob should mention things like id and whether job can be deployed
      res.status(200).json(newJob);
    } catch (e) {
      console.log(e);
      res.status(400).send(e.message);
    }
  }

  res.status(200).send("OK");
}

export function createJob(job: ApiJob) {
  console.log("createJob");
  console.log(job);
  return { id: "123", status: "meh" };
}
