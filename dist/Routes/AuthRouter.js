"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express_1 = __importDefault(require("express"));
var AuthController_1 = require("../Controller/AuthController");
var AuthRouter = /** @class */ (function () {
    function AuthRouter() {
    }
    AuthRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.post('/login', AuthController_1.Login);
        return router;
    };
    AuthRouter.prototype.getPath = function () {
        return '/auth';
    };
    return AuthRouter;
}());
exports.AuthRouter = AuthRouter;
