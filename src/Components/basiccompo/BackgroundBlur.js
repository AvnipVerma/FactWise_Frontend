import React from "react";
import styles from "./BackgroundBlur.module.css";


export const BackgroundBlur = ({children}) => {
    return (
      <div className={styles.blurBackground}>
       
        {children}
      
      </div>
    )
}