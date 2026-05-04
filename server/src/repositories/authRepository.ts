import User, { IUser } from "../models/User";
import CrudRepository from "./crudRepository";

class AuthRepository extends CrudRepository<IUser>{
    constructor() {
        super(User)
    }

    async findByEmail(email: string) {
        const response = await User.findOne({ email }).select("+password");
        return response;
    }
}

export default AuthRepository;