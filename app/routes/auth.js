const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const verify = require('./verifyToken');

router.get('/', (req, res) => {
    res.send('home');
    console.log(User.length)
})

router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        status: req.body.status
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.get('/allusers', verify, async (req, res) => {
    try {
        const users = await User.find();
        res.send({ users })
    } catch (error) {
        console.log(error)
        throw error
    }
})

router.get('/one/:id', verify, async (req, res) => {
    try {
        const user = await User.findOne({id: req.params.id})
        res.send({ user })
    } catch (error) {
        console.log(error)
        throw error
    }
})

router.delete('/one/:id', verify, async (req, res) => {
    try {
        await User.findOneAndDelete({ id: req.params.id });
        res.send('User ' + req.params.id + ' deleted')
    } catch (error) {
        console.log(error)
        throw error
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Email is not found');

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send('Invalid Password');

        // Create and assign a token
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200)
            .header('auth-token', token)
            .send({ email: user.email, name: user.name, status: user.status, token: token });

    } catch (error) {
        console.log(error)
        throw error
    }
});

router.get('/verifyToken', verify, async(req, res) => {
    try {
        res.send('Token Valid')
    } catch (error) {
        console.log('token invalid', error);
    }
})


module.exports = router;