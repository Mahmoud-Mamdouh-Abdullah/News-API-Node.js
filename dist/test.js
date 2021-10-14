"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
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
var insert = function (collectionName, data) {
    return new Promise(function (resolve, reject) {
        connect().then(function (db) { return (db.db.collection(collectionName).insertOne(data, function (err, res) {
            if (err)
                reject(err);
            resolve(res === null || res === void 0 ? void 0 : res.insertedId.toJSON());
            db.mongoClient.close();
        })); });
    });
};
insert('news-collection', { title: 'Egypt vs Libya', content: 'we beat Libya 3-0 on thier staium' })
    .then(console.log);
