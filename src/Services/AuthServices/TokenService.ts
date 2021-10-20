import { TokenRepository } from "../../Data/Repositories/TokenRepositoy";
import { UsersRepo } from "../../Data/Repositories/UserRepo";
import { User } from "../../Data/Models/User.Model";
const tokenRepo = new TokenRepository();
const userRepo = new UsersRepo();

export class TokenService {

    token?: string;
    user?: User;
    async findToken(filter: Object): Promise<Object | null> {
        return await tokenRepo.findOne(filter);
    }

    async ifTokenExist(token: string): Promise<boolean> {
        let tokenObject: any = await tokenRepo.findOne({ token });
        if (!tokenObject) {
            return false;
        }
        let user = await userRepo.findById(tokenObject.user_id.toString());
        this.user = user;
        return true;
    }

    async insertToken(data: Object) {
        return await tokenRepo.insert(data);
    }

    async deleteToken(id: string) {
        return await tokenRepo.delete(id);
    }

    check(token: string) {
        this.token = token;
        return this;
    }
}