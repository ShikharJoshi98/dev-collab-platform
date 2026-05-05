import User, { IUser } from "../models/User";
import CrudRepository from "./crudRepository";

class UserRepository extends CrudRepository<IUser>{
    constructor() {
        super(User);
    }
}

export default UserRepository;