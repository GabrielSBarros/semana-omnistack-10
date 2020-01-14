const { Router } = require('express');
const routes = Router();
const DevControler = require('./controlers/DevController');
const SearchController = require('./controlers/SearchController');

routes.get('/devs', DevControler.index);
routes.post('/devs', DevControler.store);

routes.get('/search', SearchController.index);

module.exports = routes;