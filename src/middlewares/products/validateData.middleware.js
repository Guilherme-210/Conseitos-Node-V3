export function validateData(req, res, next) {
  const { name, price, category } = req.body

  try {
    if (!name || name === '' ) {
      res.status(400)
      throw new Error('O campo "nome" é obrigatorios!');
  }
  if (!price || price === '') {
      res.status(400)
      throw new Error('O campos "preço" é obrigatorios!');
  }
  if (!category || category === '') {
      res.status(400)
      throw new Error('O campos "categoria" é obrigatorios!');
  }

  return next();
  } catch (error) {
            return res.send(error.message)
  }
}
