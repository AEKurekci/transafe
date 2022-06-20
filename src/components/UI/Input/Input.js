import React from "react";

import styles from './Input.module.css';
import Select from "react-select";

const Input = props => {
    return(
        <div className={styles.control}>
            <label htmlFor={props.inputConfig.id}>{props.label}</label>
            {props.type === 'dropdown' && <Select className={styles.select} options={props.options} onChange={props.onChange} />}
            {props.type !== 'dropdown' && <input
                onChange={props.onChange}
                {...props.inputConfig}
            />}
        </div>
    )
}

export default Input;