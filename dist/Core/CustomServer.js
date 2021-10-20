"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomServer = void 0;
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
/*const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => {  });
server.listen(3000);*/
var CustomServer = /** @class */ (function () {
    function CustomServer() {
        this._server = (0, express_1.default)();
    }
    CustomServer.prototype.route = function (router) {
        this._server.use(router.getPath(), router.getRouter());
    };
    CustomServer.prototype.applySocketIO = function () {
        var httpServer = (0, http_1.createServer)(this._server);
        this.io = new socket_io_1.Server(httpServer);
        this.io.on("connection", function (socket) {
            socket.on('send-message', function (message) {
                socket.broadcast.emit("new-message", message);
            });
        });
        return httpServer;
    };
    CustomServer.prototype.addUI = function (path) {
        this._server.use(express_1.default.static(path));
    };
    CustomServer.prototype.middleware = function (middleware) {
        this._server.use(middleware.getMiddleware());
    };
    CustomServer.prototype.listen = function (port) {
        this.applySocketIO().listen(port, function () {
            console.log('server running...');
            console.log("server listen on port " + port);
        });
    };
    return CustomServer;
}());
exports.CustomServer = CustomServer;
