"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
var express_1 = __importDefault(require("express"));
var UserController_1 = require("../Controller/UserController");
var UsersRouter = /** @class */ (function () {
    function UsersRouter() {
    }
    UsersRouter.prototype.getPath = function () {
        return ('/users');
    };
    UsersRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.get('/', UserController_1.allUsers);
        router.post('/', UserController_1.createUser);
        return router;
    };
    return UsersRouter;
}());
exports.UsersRouter = UsersRouter;
