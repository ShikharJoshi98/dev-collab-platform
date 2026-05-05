import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/error";
import { STATUS_CODE } from "../utils/statusCode";
import serverConfig from "../config/serverConfig";
import authService from "../services/authService";

export interface AuthRequest extends Request{
    user?: any
}

interface AuthPayload{
    id: string,
    email: string
}

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(new AppError("No Token Provided", STATUS_CODE.UNAUTHORIZED));
        }

        const decoded = jwt.verify(token, serverConfig.JWT_SECRET as string) as AuthPayload;
        const user = await authService.getUserById(decoded.id);

         if (!user) {
            return next(new AppError("User not found", STATUS_CODE.UNAUTHORIZED));
        }

        req.user = user;       

        next();
    } catch (error) {
        return next(new AppError("Unauthorized", STATUS_CODE.UNAUTHORIZED));
    }
};

export default protect;