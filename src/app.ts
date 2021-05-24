import express, { Application } from 'express';
import mongodb from 'mongodb';
import { DATABASE_COLLECTION_NAME, DATABASE_NAME, DATABASE_URL, SERVER_PORT } from "./config/config";

const app: Application = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

const MongoClient = mongodb.MongoClient;
let db = undefined;
let collection = undefined;
MongoClient.connect(DATABASE_URL, {useUnifiedTopology: true}, function (err, connection) {
    if (err) throw err;
    db = connection.db(DATABASE_NAME);
    collection = db.collection(DATABASE_COLLECTION_NAME);
});

interface ResponseBody {
    status: number;
    payload: any;
}

const response = (status: number = 200, payload: any = null): ResponseBody => {
    return {status: status, payload: payload};
};

app.post('/movie/:movieId/like', ((req, res) => {
    const movieId: number = Number(req.params.movieId);
    collection.find({movieId: movieId}).count().then((count: number) => {
        if (count === 0) {
            collection.insertOne({movieId: movieId}, error => {
                if (error) {
                    return res.send(response(500, error.toString()));
                } else {
                    return res.send(response(200));
                }
            });
        } else {
            return res.send(response(409));
        }
    });
}));

app.delete('/movie/:movieId/like', ((req, res) => {
    const movieId: number = Number(req.params.movieId);
    collection.find({movieId: movieId}).count().then((count: number) => {
        if (count > 0) {
            collection.deleteMany({movieId: movieId}, error => {
                if (error) {
                    return res.send(response(500, error.toString()));
                } else {
                    return res.send(response(200));
                }
            });
        } else {
            return res.send(response(409));
        }
    });
}));

app.get('/likes', (req, res) => {
    collection.find({}).toArray(function (error, result) {
        if (error) {
            return res.send(response(500, error.toString()));
        } else {
            return res.send(response(200, result));
        }
    });
});

app.get('/movie/:movieId', ((req, res) => {
    const movieId: number = Number(req.params.movieId);
    collection.find({movieId: movieId}).count().then((count: number) => {
        if (count > 0) {
            return res.send(response(204));
        } else {
            return res.send(response(404));
        }
    });
}));

app.listen(SERVER_PORT, () => {
    console.log(`'server is running on port ${SERVER_PORT}'`);
});
