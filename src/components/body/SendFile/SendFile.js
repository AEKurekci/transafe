import React from "react";
import Card from "../../UI/Card/Card";
import styles from './SendFile.module.css';

const SendFile = props => {

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return(
        <Card className={styles.container}>
            <form onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor='receiverFirm'>Alıcı Firma: </label>
                    <input
                        id='receiverFirm'
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor='receiverID'>Alıcı ID: </label>
                    <input
                        id='receiverID'
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor='startDate'>Kullanılabilir Süre Başlangıç Tarihi: </label>
                    <input
                        id='startDate'
                        type='date'
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor='endDate'>Kullanılabilir Süre Bitiş Tarihi: </label>
                    <input
                        id='endDate'
                        type='date'
                    />
                </div>
                <div className={styles.control}>
                    <label htmlFor='file'>Dosya: </label>
                    <input
                        id='file'
                        type='file'
                    />
                </div>
            </form>
        </Card>
    )
}

export default SendFile;