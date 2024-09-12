import React, { useState } from 'react';
import styles from './AccordionItem.module.css';
import UserForm from '../UserForm/UserForm';
import { calculateAge } from '../../utils/calculateAge';
import arrowdown from "../../assets/arrowdown.png";
import arrowup from "../../assets/arrowup.png";
import bin from "../../assets/bin.png";
import edit from "../../assets/edit.png";
import icon from "../../assets/icon.jpeg";
import { BackgroundBlur } from "../../Components/basiccompo/BackgroundBlur";
import blackcross from "../../assets/blackcross.png";

const AccordionItem = ({ user, isOpen, onClick, onEditStatusChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({ ...user });
  const [openbox, setOpenbox] = useState(false); // State for showing/hiding the BackgroundBlur

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    onEditStatusChange(!isEditing);
  };

  const handleDeleteClick = () => {
    setOpenbox(true); // Open the BackgroundBlur when delete button is clicked
  };

  const handleCancel = () => {
    setOpenbox(false); // Close the BackgroundBlur when cancel is clicked
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(userData.id); // Call the delete function from the parent component
    }
    setOpenbox(false); // Close the delete modal
  };

  return (
    <div className={`${styles.accordionItem} ${isEditing ? styles.editMode : ''}`}>
      <div className={styles.accordionHeader} onClick={onClick}>
        <div className={styles.headerContent}>
          <div className={styles.container222}>
            <img src={icon} className={styles.icon} alt="User Icon" />
            <div className={styles.text}>
              <div className={styles.firstlast}>
                <div className={styles.first}>{userData.first}</div>
                <div>{userData.last}</div>
              </div>
            </div>
            <img
              className={styles.arrowIcon}
              src={isOpen ? arrowup : arrowdown}
              alt={isOpen ? "Collapse" : "Expand"}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.accordionContent}>
          {isEditing ? (
            <UserForm user={userData} setUser={setUserData} toggleEdit={toggleEdit} />
          ) : (
            <div className={styles.container22}>
              <div className={styles.container}>
                <div>
                  <div className={styles.age}>Age</div>
                  <div>{calculateAge(userData.dob)} Years</div>
                </div>
                <div>
                  <div className={styles.gender}>Gender</div>
                  <div>{userData.gender}</div>
                </div>
                <div>
                  <div className={styles.country}>Country</div>
                  <div>{userData.country}</div>
                </div>
              </div>
              <div className={styles.description}>Description</div>
              <div>{userData.description}</div>
              <div className={styles.container2222}>
                <button className={styles.delete} onClick={handleDeleteClick}>
                  <img src={bin} className={styles.deleteimg} alt="Delete" />
                </button>
                <button onClick={toggleEdit} className={styles.edit}>
                  <img src={edit} className={styles.imgedit} alt="Edit" />
                </button>
              </div>
            </div>
          )}

          {/* Render the BackgroundBlur modal when openbox is true */}
          {openbox && (
            <BackgroundBlur>
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  <img
                    src={blackcross}
                    className={styles.blackcross}
                    alt="Cancel"
                    onClick={handleCancel}
                  />
                  <div className={styles.confirmText}>Are you sure you want to delete?</div>
                  <div className={styles.buttonGroup}>
                    <button onClick={handleCancel} className={styles.cancelButton}>
                      Cancel
                    </button>
                    <button onClick={handleConfirmDelete} className={styles.deleteButton}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </BackgroundBlur>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
