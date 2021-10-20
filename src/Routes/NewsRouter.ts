import express from "express";
import { IRouter } from "express-serve-static-core";
import { RouteInterface } from "../Core/Interfaces/Router.Interface";
import { createNews, deleteNews, editNews, getAll, getByQuery, getById} from '../Controller/NewsController'
import { AuthMiddleware } from "../Middleware/AuthMiddleware";


export class NewsRouter implements RouteInterface {


    getRouter(): IRouter {
        const router = express.Router();

        router.use((new AuthMiddleware()).getMiddleware());

        router.post("/", createNews);

        router.get("/", getAll);

        router.get("/:id", getById)

        router.get("/query/:q", getByQuery);


        router.put("/:id", editNews);

        router.delete("/:id", deleteNews);

        return router;
    }
    getPath(): string {
        return '/news';
    }

}