import express, { Application, Request, Response } from 'express';
import mongodb from 'mongodb';
import cors from 'cors';
import { DATABASE_COLLECTION_NAME, DATABASE_NAME, DATABASE_URL, SERVER_PORT } from "./config/config";

const app: Application = express();
app.use(cors);
app.use(express.json());

const MongoClient = mongodb.MongoClient;
let db = undefined;
let collection = undefined;
MongoClient.connect(DATABASE_URL, {useUnifiedTopology: true}, function (err, connection) {
    if (err) throw err;
    db = connection.db(DATABASE_NAME);
    collection = db.collection(DATABASE_COLLECTION_NAME);
});

app.get('/', (req: Request, res: Response) => {
    return res.status(200).send({
        message: "Hello World!",
    });
});

app.listen(SERVER_PORT, () => {
    console.log(`'server is running on port ${SERVER_PORT}.'`);
});
