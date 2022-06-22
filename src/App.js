import './App.css';
import React, {Fragment, useContext} from "react";
import HeaderBar from "./components/header/HeaderBar/HeaderBar";
import MyFiles from "./components/screen/MyFiles/MyFiles";
import SendFile from "./components/screen/SendFile/SendFile";
import AuthScreen from "./components/auth/AuthScreen";
import PageContext from "./store/page-context";
import SentFiles from "./components/screen/SentFiles/SentFiles";
import TransferDetails from "./components/screen/TransferDetails/TransferDetails";
import background from './assets/whiteBackground.png'

function App() {
    const pageCtx = useContext(PageContext);

    return (
        <Fragment>
            <HeaderBar />
            <main style={{backgroundImage: `url(${background})`}}>
                {!pageCtx.isLoggedIn && <AuthScreen />}
                {pageCtx.activePage === 1 && pageCtx.isLoggedIn && <SendFile />}
                {pageCtx.activePage === 2 && pageCtx.isLoggedIn && <MyFiles />}
                {pageCtx.activePage === 3 && pageCtx.isLoggedIn && <SentFiles />}
                {pageCtx.activePage === 4 && pageCtx.isLoggedIn && <TransferDetails />}
            </main>
        </Fragment>
    );
}

export default App;
