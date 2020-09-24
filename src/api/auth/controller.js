import { sign } from '../../services/jwt'

export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: user.view(true) }))
    .then(user => res.status(200).json(user))
    .catch(next)
