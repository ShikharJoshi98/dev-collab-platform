import { IProject } from "../models/Project";
import ProjectRepository from "../repositories/projectRepository";
import AppError from "../utils/error";
import { STATUS_CODE } from "../utils/statusCode";

const projectRepository = new ProjectRepository();

const createProject = async (data: IProject) => {
    try {
        const project = await projectRepository.create(data);
        return project;
    } catch (error) {
        console.log(error);
        throw new AppError("Error creating Project", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const fetchUserProjects = async (id: string) => {
    try {
        const projects = await projectRepository.fetchProjects(id);
        return projects;
    } catch (error) {
        console.log(error);
        throw new AppError("Error fetching User Projects", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const fetchProject = async (id: string) => {
    try {
        const project = await projectRepository.fetchProjectById(id);

        if (!project) {
            throw new AppError("Project not found", STATUS_CODE.NOT_FOUND);
        }
        return project;
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error fetching Project", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const updateProject = async (userId: string,projectId: string, data: IProject) => {
    try {
        const project = await projectRepository.fetchById(projectId);
        if (!project) {
            throw new AppError("Project not found", STATUS_CODE.NOT_FOUND);
        }
        if (userId.toString() !== project.user.toString()) {
            throw new AppError("Not Authorized", STATUS_CODE.UNAUTHORIZED);
        }
        const updatedProject = await projectRepository.update(projectId, data);
     
        return updatedProject;
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error Updating Project", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const destroyProject = async (userId: string, projectId: string) => {
    try {
        const project = await projectRepository.fetchById(projectId);
        if (!project) {
            throw new AppError("Project not found", STATUS_CODE.NOT_FOUND);
        }
        if (userId.toString() !== project.user.toString()) {
            throw new AppError("Not Authorized", STATUS_CODE.UNAUTHORIZED);
        }
        return await projectRepository.destroy(projectId);     
        
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error Deleting Project", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export default {
    createProject,
    fetchUserProjects,
    fetchProject,
    updateProject,
    destroyProject
}