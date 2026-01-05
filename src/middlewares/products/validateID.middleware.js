export function validateId(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'ID é obrigatório'
    });
  }

  return next();
}
