import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../utils/statusCode";
import { AuthRequest } from "./authMiddleware";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const payload = req.user
      ? { ...req.body, user: req.user._id.toString() }
      : req.body;

    const result = schema.safeParse(payload);

    if (!result.success) {

      const errors = result.error.issues.map((issue: any) => {

        if (issue.code === "invalid_type") {
          return `${issue.path[0]} is required`;
        }

        return issue.message;
      });

      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json({
          success: false,
          errors
        });
    }

    req.body = result.data;

    next();
  };
};