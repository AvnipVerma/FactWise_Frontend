import React, { useState } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import Accordion from './Components/Accordion/Accordion';
import usersData from './data/celebrities.json';
import styles from './App.module.css';

function App() {
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    const filtered = usersData.filter((user) => {
      const fullName = `${user.first} ${user.last}`.toLowerCase();
      return (
        user.first.toLowerCase().includes(lowerCaseQuery) || 
        user.last.toLowerCase().includes(lowerCaseQuery) || 
        fullName.includes(lowerCaseQuery)
      );
    });

    console.log('Filtered Users:', filtered); // Debugging line
    setFilteredUsers(filtered);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.heading}>List View</div>
        <SearchBar onSearch={handleSearch} /> 
      </div>
      <div className={styles.app}>
        <Accordion users={filteredUsers} />
      </div>
    </div>
  );
}

export default App;
