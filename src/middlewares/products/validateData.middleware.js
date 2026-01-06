export function validateData(req, res, next) {
    const { name, price, category, description, brand, stock, rating, reviews } = req.body

    const requiredFields = [
        { field: 'name', value: name },
        { field: 'price', value: price },
        { field: 'category', value: category },
        { field: 'description', value: description },
        { field: 'brand', value: brand },
        { field: 'stock', value: stock },
        { field: 'rating', value: rating },
        { field: 'reviews', value: reviews }
    ]

    const missingFields = requiredFields.filter(({ value }) => !value || value === '')

    if (missingFields.length > 0) {
        const fieldNames = missingFields.map(({ field }) => `"${field}"`).join(', ')
        return res.status(400).json({ error: `Os campos ${fieldNames} são obrigatórios` })
    }

    // Validações adicionais
    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'O campo "price" deve ser um número positivo' })
    }

    if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
        return res.status(400).json({ error: 'O campo "stock" deve ser um número inteiro não negativo' })
    }

    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        return res.status(400).json({ error: 'O campo "rating" deve ser um número entre 0 e 5' })
    }

    if (typeof reviews !== 'number' || reviews < 0 || !Number.isInteger(reviews)) {
        return res.status(400).json({ error: 'O campo "reviews" deve ser um número inteiro não negativo' })
    }

    return next()
}
