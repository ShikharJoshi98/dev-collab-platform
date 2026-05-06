import { NextFunction, Request, Response } from "express";
import projectService from "../services/projectService";
import { successResponse } from "../utils/successResponse";
import { STATUS_CODE } from "../utils/statusCode";
import { AuthRequest } from "../middlewares/authMiddleware";

const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const project = await projectService.createProject({...req.body, user:req.user._id});
        successResponse(res, project, "Created Project successfully", STATUS_CODE.CREATED);
    } catch (error) {
        next(error);
    }
}

const getUserProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const projects = await projectService.fetchUserProjects(req.user._id);
        successResponse(res, projects, "Fetched All Projects successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getUserProjects
}