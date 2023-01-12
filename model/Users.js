import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    email_phno : String,
    password: String,
    address: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;