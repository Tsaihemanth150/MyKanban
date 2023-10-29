import React from 'react';
import KanbanColumn from './KanbanColumn';

function KanbanBoard({ data, groupingOption }) {
  return (
    <div className="kanban-board">
      {Object.entries(data).map(([group, groupData]) => (
        <KanbanColumn key={group} title={group} tasks={groupData} groupingOption={groupingOption} />
      ))}
    </div>
  );
}

export default KanbanBoard;