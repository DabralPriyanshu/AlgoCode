import { type NextFunction, type Request, type Response } from "express";
export const validateSubmissionDto =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body });
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Invalid request params received",
        data: {},
        error: error,
      });
    }
  };
