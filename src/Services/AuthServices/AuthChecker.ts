import { TokenService } from "./TokenService";
import { User } from "../../Data/Models/User.Model";
import { EncryptPassword } from "../EncryptPassword";
import { UsersRepo } from "../../Data/Repositories/UserRepo";

const userRepo = new UsersRepo();
const tokenService = new TokenService();

export class AuthUserChecker {

    private user: User | undefined;

    constructor(private email: string, private password: string) {
    }

    async checkLogin() {
        this.user = await userRepo.findOne({ email: this.email });
        if (!this.user) {
            return false;
        }
        let encryptedPass = new EncryptPassword(this.password).encrypt();
        if (encryptedPass !== this.user.password) {
            return false;
        }
        return true;
    }

    getUserToken() {
        return new EncryptPassword(JSON.stringify({ ...this.user, date: new Date() })).encrypt();
    }

    async saveTokenAndGet() {
        let token = this.getUserToken();
        let userTokenObject: any = await tokenService.findToken({ user_id: this.user?._id });
        if (userTokenObject)
            await tokenService.deleteToken(userTokenObject._id.toString());
        console.log(userTokenObject);
        tokenService.insertToken({ user_id: this.user?._id, token });
        return token;
    }
}