import axios from 'axios';
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000')+'/api';

const fetchTasks = async() => {
  try {
    const res = await axios.get(`${BASE_URL}/tasks`);
    return res.data;
  } catch (e) {
    throw new Error(e??'Failed to fetch tasks');
  }
}

const createTask = async(title) => {
  try{
    const res = await axios.post(`${BASE_URL}/tasks/create`, { title });
    return res.data;
  } catch(e){
    throw new Error(e??'Failed to create task');
  }
}

const updateTask = async(id, data) => {
  try{
    const res = await axios.put(`${BASE_URL}/tasks/update/${id}`, data);
    return res.data;
  } catch(e){
    throw new Error(e??'Failed to update task');
  }
}

const deleteTask = async(id) => {
  try{
    const res = await axios.delete(`${BASE_URL}/tasks/delete/${id}`);
    return res.data;
  } catch(e){
    throw new Error(e??'Failed to delete task');
  }
}

export { fetchTasks, createTask, deleteTask, updateTask };