require('dotenv').config();

const express = require('express');

// const menuMiddleware = require('./app/middlewares/menuMiddleware');

const app = express();
const port = process.env.PORT || 5000;
const router = require('./app/router');


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.use(menuMiddleware);

app.use(router);

app.listen(port, () => {
    console.log('Running on http://localhost:' + port);
});