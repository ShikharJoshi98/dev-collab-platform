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

const getProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await projectService.fetchProject(req.params.id as string);
        successResponse(res, project, "Fetched Project successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

const updateProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const project = await projectService.updateProject(req.user._id, req.params.id as string, req.body);
        successResponse(res, project, "Updated Project successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const project = await projectService.destroyProject(req.user._id, req.params.id as string);
        successResponse(res, project, "Deleted Project successfully", STATUS_CODE.OK);
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getUserProjects,
    getProject,
    updateProject,
    deleteProject
}