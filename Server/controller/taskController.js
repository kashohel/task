import Task from '../Models/Task.js';


const getAll = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
  }
};

const create = async (req, res) => {
  
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await Task.create({ title: title.trim() });
    res.status(201).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create task", details: err.message });
  }
};

const update = async (req, res) => {

  try {
    const { id } = req.params;
    const data = {};
    const { title, status } = req.body;
    
    if (status && !["pending", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    } else if(status){
      data.status = status;
    }
    if (title && title.trim()) {
      data.title = title.trim();
    }

    const updated = await Task.findByIdAndUpdate(id, data ? data : {}, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update task", details: err.message });
  }
};

const remove = async (req, res) => {

  try {
    const { id } = req.params;
    const result = await Task.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ error: "Task not found" });
    res.json({ ok: true });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete task", details: err.message });
  }
};

export default { getAll, create, update, remove };