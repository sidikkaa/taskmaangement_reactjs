import React, { useState } from 'react';
import './app.css';
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [deadlineInput, setDeadlineInput] = useState('');

  const addTask = () => {
    if (!taskInput || !deadlineInput) return;
    const newTask = {
      name: taskInput,
      deadline: new Date(deadlineInput),
      state: 'pending',
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    setDeadlineInput('');
  };

  const toggleTaskState = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].state =
      updatedTasks[index].state === 'completed' ? 'pending' : 'completed';
    setTasks(updatedTasks);
  };

  const calculateTaskStyle = (deadline, state) => {
    const currentDate = new Date();

    if (deadline < currentDate && state !== 'completed') {
      return 'late';
    } else if (state === 'completed') {
      return 'completed';
    } else {
      return 'pending';
    }
  };

  return (
    <div className="App">
      <h1> TASK MANAGEMENT APP </h1>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '25vh'}}>
  <input
    type="text"
    placeholder="Reckon new task... 🖊"
    value={taskInput}
    onChange={(e) => setTaskInput(e.target.value)}
    className="border p-4 mb-4 w-[70%] rounded-xl"
  />
  <br />
  <input
    type="datetime-local"
    value={deadlineInput}
    onChange={(e) => setDeadlineInput(e.target.value)}
    className="border-black-900 p-4 mb-4 w-[70%] rounded-xl"
  />
  <br />
  <button
  onClick={addTask}
>
  Add task
</button>
  </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`cursor-pointer border p-2 mb-2 rounded-xl ${calculateTaskStyle(task.deadline, task.state)}`}
            onClick={() => toggleTaskState(index)}
          >
            {task.name} - Deadline: {task.deadline.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
