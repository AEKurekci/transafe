import React from "react";
import NavButton from "../../UI/NavButton/NavButton";
import styles from './Navigation.module.css';
import {FaTelegramPlane, FaInbox} from 'react-icons/fa';

const Navigation = props => {
    const onPageHandler = (pageNum) => {
        props.onClick(pageNum);
    }
    return(
        <nav className={styles.nav}>
            <ul>
                <NavButton label='Gelen Dosyalar' onClick={() => {onPageHandler(0)}} icon={<FaInbox />}/>
                <NavButton label='Dosya Gönder' onClick={() => {onPageHandler(1)}} icon={<FaTelegramPlane />}/>
            </ul>
        </nav>
    )
}

export default Navigation;