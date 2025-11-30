const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
    },
    email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 250
    },
    password: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = mongoose.model('User', userSchema);



function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(1024).required()
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;