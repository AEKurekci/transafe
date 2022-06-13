import React, {useContext} from "react";
import NavButton from "../../UI/NavButton/NavButton";
import styles from './Navigation.module.css';
import {FaTelegramPlane, FaInbox, FaSignOutAlt} from 'react-icons/fa';
import PageContext from "../../../store/page-context";

const Navigation = () => {
    const pageCtx = useContext(PageContext);

    const logoutHandler = () => {
        pageCtx.setIsLoggedIn(false)
    }

    return(
        <nav className={styles.nav}>
            <ul>
                <NavButton label='Gelen Dosyalar' onClick={() => {pageCtx.onChangePage(2)}} icon={<FaInbox />}/>
                <NavButton label='Dosya Gönder' onClick={() => {pageCtx.onChangePage(1)}} icon={<FaTelegramPlane />}/>
                <NavButton label='Çıkış' onClick={logoutHandler} icon={<FaSignOutAlt />}/>
            </ul>
        </nav>
    )
}

export default Navigation;