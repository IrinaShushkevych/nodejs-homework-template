// created by Irina Shushkevych
const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')

const userSchema = Schema({ 
  name:{
      type: String,
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
    default: () => {return gravatar.url(this.email, {protocol: 'https'})}
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null
  },
  verify: {
    type: Boolean,
    default: false
  },
  verificationToken:{
    type: String,
    required: [true, 'Verify token is required']
  }
}, {versionKey: false, timestamps: true})

userSchema.pre('save', function(){
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(14))
})

userSchema.methods.updateAvatarURL = function(url){
  this.avatarURL = url
}

userSchema.methods.comparePassword = async function(password){
const res = await  bcrypt.compare(password, this.password)
return res
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