import { NextFunction, Request, Response } from "express";
import userService from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { successResponse } from "../utils/successResponse";
import { STATUS_CODE } from "../utils/statusCode";
import AppError from "../utils/error";

const getUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
         if (!req.user) {
            return next(new AppError("Unauthorized", STATUS_CODE.UNAUTHORIZED));
        }
        const user = req.user;
        successResponse(res, user, "Fetched User successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const updatedUser = await userService.updateUser(req.user._id, req.body);
        successResponse(res, updatedUser, "Updated User successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

const fetchUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.fetchUser(req.params.id as string);
        successResponse(res, user, "Fetched User Profile", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

const getRepos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const repos = await userService.fetchGithubRepos(req.params.username as string, page);
        successResponse(res, repos, "Fetched Github Repos successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}
 
export default {
    update,
    getUser,
    getRepos,
    fetchUserProfile
}