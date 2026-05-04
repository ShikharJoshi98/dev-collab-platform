import { NextFunction, Request, Response } from "express";
import authService from "../services/authService"
import { successResponse } from "../utils/successResponse";
import { STATUS_CODE } from "../utils/statusCode";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { newUser, token } = await authService.registerUser(req.body);
        
        res.cookie(
            "token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 100
            }
        );

        return successResponse(res, newUser, "User created successfully", STATUS_CODE.CREATED);
    } catch (error) {
        next(error);
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, token } = await authService.loginUser(req.body);
        
        res.cookie(
            "token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 100
            }
        );

        return successResponse(res, user, "Logged in successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

export default {
    register,
    login
}