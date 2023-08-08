const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const Schema = mongoose.Schema;

const DBUserListShcema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  age: String,
  roles: String,
  position: String,
  salary: Number,
  currency: String
});

const DBloginedUserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const DBAdminSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password:{
    type: String,
    require: true,
  }
})

DBAdminSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


const maxAge = 60*60*24;

DBAdminSchema.methods.createToken =()=>{
 return jwt.sign({_id:this._id}, 'secretkey',{expiresIn:maxAge})
}

const loginedUser = mongoose.model("LoginedUser", DBloginedUserSchema);
const userList = mongoose.model("UserList", DBUserListShcema)
const adminSchema = mongoose.model("AdminSchema", DBAdminSchema)


module.exports = {loginedUser, userList, adminSchema};
