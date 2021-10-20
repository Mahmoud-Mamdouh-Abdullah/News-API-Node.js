import { AuthUserChecker } from "./AuthChecker";

export class AuthService {
    attemptLogin(email: string, password: string): AuthUserChecker {
        return new AuthUserChecker(email, password);
    }
}