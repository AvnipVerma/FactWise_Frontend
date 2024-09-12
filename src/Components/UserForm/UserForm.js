import React, { useState, useEffect } from 'react';
import styles from './UserForm.module.css';
import tick from "../../assets/tick.png";  
import cross from "../../assets/cross.png"; 

const UserForm = ({ user, setUser, toggleEdit }) => {
  const [formData, setFormData] = useState({ ...user });
  const [isSaveDisabled, setSaveDisabled] = useState(true);

  useEffect(() => {

    const isValid = Object.values(formData).every(field => field !== '');
    setSaveDisabled(!isValid || JSON.stringify(formData) === JSON.stringify(user));
  }, [formData, user]);

  const calculateAgeFromDob = (dob) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calculateDobFromAge = (age) => {
    if (!age) return '';
    const today = new Date();
    const birthYear = today.getFullYear() - age;
    return new Date(birthYear, today.getMonth(), today.getDate()).toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "age" && !/^\d*$/.test(value)) return;

   
    if (name === "country" && !/^[a-zA-Z\s]*$/.test(value)) return;

    setFormData(prevState => {
      const updatedFormData = { ...prevState, [name]: value };

      if (name === "age") {
        const dob = calculateDobFromAge(value);
        updatedFormData.dob = dob;
      }

      return updatedFormData;
    });
  };

  const age = formData.dob ? calculateAgeFromDob(formData.dob) : formData.age || '';

  return (
    <form className={styles.form}>
      <div className={styles.container}>
        
        <div className={styles.inputGroup1}>
          <div className={styles.div}>Age: </div>
          <input
            className={styles.seachbar}
            type="text"
            name="age"
            value={formData.age || age}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup2}>
          <div className={styles.div}>Gender: </div>
          <select
            className={styles.select}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Rather not say">Rather not say</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className={styles.inputGroup3}>
          <div className={styles.div}>Country: </div>
          <input
            className={styles.input}
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.div}>Description: </div>
        <textarea
          className={styles.textarea}
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleEdit}
        >
          <img src={cross} alt="Cancel" className={styles.cross} />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          onClick={() => {
            setUser(formData);
            toggleEdit();
          }}
          disabled={isSaveDisabled}
        >
          <img src={tick} alt="Save" className={styles.tickk} />
        </button>
      </div>
    </form>
  );
};

export default UserForm;
