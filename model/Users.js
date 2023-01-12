const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    email : {type : String, required : true},
    password: {type : String , required : true},
    address: {type : String, required : true},
    type: {type : Number, required : true}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;