const { Router } = require('express');

const router = Router();
const authentification = require('./middlewares/authentification');


const mainController = require('./controllers/mainController');

router.get('/', mainController.homePage);

router.post('/login', authentification.login);


module.exports = router;