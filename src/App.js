import React, { useState } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import Accordion from './Components/Accordion/Accordion';
import usersData from './data/celebrities.json'; 
import styles from "./App.module.css";

function App() {
  const [filteredUsers, setFilteredUsers] = useState(usersData); 

  const handleSearch = (query) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery !== '') {
      const filtered = usersData.filter(user => {
        const firstName = user.first ? user.first.toLowerCase() : ''; 
        return firstName.includes(normalizedQuery); 
      });
      setFilteredUsers(filtered); 
    } else {
      setFilteredUsers(usersData); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.heading}>List View</div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.app}>
        {filteredUsers.length > 0 ? (
          <Accordion users={filteredUsers} /> 
        ) : (
          <p>No results found</p> 
        )}
      </div>
    </div>
  );
}

export default App;
