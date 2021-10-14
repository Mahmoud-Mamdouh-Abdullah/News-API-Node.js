"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRouter = void 0;
var express_1 = __importDefault(require("express"));
var NewsController_1 = require("../Controller/NewsController");
var NewsRouter = /** @class */ (function () {
    function NewsRouter() {
    }
    NewsRouter.prototype.getRouter = function () {
        var router = express_1.default.Router();
        router.post("/", NewsController_1.createNews);
        /*router.get("/", getAll);

        router.get("/:id", getByID)

        router.get("/query/:q", getByQuery);


        router.put("/:id", editNews);

        router.delete("/:id", deleteNews);*/
        return router;
    };
    NewsRouter.prototype.getPath = function () {
        return '/news';
    };
    return NewsRouter;
}());
exports.NewsRouter = NewsRouter;
