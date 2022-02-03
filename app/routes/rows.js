const router = require('express').Router();
const Rows = require('../models/rows');

const verify = require('./verifyToken');

router.get('/allrows', verify, async (req, res) => {
    try {
        const rows = await Rows.find();
        res.send({ rows })
    } catch (error) {
        console.log(error)
        throw error
    }
});

router.post('/addone', verify, async (req, res) => {
    const row = new Rows({
        id: req.body.id,
        firm: req.body.firm,
        date: req.body.date,
        via: req.body.via,
        job: req.body.job,
        comment: req.body.comment,
        status: req.body.status,
    })
    try {
        const savedRow = await row.save();
        res.send(savedRow);
    } catch (error) {
        console.log(error)
        throw error
    }
})

router.delete('/one/:id', verify, async (req, res) => {
    try {
        await Rows.findOneAndDelete({ id: req.params.id });
        res.send('Row ' + req.params.id + ' deleted')
    } catch (error) {
        console.log(error)
        throw error
    }
})

module.exports = router;