import React from "react";

import styles from './SelectInput.module.css'
import Select from "react-select";

const SelectInput = props => {
    return(
        <div className={styles.control}>
            <label htmlFor={props.inputConfig.id}>{props.label}</label>
            <div className={styles.dropdownContainer}>
                <Select className={styles.select} options={props.options} onChange={props.onChange} />
            </div>
        </div>
    )
}

export default SelectInput;