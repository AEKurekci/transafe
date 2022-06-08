import React, {useState} from "react";

const PageContext = React.createContext({
    activePage: 0,
    isLoggedIn: false,
    onChangePage: () => {},
    setIsLoggedIn: (isLoggedIn) => {}
})

export const PageContextProvider = props => {
    const [activePage, setActivePage] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onChangePageHandler = pageNumber => {
        setActivePage(pageNumber);
    }

    return(
        <PageContext.Provider value={{
            activePage,
            isLoggedIn,
            onChangePage: onChangePageHandler,
            setIsLoggedIn
        }}>
            {props.children}
        </PageContext.Provider>
    )
}

export default PageContext;