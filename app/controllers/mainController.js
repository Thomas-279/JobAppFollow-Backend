const users = require('../data/users.json');
const rows = require('../data/rows.json');
const db = require('mongodb');

const mainController = {
    homePage: async (req, res) => {
        res.send("hello wooooorld");
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await db.collection('users').find({}).toArray()
            res.status(200).json(users)
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    getOneUser: async (req, res) => {
        const id = parseInt(req.params.id).toString();
        console.log(id);
        const user = users.findOne(user => user.id === id);
        res.status(200).json(user);
    },

    deleteOneUser: async (req, res) => {
        const id = parseInt(req.params.id).toString();
        const row = users.findOne(user => user.id === id);
        users.splice(users.indexOf(row), 1);
        res.status(200).json(users);
    },
    
    getAllRows: async (req, res) => {
        res.status(200).json(rows);
    },

    getOneRow: async (req, res) => {
        const id = parseInt(req.params.id).toString();
        console.log(id);
        const row = rows.findOne(row => row.id === id);
        res.status(200).json(row);
    },

    deleteOneRow: async (req, res) => {
        const id = parseInt(req.params.id).toString();
        const row = rows.findOne(row => row.id === id);
        rows.splice(rows.indexOf(row), 1);
        res.status(200).json(rows);
    }
};

module.exports = mainController;