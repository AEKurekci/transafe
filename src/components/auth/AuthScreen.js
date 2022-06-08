import React, {Fragment, useState} from "react";
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
        <Fragment>
            <form onSubmit={onSubmitHandler}>
                <div className={styles.input}>
                    <label htmlFor="email">Email: </label>
                    <input id="email" value={email} onChange={onEmailChangeHandler}/>
                </div>
                <div className={styles.input}>
                    <label htmlFor="password">Şifre: </label>
                    <input id="password" value={password} onChange={onPasswordChangeHandler}/>
                </div>
                <button type='submit'>Giriş</button>
            </form>
        </Fragment>
    )
}

export default AuthScreen;