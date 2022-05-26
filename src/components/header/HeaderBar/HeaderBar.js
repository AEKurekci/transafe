import React from "react";
import styles from './HeaderBar.module.css'
import {Colors} from "../../UI/Colors";
import Navigation from "../Navigation/Navigation";

const HeaderBar = props => {
    const onPageHandler = (pageNum) => {
        props.onClick(pageNum);
    }
    return(
        <header className={`${styles.header}`}>
            <h1>Transafe</h1>
            <Navigation onClick={onPageHandler} />
        </header>
    )
}

export default HeaderBar;