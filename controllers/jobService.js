const Jobs = require("../model/Jobs");

const addJob = async (organization, description, title) => {
  //const data = await Jobs.find({ organization: organization, description: description, title: title });
  const result = await Jobs.collection.insertOne({ organization, description, title });
  return;
};

const getJob = async (email) => {
  const data = await Jobs.find({ citizen: email });
  return data;
};

const getAllJob = async (email) => {
  const data = await Jobs.find({});
  return data;
};

const deleteJob = async (organization, description, title) => {
  const jobs = Jobs.deleteMany({ organization: organization, description: description, title: title });
  return jobs;
}

const getJobByType = async (type) => {
  const jobs = await Jobs.find({ title: type });
  return jobs;
}

module.exports = { addJob: addJob, getJob: getJob, getAllJob: getAllJob, deleteJob: deleteJob, getJobByType: getJobByType };