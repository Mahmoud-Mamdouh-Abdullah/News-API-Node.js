"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
var mongodb_1 = require("mongodb");
var url = "mongodb://localhost:27017/";
var connectToMongo = function () {
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
exports.connectToMongo = connectToMongo;
