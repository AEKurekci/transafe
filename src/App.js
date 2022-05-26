import './App.css';
import React, {Fragment, useState} from "react";
import HeaderBar from "./components/header/HeaderBar/HeaderBar";
import MyFiles from "./components/body/MyFiles/MyFiles";
import SendFile from "./components/body/SendFile/SendFile";

function App() {
    const [activePage, setActivePage] = useState(0);

    const pageHandler = (pageNum) => {
        setActivePage(pageNum)
    }

    return (
        <Fragment>
            <HeaderBar onClick={pageHandler} />
            <main>
              {activePage === 0 && <MyFiles />}
              {activePage === 1 && <SendFile />}
            </main>
        </Fragment>
    );
}

export default App;
