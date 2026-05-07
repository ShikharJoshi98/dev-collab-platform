import Project, { IProject } from "../models/Project";
import CrudRepository from "./crudRepository";

class ProjectRepository extends CrudRepository<IProject>{
    constructor() {
        super(Project)
    }
    async fetchProjects(id: string) {
        const response = await Project.find({
            user: id
        });
        return response;
    }
    async fetchProjectById(id: string) {
        const response = await Project.findById(id).populate(
            "user",
            "name gitHubUsername"
        );
        return response;
    }
}

export default ProjectRepository;