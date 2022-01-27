require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// const menuMiddleware = require('./app/middlewares/menuMiddleware');

// const app = express();
// const port = process.env.PORT || 5000;
// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/";
// const dbName = "follow-jobs-app";
// let db

// MongoClient.connect(url, function(err, client) {
//     if (err) {
//         throw err;
//     }
//     console.log("Connected successfully to the server");
//     db = client.db(dbName);
// });

const User = require('./app/models/user');

mongoose.connect('mongodb://localhost:27017/follow-jobs-app', {
    useNewUrlParser: true
}).then(() => {
    const app = express();
    const port = process.env.PORT || 5000;
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));

    app.get('/users', async (req, res) => {
        try {
            // const users = await db.collection('users').find({}).toArray()
            const users = await User.find();
            res.send({users})
        } catch (err) {
            console.log(err)
            throw err
        }
    })
    app.get('/', async (req, res) => {
        res.send('hello')
    })

    app.listen(port, () => {
        console.log('Running on http://localhost:' + port);
    });
}).catch(() => {
    console.log('Database connection failed')
})

// const router = require('./app/router');
// app.use(router);
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));

// app.get('/users', async (req, res) => {
//     try {
//         const users = await db.collection('users').find({}).toArray()
//         res.status(200).json(users)
//     } catch (err) {
//         console.log(err)
//         throw err
//     }
// })

// app.listen(port, () => {
//     console.log('Running on http://localhost:' + port);
// });