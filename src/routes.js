const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

const routes = new Router();

routes.post('/users', UserController.store);


routes.post('/sessions', SessionController.store);


//Todas as rotas abaixo precisam de um token
routes.use(authMiddleware);

routes.put('/users',UserController.update);





module.exports = routes;