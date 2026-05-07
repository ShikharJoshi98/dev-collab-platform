import { IUser } from "../models/User";
import UserRepository from "../repositories/userRepository";
import AppError from "../utils/error";
import { STATUS_CODE } from "../utils/statusCode";

const userRepository = new UserRepository();

const updateUser = async (id: string, data: IUser) => {
    try {
        const user = await userRepository.update(id, data);
        return user;
    } catch (error) {
        console.log(error);
        throw new AppError("Error updating user", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const fetchUser = async (id:string) => {
    try {
        const user = await userRepository.fetchById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new AppError("Error updating user", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const fetchGithubRepos = async (username: string, page: number = 1) => {
    try {
        if (!username) {
            throw new AppError("Username not provided", STATUS_CODE.NOT_FOUND);
        }
        const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=10&page=${page}&sort=created&direction=desc`,
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                },
            }
        );
        if (!response.ok) {
            throw new AppError("GitHub API error", response.status);
        }
        const data = await response.json();
        const repos = data.map((repo: any) => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            stars: repo.stargazers_count
        }));
        return repos;
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error fetching github repos", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export default {
    updateUser,
    fetchGithubRepos,
    fetchUser
};