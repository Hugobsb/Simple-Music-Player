const { Router } = require('express');
const routes = Router();

const SongController = require('./controllers/SongController');

routes.get('/', (req, res, next) => {
    if (req.url !== '/') next();
    else res.sendFile('./index.html', { root: 'public' });
});

routes.get('/getSongs', SongController.getSongs);

module.exports = routes;