const routes = require('express').Router();
const UserController = require('./controllers/UserController');

routes.get('/user',UserController.index);
routes.post('/user',UserController.create);

module.exports = routes;