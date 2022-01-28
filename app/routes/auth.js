const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.post('/register', (req, res) => {
    res.send('Register');
})

router.get('/', async (req, res) => {
    res.send('hello');
})

router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find();
        res.send({ users })
    } catch (err) {
        console.log(err)
        throw err
    }
})

router.get('/one/:id', async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id})
        res.send({ user })
    } catch (err) {
        console.log(err)
        throw err
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body.email)
        if (!user) return res.status(400).send('Email is not found');
        if (req.body.password != user.password) return res.status(400).send('Wrong password');


        const validPass = await bcrypt.compare(req.body.password, user.password);
        console.log(validPass)
        // if (!validPass) return res.status(400).send('Invalid Password');
        res.send('Logged in ! Welcome ' + user.name);

    } catch (err) {
        console.log(err)
        throw err
    }
})


module.exports = router;