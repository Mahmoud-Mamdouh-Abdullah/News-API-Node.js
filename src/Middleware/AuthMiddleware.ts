import { AppMiddlewareInterface } from "../Core/Interfaces/AppMiddleware.interface";
import { NextFunction, Request, Response } from "express";
import { TokenService } from "../Services/AuthServices/TokenService";

const tokenService = new TokenService();
export class AuthMiddleware implements AppMiddlewareInterface {

    getMiddleware() {
        return async (req: Request, res: Response, next: NextFunction) => {
            let token: string | undefined = req.header('token');
            if (!token) {
                return res.status(401).json({ message: 'unauthorized' });
            }
            let tokenCheck = tokenService.check(token);
            if (!(await tokenCheck.ifTokenExist(token))) {
                return res.status(401).json({ message: 'unauthorized' });
            }
            let user = tokenCheck.user;
            req.body.user = user;
            next();
        }
    }

}