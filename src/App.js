import './App.css';
import React, {Fragment, useState} from "react";
import HeaderBar from "./components/header/HeaderBar/HeaderBar";
import MyFiles from "./components/body/MyFiles/MyFiles";
import SendFile from "./components/body/SendFile/SendFile";
import {USERS} from "./store/Users";
import AuthScreen from "./components/auth/AuthScreen";

function App() {
    const [activePage, setActivePage] = useState(2);


    const pageHandler = (pageNum) => {
        setActivePage(pageNum)
    }

    const onDataEnterHandler = (user) => {
        let filteredUsers = USERS.filter(u => u.email === user.email && u.password === user.password)
        if(filteredUsers.length === 1){
            setActivePage(0)
        }else{
            setActivePage(2)
        }
    }

    return (
        <Fragment>
            <HeaderBar onClick={pageHandler}/>
            <main>
                {activePage === 0 && <MyFiles/>}
                {activePage === 1 && <SendFile/>}
                {activePage === 2 && <AuthScreen onDataEnter={onDataEnterHandler}/>}
            </main>
        </Fragment>
    );
}

export default App;
