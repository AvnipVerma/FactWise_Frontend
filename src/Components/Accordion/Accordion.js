import React, { useState, useEffect } from 'react';
import AccordionItem from "../AccordionItem/AccordionItem";
import styles from "./Accordion.module.css";

const Accordion = ({ users = [] }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [userList, setUserList] = useState(users);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Synchronize userList with users prop
    setUserList(users);
  }, [users]); // Run this effect when `users` changes

  const handleAccordionClick = (index) => {
    if (!isEditing) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  const handleEditStatus = (status) => {
    setIsEditing(status);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = userList.filter(user => user.id !== userId);
    setUserList(updatedUsers);
  };

  return (
    <>
      {userList.length > 0 ? (
        userList.map((user, index) => (
          <AccordionItem
            key={user.id}
            user={user}
            isOpen={activeIndex === index}
            onClick={() => handleAccordionClick(index)}
            onEditStatusChange={handleEditStatus}
            onDelete={handleDeleteUser}
            className={styles.accordionItemBox}
          />
        ))
      ) : (
        <p>No results found</p>
      )}
    </>
  );
};

export default Accordion;
