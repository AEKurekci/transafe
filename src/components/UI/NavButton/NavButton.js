import React from "react";
import styles from './NavButton.module.css';

const NavButton = props => {
    return (
        <li className={styles.navButton}>
            <a href='#' onClick={props.onClick}>{props.label}</a>
            <div className={styles.iconContainer}>
                {props.icon}
            </div>
        </li>
    )
}

export default NavButton;