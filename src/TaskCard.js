import React from 'react';

function TaskCard({ task, groupingOption }) {
  return (
    <div className="task-card" style={{borderRadius: 10}}>
      <h3>{task.title}</h3>
      <p>Status: {groupingOption === 'status' ? task.status : task.priority}</p>
      <p>Priority: {task.priority}</p>
      <p>Assigned To: {task.userId}</p>
      {/* Add more task details as needed */}
    </div>
  );
}

export default TaskCard;
