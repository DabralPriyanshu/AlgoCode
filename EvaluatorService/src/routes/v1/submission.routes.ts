import express from "express";
import submissionController from "../../controllers/submission.controller.js";
import { validateSubmissionDto } from "../../validators/submissionValidator.js";
import { submissionSchema } from "../../dtos/submissionDto.js";
const submissionRouter = express.Router();

submissionRouter.post(
  "/",
  validateSubmissionDto(submissionSchema),
  submissionController.addSubmission,
);

export default submissionRouter;
