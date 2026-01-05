import { Router } from 'express';
import { productController } from '../../controllers/products/products.controller.js';
import { validateId } from '../../middlewares/products/validateID.middleware.js';
import { validateData } from '../../middlewares/products/validateData.middleware.js';

const routerProducts = Router();

routerProducts.get('/test', (req, res) => {
    res.json({
        status: 'OK',
        mensagem: 'API produtos funcionando'
    })
})

// routerProducts.use('/:id', )

routerProducts.get('/', productController.listProducts)
routerProducts.get('/:id', validateId, productController.getProduct)
routerProducts.get('/search', productController.searchProducts)
routerProducts.post('/', validateData, productController.postProduct)
routerProducts.put('/:id', validateId, validateData, productController.putProduct)
routerProducts.patch('/:id', validateId, validateData, productController.patchProduct)
routerProducts.delete('/:id', validateId, productController.deleteProduct)

export { routerProducts }