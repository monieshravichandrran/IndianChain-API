const mongoose = require("mongoose");
const Request = require("../model/Requests");
const Permission = require("../model/Permission");

const addRequest = async (citizen, authority, type) => {

  const alreadyFound = await Permission.find({ citizen: citizen, authority: authority, type: type });
  if (alreadyFound?.length > 0) {
    return { msg: "You already have access to this user" };
  }
  const data = await Request.find({ citizen: citizen, authority: authority, type: type });
  if (data?.length > 0) {
    return { msg: "You have already requested for the access" };
  }
  const result = await Request.collection.insertOne({ citizen: citizen, authority: authority, type: type });
  return { msg: "Request sent successfully" };
}

const getAllRequests = async (email) => {
  const data = await Request.find({ citizen: email });
  return data;
}

const deleteRequest = async (citizen, authority, type) => {
  await Request.deleteMany({ citizen: citizen, authority: authority, type: type });
}

module.exports = { addRequest: addRequest, getAllRequests: getAllRequests, deleteRequest: deleteRequest }