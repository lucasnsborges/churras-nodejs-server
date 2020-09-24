import User from './model'

export const getCurrentUser = ({ user }, res) =>
  res.json(user.view(true))

export const create = async ({ body }, res, next) => {
  const create = await User.create(body)
    .then(user => user.view(true))
    .catch(err => err);

  if (create.name === "MongoError" && create.code === 11000) {
    return res.status(409).json({
      error: "Já existe uma conta criada com esse email"
    });
  }

  return res.status(201).send(create);
}
