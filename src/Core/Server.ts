import { RouteInterface } from "./Interfaces/Router.Interface";
import express from 'express';
import { AppMiddlewareInterface } from "./Interfaces/AppMiddleware.interface";

export class Server {
    
    
    private readonly _server = express();

    route(router: RouteInterface) {
        this._server.use(router.getPath(), router.getRouter());
    }
    
    addUI(path: string) {
        this._server.use(express.static(path));
    }

    middleware(middleware: AppMiddlewareInterface) {
        this._server.use(middleware.getMiddleware());
    }

    listen(port: number) {
        this._server.listen(port, () => {
            console.log('server running...');
            console.log(`server listen on port ${port}`);
        });
    }
}