const routes = require('express').Router();

routes.get('/',(req,res) => res.send({'Ola ':'Mundo'}))

module.exports = routes;