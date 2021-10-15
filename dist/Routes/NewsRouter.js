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
        router.get("/", NewsController_1.getAll);
        router.get("/:id", NewsController_1.getById);
        router.get("/query/:q", NewsController_1.getByQuery);
        router.put("/:id", NewsController_1.editNews);
        router.delete("/:id", NewsController_1.deleteNews);
        return router;
    };
    NewsRouter.prototype.getPath = function () {
        return '/news';
    };
    return NewsRouter;
}());
exports.NewsRouter = NewsRouter;
