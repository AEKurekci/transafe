import React, {useContext, useState} from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import styles from './AuthScreen.module.css';
import {USERS} from "../../store/Users";
import PageContext from "../../store/page-context";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import Button from "../UI/Buttons/Button";

const AuthScreen = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const pageCtx = useContext(PageContext);

    const loginHandler = () => {
        let filteredUsers = USERS.filter(u => u.email === user.email && u.password === user.password)
        if(filteredUsers.length === 1){
            pageCtx.onChangePage(2)
            pageCtx.setIsLoggedIn(true)
            localStorage.setItem('user', JSON.stringify(filteredUsers[0]))
            pageCtx.setUser(filteredUsers[0])
        }else{
            pageCtx.onChangePage(0)
            pageCtx.setIsErrorModalOpen(true)
        }
    }

    const onPasswordChangeHandler = (event) => {
        setUser(prevState => ({
            ...prevState,
            password: event.target.value
        }))
    }

    const onEmailChangeHandler = (event) => {
        setUser(prevState => ({
            ...prevState,
            email: event.target.value
        }))
    }

    const onConfirmHandler = () => {
        pageCtx.setIsErrorModalOpen(false);
    }

    const onSubmitHandler = event => {
        event.preventDefault()
        loginHandler()
    }

    return (
        <Card className={styles.container}>
            <h1 className={styles.title}>Giriş Yap</h1>
            <form onSubmit={onSubmitHandler}>
                <Input inputConfig={{
                    id: 'email-auth',
                    value: user.email,
                    onChange: onEmailChangeHandler,
                    type: 'email'
                }} label='Email: ' />
                <Input inputConfig={{
                    id: 'password-auth',
                    value: user.password,
                    onChange: onPasswordChangeHandler,
                    type: 'password'
                }} label='Şifre: ' />
                <Button type='submit'>Giriş</Button>
            </form>
            {pageCtx.isErrorModalOpen && <ErrorModal
                title='Giriş Bilgileri Geçersiz'
                message='Girdiğiniz bilgilerde bir kullanıcı bulunamadı. Lütfen giriş bilgilerini kontrol ederek tekrar deneyiniz.'
                onConfirm={onConfirmHandler}/>}
        </Card>
    )
}

export default AuthScreen;