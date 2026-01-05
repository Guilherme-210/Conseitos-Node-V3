import { Router } from 'express';
import { productController as PC } from '../../controllers/products/products.controller.js';
import { validateId } from '../../middlewares/products/validateID.middleware.js';
import { validateData } from '../../middlewares/products/validateData.middleware.js';

const routerProducts = Router();

routerProducts.get('/test', (req, res) => {
    res.json({
        status: 'OK',
        mensagem: 'API produtos funcionando'
    })
})

routerProducts.get('/', PC.listProducts)

routerProducts.get('/search', PC.searchProducts)

routerProducts.post('/', validateData, PC.postProduct)

routerProducts.use('/:id', validateId)

routerProducts.get('/:id', PC.getProduct)

routerProducts.put('/:id', validateData, PC.putProduct)

routerProducts.patch('/:id', validateData, PC.patchProduct)

routerProducts.delete('/:id', PC.deleteProduct)

export { routerProducts }