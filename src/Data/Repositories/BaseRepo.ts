import { ObjectId } from "bson";
import { Db, MongoClient } from "mongodb";
import { connectToMongo } from "../../Core/Database/MongoConnection";


export abstract class BaseRepo<Model> {

    abstract readonly collectionName: string;

    findAll(filter: Object = {}) {
        return new Promise((resolve, reject) => {
            connectToMongo().then(db => (
                db.db.collection(this.collectionName).find(filter).toArray(function (err, res) {
                    if (err) return reject(err);
                    resolve(res);
                    db.mongoClient.close();
                })
            ));
        })
    }

    insert(model: Model): Promise<ObjectId | undefined> {
        return new Promise((resolve, reject) => {
            connectToMongo().then(db => (
                db.db.collection(this.collectionName).insertOne(
                    model, function (err, res) {
                        if (err) reject(err);
                        resolve(res?.insertedId);
                        db.mongoClient.close();
                    })
            ))
        })
    }

    update(id: string, model: Model) {
        return new Promise((resolve, reject) => {
            let _id: ObjectId;
            try {
                _id = new ObjectId(id);
            } catch (err) {
                return reject("invalid id");
            }

            connectToMongo().then(db => (
                db.db.collection(this.collectionName).updateOne({ _id }, { $set: model }, function (err, res) {
                    if (err) return reject(err);
                    resolve(res);
                    db.mongoClient.close();
                })
            ))

        })
    }

    delete(id: string) {
        return new Promise((resolve, reject) => {
            let _id: ObjectId;
            try {
                _id = new ObjectId(id);
            } catch (err) {
                return reject("invalid id");
            }

            connectToMongo().then((db) => (
                db.db.collection(this.collectionName).deleteOne({ _id }, function (err, res) {
                    if (err) return reject(err);
                    resolve(res);
                    db.mongoClient.close();
                })
            ));
        });
    }

    findById(id: string): Promise<Model> {
        return new Promise((resolve, reject) => {
            let _id: ObjectId;
            try {
                _id = new ObjectId(id)
            } catch (e) {
                return reject(new Error("invalid id"));
            }

            connectToMongo().then((d) => {
                return d.db.collection(this.collectionName).findOne({ _id }, function (err, result) {
                    if (err) return reject(err);
                    resolve(result as Model);
                    d.mongoClient.close();
                })
            })
        });
    }
}