import { type Request, type Response } from "express";
const pingCheck = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Ping check ok", success: true });
};

export default { pingCheck };
