const routes = require('express').Router();
const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');

routes.get('/user',UserController.index);
routes.post('/user',UserController.create);

routes.get('/profile',ProfileController.index);

module.exports = routes;