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
        throw new AppError("Error creating Project", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const fetchUserProjects = async (id: string) => {
    try {
        const projects = await projectRepository.fetchProjects(id);
        return projects;
    } catch (error) {
        throw new AppError("Error fetching User Projects", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export default {
    createProject,
    fetchUserProjects
}