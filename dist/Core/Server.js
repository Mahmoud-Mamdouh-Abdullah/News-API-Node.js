"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var Server = /** @class */ (function () {
    function Server() {
        this._server = (0, express_1.default)();
    }
    Server.prototype.route = function (router) {
        this._server.use(router.getPath(), router.getRouter());
    };
    Server.prototype.addUI = function (path) {
        this._server.use(express_1.default.static(path));
    };
    Server.prototype.middleware = function (middleware) {
        this._server.use(middleware.getMiddleware());
    };
    Server.prototype.listen = function (port) {
        this._server.listen(port, function () {
            console.log('server running...');
            console.log("server listen on port " + port);
        });
    };
    return Server;
}());
exports.Server = Server;
