import React, {useState} from "react";
import Input from "../UI/Input/Input";
import Card from "../UI/Card/Card";
import styles from './AuthScreen.module.css';

const AuthScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    const onSubmitHandler = event => {
        event.preventDefault()
        props.onDataEnter({email, password})
    }

    return (
        <Card className={styles.container}>
            <form onSubmit={onSubmitHandler}>
                <Input inputConfig={{
                    id: 'email-auth',
                    value: email,
                    onChange: onEmailChangeHandler,
                    type: 'email'
                }} label='Email: ' />
                <Input inputConfig={{
                    id: 'password-auth',
                    value: password,
                    onChange: onPasswordChangeHandler,
                    type: 'password'
                }} label='Şifre: ' />
                <button type='submit'>Giriş</button>
            </form>
        </Card>
    )
}

export default AuthScreen;