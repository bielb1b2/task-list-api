const { Router } = require('express');

const authMiddleware = require('./app/middlewares/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const TaskController = require('./app/controllers/TaskController');


const routes = new Router();

routes.post('/users', UserController.store);


routes.post('/sessions', SessionController.store);


//Todas as rotas abaixo precisam de um token
routes.use(authMiddleware);

routes.put('/users',UserController.update);


routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);





module.exports = routes;