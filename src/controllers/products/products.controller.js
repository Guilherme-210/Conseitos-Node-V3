import crypto from 'node:crypto'
import { products } from '../../mock/index.js' 

class ProductController {
    // Listar produtos e filtrar por categoria
    listProducts(req, res, next) {
        const { category } = req.query

        try {
            let filteredProducts = products

            if (category) {
                filteredProducts = products.filter((p) => p.category.toLowerCase() === category.toLowerCase())
            }

            return res.status(200).json({
                total: filteredProducts.length,
                products: filteredProducts
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    // Buscar produto por ID
    getProduct(req, res, next) {
        const { id } = req.params
        
        try {
            const product = products.find((p) => p.id === id)

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' })
            }

            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
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
                total: filteredProducts.length,
                products: filteredProducts
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    // Adicionar produto
    postProduct(req, res, next) {
        const { name, price, category, description, brand, stock, rating, reviews } = req.body 

        try {
            const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

            const product = {
                id: crypto.randomUUID(),
                name,
                price,
                category,
                slug,
                description,
                brand,
                stock,
                rating,
                reviews
            }

            products.push(product)

            return res.status(201).json({ message: 'Produto adicionado com sucesso', product })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    // Editar produto (update completo)
    putProduct(req, res, next) {
        const { id } = req.params
        const { name, price, category, description, brand, stock, rating, reviews } = req.body

        try {
            const index = products.findIndex((p) => p.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Produto não encontrado' })
            }

            const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

            products[index] = {
                id: products[index].id, 
                name, 
                price, 
                category,
                slug,
                description,
                brand,
                stock,
                rating,
                reviews 
            }

            return res.status(200).json({ message: 'Produto atualizado com sucesso', product: products[index] })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    // Editar produto (update parcial)
    patchProduct(req, res, next) {
        const { id } = req.params
        const updates = req.body

        try {
            const index = products.findIndex((p) => p.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Produto não encontrado' })
            }

            // Se name for atualizado, regenerar slug
            if (updates.name) {
                updates.slug = updates.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
            }

            // Merge parcial
            Object.assign(products[index], updates)

            return res.status(200).json({ message: 'Produto atualizado com sucesso', product: products[index] })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    deleteProduct(req, res, next) {
        const { id } = req.params

        try {
            const index = products.findIndex((p) => p.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Produto não encontrado' })
            }
            
            products.splice(index, 1)

            return res.status(200).json({ message: 'Produto excluído com sucesso' })
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
}

export const productController = new ProductController()
