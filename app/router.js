const { Router } = require('express');

const router = Router();

const authentification = require('./middlewares/authentification');

const mainController = require('./controllers/mainController');

router.get('/', mainController.homePage);

router.get('/users', mainController.getAllUsers);
router.get('/users/:id', mainController.getOneUser);
router.delete('/rows/:id', mainController.deleteOneUser);

router.get('/rows', mainController.getAllRows);
router.get('/rows/:id', mainController.getOneRow);
router.delete('/rows/:id', mainController.deleteOneRow);

router.post('/login', authentification.login);


module.exports = router;