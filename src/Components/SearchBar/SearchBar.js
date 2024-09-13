import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../assets/search.png';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);  
    onSearch(searchQuery);  
  };

  return (
    <div className={styles.searchbar}>
      <img src={searchIcon} alt="Search" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Search User"
        value={query}
        onChange={handleChange}  
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
