import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import { env } from '../../config'

const userSchema = new Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
},
{
  timestamps: true
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  const rounds = 9

  bcrypt.hash(this.password, rounds).then((hash) => {
    this.password = hash
    next()
  }).catch(next)
})

userSchema.methods = {
  view () {
    let view = {}
    let fields = [
      'id',
      'email',
      'createdAt'
    ]

    fields.forEach((field) => { view[field] = this[field] })

    return view
  },

  authenticate (password) {
    return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
  }
}

const model = mongoose.model('User', userSchema)

export default model
