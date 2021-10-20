import express from "express";
import { IRouter } from "express-serve-static-core";
import { allUsers, createUser } from "../Controller/UserController";
import { RouteInterface } from "../Core/Interfaces/Router.Interface";

export class UsersRouter implements RouteInterface {


    getPath(): string {
        return ('/users');
    }

    getRouter(): IRouter {
        const router = express.Router();

        router.get('/', allUsers);
        router.post('/', createUser);
        return router;
    }

}