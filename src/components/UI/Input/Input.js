import React from "react";

import styles from './Input.module.css';

const Input = props => {
    return(
        <div className={styles.control}>
            <label htmlFor={props.inputConfig.id}>{props.label}</label>
            <input
                {...props.inputConfig}
            />
        </div>
    )
}

export default Input;