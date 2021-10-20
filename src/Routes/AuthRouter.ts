import express, { IRouter } from "express";
import { Login } from "../Controller/AuthController";
import { RouteInterface } from "../Core/Interfaces/Router.Interface";

export class AuthRouter implements RouteInterface {
    getRouter(): IRouter {
        const router = express.Router();

        router.post('/login', Login);
        return router;
    }
    getPath(): string {
        return '/auth';
    }

}