import { Router } from 'express';
import { routerProducts } from './products/routes.js';

const router = Router();

router.get('/test', (req, res) => {
    res.json({
        status: 'OK',
        mensagem: 'API funcionando'
    })
})

router.use('/products', routerProducts)


export { router }