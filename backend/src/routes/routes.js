import { Router } from 'express';
const routes = new Router();
import users from '../controllers/UsersController.js';
import sessions from '../controllers/SessionsController.js';
import auth from '../middlewares/auth.js';
import checkId from '../middlewares/checkId.js';

routes.get('/', (req, res) => {
    res.render('index', {
        title: 'PokeLanding',
        showSearchbar: false,
        linkName: 'Pokedex',
        link: '/pokedex',
        scripts: [
            { src: '/assets/js/modal.js', type: 'module' },
            { src: '/assets/js/header.js' },
            { src: '/assets/js/cpfMask.js' },
            { src: '/assets/js/cpfValidate.js' },
            { src: '/assets/js/cpfListener.js' },
            { src: '/assets/js/auth.js', type: 'module' },
            { src: '/assets/js/carousel-auto.js', type: 'module' },
            { src: '/assets/js/contato.js', type: 'module' }
        ]
    });
});

routes.get('/pokedex', (req, res) => {
    res.render('pokedex', {
        title: 'Pokedex',
        showSearchbar: true,
        linkName: 'Voltar',
        link: '/',
        scripts: [
            { src: '/assets/js/modal.js', type: 'module' },
            { src: '/assets/js/header.js' },
            { src: '/assets/js/cpfMask.js' },
            { src: '/assets/js/cpfValidate.js' },
            { src: '/assets/js/cpfListener.js' },
            { src: '/assets/js/auth.js', type: 'module' },
            { src: '/assets/js/contato.js', type: 'module' },
            { src: '/assets/js/main.js' }
        ]
    });
});

routes.get('/details', (req, res) => {
    res.render('details', {
        title: 'Pokedex',
        showSearchbar: true,
        link: '/',
        scripts: [
            { src: '/assets/js/modal.js', type: 'module' },
            { src: '/assets/js/header.js' },
            { src: '/assets/js/cpfMask.js' },
            { src: '/assets/js/cpfValidate.js' },
            { src: '/assets/js/cpfListener.js' },
            { src: '/assets/js/auth.js', type: 'module' },
            { src: '/assets/js/contato.js', type: 'module' },
            { src: '/assets/js/main.js' }
        ]
    });
});

routes.post('/sessions', (sessions.create));

routes.post('/users', (users.create));

routes.use(auth);

routes.param('id', checkId);

routes.get('/users/:id', (users.show));

routes.put('/users/:id', (users.update));

routes.delete('/users/:id', (users.destroy));

export default routes;
