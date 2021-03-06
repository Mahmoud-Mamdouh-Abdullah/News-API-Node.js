"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepo = void 0;
var bson_1 = require("bson");
var MongoConnection_1 = require("../../Core/Database/MongoConnection");
var BaseRepo = /** @class */ (function () {
    function BaseRepo() {
    }
    BaseRepo.prototype.findAll = function (filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return new Promise(function (resolve, reject) {
            (0, MongoConnection_1.connectToMongo)().then(function (db) { return (db.db.collection(_this.collectionName).find(filter).toArray(function (err, res) {
                if (err)
                    return reject(err);
                resolve(res);
                db.mongoClient.close();
            })); });
        });
    };
    BaseRepo.prototype.insert = function (model) {
        var _this = this;
        model.created_at = new Date().toISOString();
        model.updated_at = new Date().toISOString();
        return new Promise(function (resolve, reject) {
            (0, MongoConnection_1.connectToMongo)().then(function (db) { return (db.db.collection(_this.collectionName).insertOne(model, function (err, res) {
                if (err)
                    reject(err);
                resolve(res === null || res === void 0 ? void 0 : res.insertedId);
                db.mongoClient.close();
            })); });
        });
    };
    BaseRepo.prototype.update = function (id, model) {
        var _this = this;
        model.updated_at = new Date().toISOString();
        return new Promise(function (resolve, reject) {
            var _id;
            try {
                _id = new bson_1.ObjectId(id);
            }
            catch (err) {
                return reject("invalid id");
            }
            (0, MongoConnection_1.connectToMongo)().then(function (db) { return (db.db.collection(_this.collectionName).updateOne({ _id: _id }, { $set: model }, function (err, res) {
                if (err)
                    return reject(err);
                resolve(res);
                db.mongoClient.close();
            })); });
        });
    };
    BaseRepo.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _id;
            try {
                _id = new bson_1.ObjectId(id);
            }
            catch (err) {
                return reject("invalid id");
            }
            (0, MongoConnection_1.connectToMongo)().then(function (db) { return (db.db.collection(_this.collectionName).deleteOne({ _id: _id }, function (err, res) {
                if (err)
                    return reject(err);
                resolve(res);
                db.mongoClient.close();
            })); });
        });
    };
    BaseRepo.prototype.findById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var _id;
            try {
                _id = new bson_1.ObjectId(id);
            }
            catch (e) {
                return reject(new Error("invalid id"));
            }
            (0, MongoConnection_1.connectToMongo)().then(function (d) {
                return d.db.collection(_this.collectionName).findOne({ _id: _id }, function (err, result) {
                    if (err)
                        return reject(err);
                    resolve(result);
                    d.mongoClient.close();
                });
            });
        });
    };
    BaseRepo.prototype.findOne = function (filter) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            (0, MongoConnection_1.connectToMongo)().then(function (db) { return (db.db.collection(_this.collectionName).findOne(filter, function (err, res) {
                if (err)
                    return reject(err);
                resolve(res);
                db.mongoClient.close();
            })); });
        });
    };
    return BaseRepo;
}());
exports.BaseRepo = BaseRepo;
