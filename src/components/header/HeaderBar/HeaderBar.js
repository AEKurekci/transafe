import React, {useContext} from "react";
import styles from './HeaderBar.module.css'
import Navigation from "../Navigation/Navigation";
import PageContext from "../../../store/page-context";

const HeaderBar = () => {
    const pageCtx = useContext(PageContext);

    return(
        <header className={`${styles.header}`}>
            <h1>Transafe</h1>
            {pageCtx.isLoggedIn && <Navigation/>}
            {pageCtx.isLoggedIn && <h3>Hoşgeldin {pageCtx.user.name}</h3>}
        </header>
    )
}

export default HeaderBar;