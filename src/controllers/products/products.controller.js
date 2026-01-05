import { products } from '../../mock/index.js' 

class ProductController {
    // Listar produtos e filtrar por categoria
    listProducts(req, res, next) {
        const { category } = req.query

        try {
            const filteredProducts = category 
                ? products.filter((p) => p.category === category)
                : products
            
            return res.status(200).json({ 
                "total": filteredProducts.length,
                "products list": filteredProducts
            })
        } catch (error) {
            return res.status(500).send('Erro interno')
        }
    }

    // Buscar produto por ID
    getProduct(req, res, next) {
        const { id } = req.params
        
        try {
            const index = products.findIndex((p) => p.id === parseInt(id))

            if (index <= -1) {
                res.status(404)
                throw new Error("Produto não encontrado!");
            }

            res.status(200).json(products[index])
        } catch (error) {
            return res.send(error.message)
        }
    }

    // Buscar produtos (search)
    searchProducts(req, res, next) {
        const { q } = req.query

        try {
            const filteredProducts = products.filter((p) => 
                p.name.toLowerCase().includes(q.toLowerCase()) ||
                p.category.toLowerCase().includes(q.toLowerCase())
            )

            return res.status(200).json({ 
                "total": filteredProducts.length,
                "products list": filteredProducts
            })
        } catch (error) {
            return res.status(500).send('Erro interno')
        }
    }

    // Adicionar produto
    postProduct(req, res, next) {
        const { name, price, category } = req.body 

        try {
            const product = {
                id: products.length + 1,
                name,
                price,
                category
            }

            products.push(product)

            return res.status(200).json({ "Produto adicionado": product })
        } catch (error) {
            return res.status(500).send('Erro interno')
        }
    }

    // Editar produto 
    putProduct(req, res, next) {
        const { id } = req.params
        const { name, price, category } = req.body

        try {
            const index = products.findIndex((p) => p.id === parseInt(id))

            if (index <= -1) {
                res.status(404)
                throw new Error("Produto não encontrado!");
            }

            products[index] = {
                id: products[index].id, 
                name, 
                price, 
                category 
            }

            return res.status(200).json(products[index])
        } catch (error) {
            return res.send(error.message)
        }
    }

    // Editar produto 
    patchProduct(req, res, next) {
        const { id } = req.params
        const { name, price, category } = req.body

        try {
            const index = products.findIndex((p) => p.id === parseInt(id))

            if (index === -1) {
                res.status(404)
                throw new Error("Produto não encontrado!");
            }

            products[index] = {
                id: products[index].id, 
                name, 
                price, 
                category 
            }

            return res.status(200).json(`Produto ${products[index].name} atualizado!`)
        } catch (error) {
            return res.send(error.message)
        }
    }

    deleteProduct(req, res, next) {
        const { id } = req.params

        try {
            const index = products.findIndex((p) => p.id === parseInt(id))

            if (index <= -1) {
                res.status(404)
                throw new Error("Produto não encontrado!");
            }
            
            products.splice(index, 1)

            res.status(200).send("Produto excluido com sucesso!")
        } catch (error) {
            return res.send(error.message)
        }
    }
}

export const productController = new ProductController()
