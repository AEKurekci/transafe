import React from "react";
import Card from "../../UI/Card/Card";
import styles from './SendFile.module.css';
import Input from "../../UI/Input/Input";

const SendFile = () => {

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return(
        <Card className={styles.container}>
            <form onSubmit={submitHandler}>
                <Input inputConfig={{
                    id: 'receiverFirm'
                }} label='Alıcı Firma: ' />
                <Input inputConfig={{
                    id: 'receiverID'
                }} label='Alıcı ID: ' />
                <Input inputConfig={{
                    id: 'startDate',
                    type: 'date'
                }} label='Kullanılabilir Süre Başlangıç Tarihi: ' />
                <Input inputConfig={{
                    id: 'endDate',
                    type: 'date'
                }} label='Kullanılabilir Süre Bitiş Tarihi: ' />
                <Input inputConfig={{
                    id: 'file',
                    type: 'file'
                }} label='Dosya: ' />
            </form>
        </Card>
    )
}

export default SendFile;