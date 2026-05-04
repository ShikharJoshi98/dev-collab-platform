import { NextFunction, Request, Response } from "express";
import { STATUS_CODE } from "../utils/statusCode";
import AppError from "../utils/error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res
            .status(err.statusCode)
            .json({
            success: false,
            message: err.message
        });
    }

    return res
        .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            message: "Internal Server Error"
        });
};
