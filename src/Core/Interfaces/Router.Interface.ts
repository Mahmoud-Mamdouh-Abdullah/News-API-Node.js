import { IRouter } from "express-serve-static-core";

export interface RouteInterface {
    getRouter(): IRouter;

    getPath() : string;
}