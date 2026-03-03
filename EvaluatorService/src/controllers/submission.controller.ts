import { type Request, type Response } from "express";
import type { SubmissionDto } from "../dtos/submissionDto.js";

const addSubmission = async (req: Request, res: Response) => {
  const submissionDto = req.body as SubmissionDto;
  return res.status(201).json({
    success: true,
    error: {},
    message: "Successfully collected the submissions",
    data: submissionDto,
  });
};

export default { addSubmission };
