import { User } from "../Models/User.Model";
import { BaseRepo } from "./BaseRepo";

export class TokenRepository extends BaseRepo<Object> {
    collectionName: string = "tokens";
}