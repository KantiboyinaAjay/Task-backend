const {ProjectSchema , taskModel} = require('../models/Projectmodel');

const addProjects = async (req, res) => {
  const { title, pid, tasks } = req.body;
  const newProject = ProjectSchema({
    title: title,
    pid: pid,
    tasks: tasks,
  });
  const response = await newProject.save();
  res.status(201).send({ status: "Success", msg: response });
};

const addTask = async (req, res) => {
  const { pid, taskName, startDate, deadlineDate, status, taskId } = req.body;

  const newTask = taskModel({
    taskName: taskName,
    startDate: startDate,
    deadlineDate: deadlineDate,
    status: status,
    taskId: taskId,
    pid: pid,
  });

  const response = await newTask.save();
  const updatedProject = await ProjectSchema.findOneAndUpdate(
    { pid: response.pid },
    { $push: { tasks: response.taskId } },
    { new: true }
  );
  res.status(201).send({ status: "Success", msg: updatedProject });
};

const getProjects = async (req, res) => {
  try {
    const response = await ProjectSchema.find();
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    res.status(200).send(response.length ? response : []);
  } catch (err) {
    res.status(500).send({ msg: "Error retrieving projects" });
  }
};


const getTasksbyId = async (req, res) => {
  const { pid } = req.params;
  try{
    const tasks = await taskModel.find({ pid: pid });
    res.status(200).send(tasks ? tasks : []);
  }
  catch(err)
  {
    res.status(404);
  }
};

const updateTasksbyId = async (req, res) => {
  const { taskName, startDate, deadlineDate, status, pid, taskId } = req.body;

  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { taskId: taskId },
      {
        taskName: taskName,
        startDate: startDate,
        deadlineDate: deadlineDate,
        status: status,
        pid: pid,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ status: "Failed", msg: "Task not found" });
    }

    res.status(200).json({ status: "Success", updatedTask });
  } 
  catch (error) {
    res.status(500).json({ status: "Failed", msg: "Error updating task" });
  }
};

const deleteProject = async (req, res) => {
  const { pid } = req.params;
  try {
    await deleteTasksBeasedonProject(pid);
    await ProjectSchema.findOneAndDelete({ pid: pid });
  } 
  catch (e) {
    res.status(500).json({ status: "failed", message: e });
  }
  res.status(200).send({ status: "success" });
};

const deleteTasksBeasedonProject = async (proid) => {
  try{
    await taskModel.deleteMany({pid: proid})
  }
  catch(err)
  {
    (err) => {
      console.log(err);
    }
  }
}

module.exports = {
  addProjects,
  addTask,
  getTasksbyId,
  updateTasksbyId,
  deleteProject,
  getProjects,
};
