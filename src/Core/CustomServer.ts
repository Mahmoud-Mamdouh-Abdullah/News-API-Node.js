import { RouteInterface } from "./Interfaces/Router.Interface";
import express from 'express';
import { AppMiddlewareInterface } from "./Interfaces/AppMiddleware.interface";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


/*const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => {  });
server.listen(3000);*/


export class CustomServer {


    private readonly _server = express();
    private io?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;

    route(router: RouteInterface) {

        this._server.use(router.getPath(), router.getRouter());
    }

    applySocketIO() {
        const httpServer = createServer(this._server);
        this.io = new Server(httpServer);

        this.io.on("connection", (socket) => {

            socket.on('send-message', function (message) {
                socket.broadcast.emit("new-message", message);
            })
        });

        return httpServer;
    }

    addUI(path: string) {
        this._server.use(express.static(path));
    }

    middleware(middleware: AppMiddlewareInterface) {
        this._server.use(middleware.getMiddleware());
    }

    listen(port: number) {
        this.applySocketIO().listen(port, () => {
            console.log('server running...');
            console.log(`server listen on port ${port}`);
        });
    }
}