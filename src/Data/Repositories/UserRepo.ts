import { User } from "../Models/User.Model";
import { BaseRepo } from "./BaseRepo";

export class UsersRepo extends BaseRepo<User> {
    collectionName: string = 'users';
}
