import { z } from "zod";

// export interface SubmissionDto {
//   userId: string;
//   problemId: string;
//   code: string;
//   language: string;
// }
export type SubmissionDto = z.infer<typeof submissionSchema>; //it will create interface of submissionSchema object
export const submissionSchema = z
  .object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
  })
  .strict();
