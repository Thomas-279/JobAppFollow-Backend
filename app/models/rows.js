const mongoose = require('mongoose');

const RowsSchema = new mongoose.Schema({
    id: Number,
    firm: String,
    date: String,
    via: String,
    job: String,
    comment: String,
    status: String
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Rows', RowsSchema)