import './App.css';
import React, {Fragment, useContext} from "react";
import HeaderBar from "./components/header/HeaderBar/HeaderBar";
import MyFiles from "./components/body/MyFiles/MyFiles";
import SendFile from "./components/body/SendFile/SendFile";
import AuthScreen from "./components/auth/AuthScreen";
import PageContext from "./store/page-context";

function App() {
    const pageCtx = useContext(PageContext);

    return (
        <Fragment>
            <HeaderBar />
            <main>
                {!pageCtx.isLoggedIn && <AuthScreen />}
                {pageCtx.activePage === 1 && pageCtx.isLoggedIn && <SendFile />}
                {pageCtx.activePage === 2 && pageCtx.isLoggedIn && <MyFiles />}
            </main>
        </Fragment>
    );
}

export default App;
