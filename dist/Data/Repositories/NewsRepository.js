"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = exports.NewsRepository = exports.BaseRepo = void 0;
var mongodb_1 = require("mongodb");
var News_Model_1 = require("../Models/News.Model");
var User_Model_1 = require("../Models/User.Model");
var url = "mongodb://localhost:27017/";
var connect = function () {
    return new Promise(function (resolve, reject) {
        mongodb_1.MongoClient.connect(url, function (err, mongoClient) {
            if (err)
                return reject(err.message);
            if (mongoClient) {
                resolve({ mongoClient: mongoClient, db: mongoClient.db('news-db') });
            }
            return reject(new Error("can't connect to db"));
        });
    });
};
var BaseRepo = /** @class */ (function () {
    function BaseRepo() {
    }
    BaseRepo.prototype.findAll = function (filter) {
        if (filter === void 0) { filter = {}; }
    };
    BaseRepo.prototype.insert = function (model) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connect().then(function (db) { return (db.db.collection(_this.collectionName).insertOne(model, function (err, res) {
                if (err)
                    reject(err);
                resolve(res === null || res === void 0 ? void 0 : res.insertedId.toJSON());
                db.mongoClient.close();
            })); });
        });
    };
    BaseRepo.prototype.update = function (id) {
    };
    BaseRepo.prototype.delete = function (id, model) {
    };
    return BaseRepo;
}());
exports.BaseRepo = BaseRepo;
var NewsRepository = /** @class */ (function (_super) {
    __extends(NewsRepository, _super);
    function NewsRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collectionName = 'news-collection';
        return _this;
    }
    return NewsRepository;
}(BaseRepo));
exports.NewsRepository = NewsRepository;
var UsersRepository = /** @class */ (function (_super) {
    __extends(UsersRepository, _super);
    function UsersRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collectionName = 'users';
        return _this;
    }
    return UsersRepository;
}(BaseRepo));
exports.UsersRepository = UsersRepository;
var newsRepo = new NewsRepository();
newsRepo.insert(new News_Model_1.News('Egypt vs Libya', 'we beat Libya 3-0 on thier staium'));
var usersRepo = new UsersRepository();
usersRepo.insert(new User_Model_1.User('mahmoud mamdouh', 'mahmoud@gmail.com'));
