require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/follow-jobs-app', {
    useNewUrlParser: true
})

// Import Routes
const authRouter = require('./app/routes/auth');
const rowsRouter = require('./app/routes/rows')
app.use('/api/user', authRouter);
app.use('/api/rows', rowsRouter);



app.listen(port, () => {
    console.log('Running on http://localhost:' + port);
});