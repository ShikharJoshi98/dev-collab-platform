import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../utils/statusCode";

export const validate = (schema:any) => {
  return (req: Request,res: Response, next:NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {

      const errors = result.error.issues.map((issue:any) => {

        if (issue.code === "invalid_type") {
          return `${issue.path[0]} is required`;
        }

        return issue.message;
      });

        return res
            .status(STATUS_CODE.BAD_REQUEST)
            .json({
        success:false,
        errors
      });
    }

    req.body = result.data;

    next();
  };
};