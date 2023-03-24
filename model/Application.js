const mongoose = require("mongoose");
const { Schema } = mongoose;

const ApplicationSchema = new Schema({
  jobId: String,
  email: String
});

const Applications = mongoose.model('Applications', ApplicationSchema);

module.exports = Applications;