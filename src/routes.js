const routes = require('express').Router();
const {celebrate,Joi, Segments} = require('celebrate');
const UserController = require('./controllers/UserController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post(
    '/users',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required()
        })
    }),
    UserController.index
);

routes.post(
    '/user',
    celebrate({
        [Segments.BODY]:Joi.object().keys({
            name:Joi.string().required(),
            email:Joi.string().required().email(),
            password:Joi.string().required(),
        })
    }),
    UserController.create
);

routes.post(
    '/validate',
    celebrate({
        [Segments.BODY]:Joi.object().keys({
            code:Joi.string().required(),
            email:Joi.string().required().email()
        })
    }),
    UserController.validateEmail
);

routes.post(
    '/password',
    celebrate({
        [Segments.BODY]:Joi.object().keys({
            email:Joi.string().required().email()
        })
    }),
    UserController.validatePassword
);

routes.get(
    '/profile',
    celebrate({
        [Segments.HEADERS]:Joi.object().keys({
            authorization:Joi.string().required()
        }).unknown()
    }),
    ProfileController.index
);

routes.post(
    '/session',
    celebrate({
        [Segments.BODY]:Joi.object().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required()
        })
    }),
    SessionController.create
);

module.exports = routes;