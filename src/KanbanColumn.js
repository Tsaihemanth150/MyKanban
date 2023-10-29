import React from 'react';
import TaskCard from './TaskCard';

function KanbanColumn({ title, tasks, groupingOption }) {
  let columnTitle = title; // Default to the title
  let iconClass = ''; // Icon class for Font Awesome

  if (groupingOption === 'status') {
    if (title === 'Todo') {
      // Add Font Awesome icon for "Todo" when grouping by status
      iconClass = 'fas fa-tasks';
    } else if (title === 'Backlog') {
      // Add Font Awesome icon for "Backlog" when grouping by status
      iconClass = 'fas fa-history';
    } else if (title === 'In progress') {
      // Add Font Awesome icon for "InProgress" when grouping by status
      iconClass = 'fas fa-spinner';
    }
  } else if (groupingOption === 'priority') {
    // Mapping of priority levels to titles and icons
    const priorityData = {
      4: { title: 'Urgent', iconClass: 'fas fa-exclamation-circle' },
      3: { title: 'High', iconClass: 'fas fa-arrow-up' },
      2: { title: 'Medium', iconClass: 'fas fa-info-circle' },
      1: { title: 'Low', iconClass: 'fas fa-arrow-down' },
      0: { title: 'No priority', iconClass: 'fas fa-ban' },
    };

    // Use the mapped title and icon class if available, otherwise keep the original title
    const priorityInfo = priorityData[title];
    if (priorityInfo) {
      columnTitle = (
        <>
          <i className={priorityInfo.iconClass} /> {priorityInfo.title}
        </>
      );
    }
  }

  if (iconClass) {
    columnTitle = (
      <>
        <i className={iconClass} /> {columnTitle}
      </>
    );
  }

  return (
    <div className="kanban-column">
      <h2>{columnTitle}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} groupingOption={groupingOption} />
      ))}
    </div>
  );
}

export default KanbanColumn;
