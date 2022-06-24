import React, {useContext, useEffect, useState} from "react";

const PageContext = React.createContext({
    activePage: 0,
    isLoggedIn: false,
    onChangePage: () => {},
    setIsLoggedIn: (isLoggedIn) => {},
    isErrorModalOpen: false,
    user: {},
    setUser: (user) => {},
    setIsErrorModalOpen: (isErrorModalOpen) => {}
})

export const usePageContext = () => useContext(PageContext);

export const PageContextProvider = props => {
    const [activePage, setActivePage] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const localStIsLoggedIn = localStorage.getItem('isLoggedIn')
        const cacheUser = JSON.parse(localStorage.getItem('user'));
        if(localStIsLoggedIn === '1'){
            setIsLoggedIn(true)
            onChangePageHandler(2)
        }else{
            setIsLoggedIn(false)
        }

        if(!user && cacheUser){
            setUser(cacheUser);
        }
    }, [user])

    const onChangePageHandler = pageNumber => {
        setActivePage(pageNumber);
    }

    const setIsLoggedInHandler = (value) => {
        setIsLoggedIn(value)
        if(value){
            localStorage.setItem('isLoggedIn', '1')
        }else{
            localStorage.setItem('isLoggedIn', '0')
            localStorage.setItem('user', null)
            setUser(null)
        }
    }

    return(
        <PageContext.Provider value={{
            activePage,
            isLoggedIn,
            onChangePage: onChangePageHandler,
            setIsLoggedIn: setIsLoggedInHandler,
            isErrorModalOpen,
            setIsErrorModalOpen,
            user,
            setUser
        }}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContext;