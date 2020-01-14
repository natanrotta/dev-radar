/*
    Verbos HTTP: GET, POST, PUT, DELETE

    Tipo de parâmetros:
    -Query Params: acessamos através de: request.query, usamos em: (Filtro, ordenação, paginação. [...]);
    -Route Params: acessamos através de: request.params (Identificar um recurso na alteração ou remoção, Ex: /users/:id);
    -Body: acessamos através de: request.body (Dados para a criação ou alteração de um registro);
*/
const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;