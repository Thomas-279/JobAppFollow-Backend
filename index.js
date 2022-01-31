require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// const corsOptions = {
//     origin: 'http://localhost:3000/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/follow-jobs-app', {
    useNewUrlParser: true
})

// Import Routes
const authRouter = require('./app/routes/auth');
const rowsRouter = require('./app/routes/rows');
app.options('*', cors());
app.use('/api/user', cors(), authRouter);
app.use('/api/rows', cors(), rowsRouter);



app.listen(port, () => {
    console.log('Running on http://localhost:' + port);
});