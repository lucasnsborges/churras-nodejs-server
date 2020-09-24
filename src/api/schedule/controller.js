import model from './model'

export const get = ({ user }, res) =>
  model.find({ createdBy: user.id })
    .then(list => res.status(200).json(list))
    .catch(error => error)

export const create = async ({ user, body }, res) => {
  body.createdBy = user.id

  return model.create(body)
    .then(list => res.status(201).json(list))
    .catch(error => error)
}

export const addGuest = async ({ params, body }, res) => {
  const guest = {
    name: body.name,
    amount: body.amount
  }

  const response = await model.findOneAndUpdate(
    { _id: params.id },
    { $push: { guests: guest }},
    { new: true }
  ).catch(error => error)

  if (response.id) {
    return res.status(201).json({ guests: response.guests })
  }

  return res.status(400).json({ error: 'unable to add guest' })
}

export const updateGuest = async ({ params, body }, res) => {
  const { amount, contributed } = body

  const modified = {}

  if (typeof amount === 'number') {
    modified['guests.$.amount'] = amount
  }

  if (typeof contributed === 'boolean') {
    modified['guests.$.contributed'] = contributed
  }

  const response = await model.updateOne(
    { _id: params.id, "guests._id": params.guestId },
    { $set: modified }
  ).catch(error => error)

  if (response.nModified === 1) {
    return res.status(200).json({ updated: true })
  }

  return res.status(400).json({ error: 'unable update suggested amount guest' })
}

export const disableGuest = async ({ params }, res) => {
  const response = await model.updateOne(
    { _id: params.id, "guests._id": params.guestId },
    { $set: {'guests.$.active': false }}
  ).catch(error => error)

  if (response.nModified === 1) {
    return res.status(200).json({ removed: true })
  }

  return res.status(400).json({ error: 'unable at remove guest' })
}
