import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import KanbanBoard from './KanbanBoard';

function App() {
  const apiUrl = 'https://api.quicksell.co/v1/internal/frontend-assignment';
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [isDisplayModalOpen, setIsDisplayModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const groupTickets = () => {
    let groupedData = {};

    if (groupingOption === 'status') {
      groupedData = groupByStatus(tickets);
    } else if (groupingOption === 'user') {
      groupedData = groupByUser(tickets);
    } else if (groupingOption === 'priority') {
      groupedData = groupByPriority(tickets);
    }

    return groupedData;
  };

  const groupByStatus = (tickets) => {
    return tickets.reduce((grouped, ticket) => {
      const key = ticket.status;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
      return grouped;
    }, {});
  };

  const groupByUser = (tickets) => {
    return tickets.reduce((grouped, ticket) => {
      const user = users.find((u) => u.id === ticket.userId);
      if (user) {
        const key = user.name;
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(ticket);
      }
      return grouped;
    }, {});
  };

  const groupByPriority = (tickets) => {
    return tickets.reduce((grouped, ticket) => {
      const key = ticket.priority;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(ticket);
      return grouped;
    }, {});
  };

  const sortTickets = (groupedData) => {
    if (sortingOption === 'priority') {
      return sortTicketsByPriority(groupedData);
    } else if (sortingOption === 'title') {
      return sortTicketsByTitle(groupedData);
    }
  };

  const sortTicketsByPriority = (groupedData) => {
    const sortedData = {};
    Object.keys(groupedData)
      .sort((a, b) => b - a) // Sort in descending order
      .forEach((key) => {
        sortedData[key] = groupedData[key];
      });
    return sortedData;
  };

  const sortTicketsByTitle = (groupedData) => {
    const sortedData = {};
    Object.keys(groupedData)
      .sort((a, b) => a.localeCompare(b)) // Sort in ascending order
      .forEach((key) => {
        sortedData[key] = groupedData[key];
      });
    return sortedData;
  };

  const openDisplayModal = () => {
    setIsDisplayModalOpen(true);
  };

  const closeDisplayModal = () => {
    setIsDisplayModalOpen(false);
  };

  return (
    <div className="App">
      <h1 className="card">Kanban Board</h1>
      <div className="button-container">
        <button onClick={openDisplayModal} className="display-button">
          Display <i className="fa fa-cog settings-icon"></i>
        </button>
        <br/><br/>
      </div>
      {isDisplayModalOpen && (
        <div className="card display-modal">
          <label>Group By:</label>
          <select
            value={groupingOption}
            onChange={(e) => setGroupingOption(e.target.value)}
          >
            <br/>
            <option value="status">Status</option>  
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
         
          <label>Sort By:</label>
          <select
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      )}
      <KanbanBoard data={sortTickets(groupTickets())} groupingOption={groupingOption} />
    </div>
  );
}

export default App;
