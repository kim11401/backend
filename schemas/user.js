const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    nickName: {
      type: String,
      required: true,
      unique: true
    },
    salt: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
