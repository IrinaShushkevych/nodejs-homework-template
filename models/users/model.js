// created by Irina Shushkevych
const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const userSchema = Schema({ 
  name:{
      type: String,
      // required: true,
      minlength: 2,
      default: "Guest"
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  avatarURL: {
    type: String,
    default:null
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null
  }
}, {versionKey: false, timestamps: true})

userSchema.methods.setAvatarFromEmail = function(){
  this.avatarURL = gravatar.url(this.email, {protocol: 'https'})
}

userSchema.methods.updateAvatarURL = function(url){
  this.avatarURL = url
}

userSchema.methods.hashPassword = function(password){
   this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(14))
}

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.setToken = function(){
  const {SECRET_KEY} = process.env
  this.token = jwt.sign({id: this._id}, SECRET_KEY, { expiresIn: '5h'})
}

userSchema.methods.updateSubscription = function(value){
  this.subscription = value
}


const User = model('user', userSchema)


module.exports = User