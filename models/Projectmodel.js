const mongoose = require("mongoose");


const taksSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  deadlineDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Todo", "In Progress", "In Review", "Completed"],
    required: true,
  },
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  pid: {
    type: String,
    required: true,
  },
});


const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  tasks: {
    type: [String],
    default: [],
  },
});


const taskModel = mongoose.model("tasks", taksSchema);
const ProjectSchema = mongoose.model("projectSchema", projectSchema);
module.exports = {taskModel , ProjectSchema};
