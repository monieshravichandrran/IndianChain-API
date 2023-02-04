const mongoose = require("mongoose");
const { Schema } = mongoose;

const PermissionSchema = new Schema({
    citizen: String,
    authority: String,
    type: Number
});

const Permission = mongoose.model('User', Permission);

module.exports = Permission;