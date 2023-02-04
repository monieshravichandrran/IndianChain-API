const mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestSchema = new Schema({
    citizen: String,
    authority: String,
    type: Number
});

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;