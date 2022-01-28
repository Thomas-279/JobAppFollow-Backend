const router = require('express').Router();
const Rows = require('../models/rows');

router.get('/allrows', async (req, res) => {
    try {
        const rows = await Rows.find();
        res.send({ rows })
    } catch (err) {
        console.log(err)
        throw err
    }
})

router.delete('/one/:id', async (req, res) => {
    try {
        await Rows.findOneAndDelete({ id: req.params.id });
        res.send('Row ' + req.params.id + ' deleted')
    } catch (error) {
        console.log(error)
        throw error
    }
})

module.exports = router;