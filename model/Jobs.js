const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema({
  organization: String,
  description: String,
  title: String
});

const Jobs = mongoose.model('Job', JobSchema);

module.exports = Jobs;