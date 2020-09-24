import mongoose, { Schema } from 'mongoose'

const scheduleSchema = new Schema({
  date: {
    type: Date
  },
  description: {
    type: String
  },
  createdBy: {
    type: Schema.Types.ObjectId
  },
  suggestedAmount: {
    type: Number,
  },
  guests: [{
    name: {
      type: String
    },
    amount: {
      type: Number,
      default: 0
    },
    contributed: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
  }]
},
{
  timestamps: true
})

scheduleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_, model) { delete model._id }
});

const model = mongoose.model('Schedule', scheduleSchema)

export default model
