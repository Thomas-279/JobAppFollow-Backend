const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    status: String
});

module.exports = mongoose.model('User', UserSchema)