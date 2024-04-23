import mongoose from "mongoose";
import userModel from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (name && job) {
    promise = findUserByNameAndJob(name, job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function removeUser(id) {
  return userModel.findByIdAndDelete(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job });
}

export default {
  addUser,
  removeUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob
};