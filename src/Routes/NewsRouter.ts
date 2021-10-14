import express from "express";
import { IRouter } from "express-serve-static-core";
import { RouteInterface } from "../Core/Interfaces/Router.Interface";
import { createNews} from '../Controller/NewsController'


export class NewsRouter implements RouteInterface {


    getRouter(): IRouter {
        const router = express.Router();
        router.post("/", createNews);

        /*router.get("/", getAll);

        router.get("/:id", getByID)

        router.get("/query/:q", getByQuery);


        router.put("/:id", editNews);

        router.delete("/:id", deleteNews);*/

        return router;
    }
    getPath(): string {
        return '/news';
    }

}