
import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const taskname = useRef(null);
  const description = useRef(null);
  const date = useRef(null);
  const time = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTask = () => {
    const name = taskname.current.value;
    const des = description.current.value;
    const datee = date.current.value;
    const timee = time.current.value;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex ? { ...task, name, des, datee, timee } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { name, des, datee, timee, completed: false }]);
    }

    taskname.current.value = '';
    description.current.value = '';
    date.current.value = '';
    time.current.value = '';
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const count = updatedTasks.filter(task => task.completed).length;
    setCompletedCount(count);
  };

  const startEditing = (index) => {
    const task = tasks[index];
    taskname.current.value = task.name;
    description.current.value = task.des;
    date.current.value = task.datee;
    time.current.value = task.timee;
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    const count = updatedTasks.filter(task => task.completed).length;
    setCompletedCount(count);
  };

  return (
    <div id="adder">
      <h1 id="head">To-Do List</h1>
      <input type="text" placeholder="Task Name" className="inputtext" ref={taskname} /><br />
      <input type="text" placeholder="Task Description" className="inputtext" ref={description} /><br />
      <div className="input">
        <input type="date" className="input" ref={date} />
        <input type="time" className="input" ref={time} />
      </div><br />
      <button onClick={addOrUpdateTask}>
        {editIndex !== null ? 'Update Task' : 'Add Task'}
      </button>
      <div id="container">
        {tasks.map((task, index) => (
          <div key={task.id || index} className="task"> {/* Use task.id if available */}
            <h3 className={task.completed ? 'completed' : ''}>{task.name}</h3>
            <p className={task.completed ? 'completed' : ''}>{task.des}</p>
            <p className={task.completed ? 'completed' : ''}>{task.datee} {task.timee}</p>

            <div className="task-controls">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
                aria-label={`Mark ${task.name} as ${task.completed ? 'incomplete' : 'complete'}`} // Accessibility
              />
              <button id="edit" onClick={() => startEditing(index)} aria-label={`Edit ${task.name}`}>Edit</button>
              <button id="delete" onClick={() => deleteTask(index)} aria-label={`Delete ${task.name}`}>Delete</button>
            </div>
          </div>
        ))}
        <h3 id="count">Total Completed Tasks: {completedCount}</h3>
      </div>


    </div>
  );
}

export default App;

