import React, { useState, useEffect } from "react";
import '../src/css/App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) => (index === editIndex ? task : t));
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>To_Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className="task-item">
            <span>{t}</span>
            <div className="buttons">
              <button onClick={() => editTask(index)} className="edit-btn">Edit</button>
              <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
