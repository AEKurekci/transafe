import React from "react";
import styles from './NavButton.module.css';

const NavButton = props => {
    return (
        <li className={styles.navButton} onClick={props.onClick}>
            <div className={styles.label}>{props.label}</div>
            {props.icon}
        </li>
    )
}

export default NavButton;