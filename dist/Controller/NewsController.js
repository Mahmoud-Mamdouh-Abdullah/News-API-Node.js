"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNews = exports.editNews = exports.getById = exports.getByQuery = exports.getAll = exports.createNews = void 0;
var NewsService_1 = require("../Services/NewsService");
var newsService = new NewsService_1.NewsService();
function createNews(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var title, content, news, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    title = req.body.title;
                    content = req.body.content;
                    return [4 /*yield*/, newsService.create({ title: title, content: content })];
                case 1:
                    news = _a.sent();
                    res.send({ news: news });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(404).send({ message: err_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createNews = createNews;
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var news, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, newsService.all()];
                case 1:
                    news = _a.sent();
                    res.send({ news: news, user: req.body.user });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    res.status(404).send({ message: e_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAll = getAll;
function getByQuery(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, news, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = {
                        $or: [
                            { title: { $regex: req.params.q, $options: 'i' } },
                            { content: { $regex: req.params.q, $options: 'i' } }
                        ]
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, newsService.all(query)];
                case 2:
                    news = _a.sent();
                    res.send(news);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.status(404).send({ message: e_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getByQuery = getByQuery;
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var news, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, newsService.findByIdOrFail(req.params.id)];
                case 1:
                    news = _a.sent();
                    res.send(news);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    res.status(404).send({ message: e_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getById = getById;
function editNews(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, newsService.update(id, { title: req.body.title, content: req.body.content })];
                case 2:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    res.status(404).send({ message: err_2.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.editNews = editNews;
function deleteNews(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, newsService.delete(id)];
                case 2:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _a.sent();
                    res.status(404).send({ message: e_4.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteNews = deleteNews;
