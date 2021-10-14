import { Db, MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/";

export const connectToMongo = (): Promise<{ mongoClient: MongoClient, db: Db }> => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, mongoClient: MongoClient | undefined) {
            if (err) return reject(err.message);
            if (mongoClient) {
                resolve({ mongoClient, db: mongoClient.db('news-db') });
            }
            return reject(new Error("can't connect to db"));
        });
    })
}
