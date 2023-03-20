const Jobs = require("../model/Jobs");

const addJob = async (organization, description, title) => {
  const data = await Jobs.find({ organization: organization, description: description, title: title });
  const result = await Permission.collection.insertOne(data);
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

const deleteJob = async(organization, description, title) => {
  await Jobs.deleteMany({ organization: organization, description: description, title: title });
}

module.exports = { addJob: addJob, getJob: getJob, getAllJob: getAllJob };