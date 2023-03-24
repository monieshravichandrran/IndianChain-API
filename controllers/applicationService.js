const Applications = require("../model/Application");

const applyJob = async (jobId, email) => {
  const alreadyExist = await Applications.find({ jobId: jobId, email: email });
  if (alreadyExist?.length > 0) {
    return { msg: "Already exist" };
  }
  await Applications.collection.insertOne({ jobId: jobId, email: email });
  return { msg: "Applied successfully" };
}

const getApplicants = async (jobId) => {
  const applicants = await Applications.find({ jobId: jobId });
  return applicants;
}

module.exports = { applyJob: applyJob, getApplicants: getApplicants };