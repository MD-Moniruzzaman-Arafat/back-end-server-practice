const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
  },
  photo: {
    type: String,
    required: [true, 'A user must have a photo'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password
      },
      message: 'Passwords are not the same!',
    },
  },
})

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next()

  // Hash the password
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = undefined // Remove passwordConfirm field

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
