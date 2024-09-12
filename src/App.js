import React, { useState } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import Accordion from './Components/Accordion/Accordion';
import usersData from './data/celebrities.json'; // Import users data
import styles from "./App.module.css";

function App() {
  const [filteredUsers, setFilteredUsers] = useState(usersData); // Initialize with full users list

  const handleSearch = (query) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery !== '') {
      const filtered = usersData.filter(user => {
        const firstName = user.first ? user.first.toLowerCase() : ''; // Access 'first' instead of 'firstName'
        return firstName.includes(normalizedQuery); // Filter by first name
      });
      setFilteredUsers(filtered); // Update state with filtered users
    } else {
      setFilteredUsers(usersData); // Reset to full users list when search is cleared
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.heading}>List View</div>
        <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch to SearchBar */}
      </div>
      <div className={styles.app}>
        {filteredUsers.length > 0 ? (
          <Accordion users={filteredUsers} /> 
        ) : (
          <p>No results found</p> // Display message when no users are found
        )}
      </div>
    </div>
  );
}

export default App;
