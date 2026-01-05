export function validateId(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID é obrigatório' });
  }

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidRegex.test(id)) {

    return res.status(400).json({ message: 'O ID informado é inválido!' });
  }

  return next();
}
