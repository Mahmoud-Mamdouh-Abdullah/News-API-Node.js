import { ObjectId } from "bson";
import { ParsedQs } from "qs";
import { User } from "../Data/Models/User.Model";
import { UsersRepo } from "../Data/Repositories/UserRepo";
import { EncryptPassword } from "./EncryptPassword";

const userRepo = new UsersRepo();

export class UserService {

    findAll(query: any) {
        let filter: any = {};
        if (query.fn) {
            filter.firstName = { $regex: query.fn, $options: 'i' };
        }
        if (query.age) {
            filter.age = { $lt: parseInt(query.age) }
        }
        return userRepo.findAll(filter);
    }

    async addUser(data: {
        first_name: string,
        last_name: string,
        password: string,
        email: string,
        age: string | number
    }) {
        data.password = new EncryptPassword(data.password).encrypt();
        let user = new User(data.first_name, data.last_name, data.password, data.email, data.age);
        let userID = await userRepo.insert(user);
        return await this.findOrFail(userID);
    }

    async findOrFail(id: ObjectId | undefined) {
        let user = await userRepo.findById((id as ObjectId).toString());
        if (user)
            return user;
        return new Error('invalid or missing ID');
    }
}