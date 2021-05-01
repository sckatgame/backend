const routes = require('express').Router();
const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.get('/user',UserController.index);
routes.post('/user',UserController.create);
routes.post('/validate',UserController.validateEmail);
routes.put('/user',UserController.update);

routes.get('/profile',ProfileController.index);
routes.post('/session',SessionController.create);

module.exports = routes;