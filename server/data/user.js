const mongoose = require("mongoose");
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

const loginedUser = mongoose.model("LoginedUser", DBloginedUserSchema);
const userList = mongoose.model("UserList", DBUserListShcema)
module.exports = {loginedUser, userList};
