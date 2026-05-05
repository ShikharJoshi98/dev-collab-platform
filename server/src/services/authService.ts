import { IUser } from "../models/User";
import AuthRepository from "../repositories/authRepository";
import AppError from "../utils/error";
import { generateToken } from "../utils/generateToken";
import { STATUS_CODE } from "../utils/statusCode";

const authRepository = new AuthRepository();

const registerUser = async (data: IUser) => {
    try {
        const user = await authRepository.findByEmail(data.email);
        if (user) {
            throw new AppError("User Already exists", STATUS_CODE.CONFLICT);
        }

        const newUser = await authRepository.create(data);
        const token = generateToken(newUser._id);
        return {newUser,token};
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Error creating user", STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const loginUser = async (data: Pick<IUser, "email" | "password">) => {
    try {
        const user = await authRepository.findByEmail(data.email);
        if (user && (await user.comparePassword(data.password))) {
            return {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: generateToken(user._id)
            };
        }
        else {
            throw new AppError('Invalid Credentials', STATUS_CODE.BAD_REQUEST);
        }
    } catch (error) {
        console.log(error);
         if (error instanceof AppError) {
            throw error;
        }
        throw new AppError('Error Logging in', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

const getUserById = async (id: string) => {
    try {
        const user = await authRepository.fetchById(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot find user', STATUS_CODE.INTERNAL_SERVER_ERROR);
    }
}

export default {
    registerUser,
    loginUser,
    getUserById
}