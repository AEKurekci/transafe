import React, {useContext, useEffect, useState} from "react";
import Card from "../../UI/Card/Card";
import styles from './SendFile.module.css';
import Input from "../../UI/Input/Input";
import {USERS} from "../../../store/Users";
import PageContext from "../../../store/page-context";

const SendFile = () => {
    const pageCtx = useContext(PageContext);
    const [options, setOptions] = useState();

    useEffect(() => {
        if(pageCtx.user){
            setOptions(USERS.filter(user => user.cordaKey !== pageCtx.user.cordaKey).map(user => ({value: user.cordaKey, label: user.name})))
        }else{
            let cacheUser = JSON.parse(localStorage.getItem('user'));
            pageCtx.setUser(cacheUser)
        }
    }, [pageCtx])

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return(
        <Card className={styles.container}>
            <form onSubmit={submitHandler}>
                <Input inputConfig={{
                    id: 'receiverFirm'
                }} label='Alıcı Firma: ' type='dropdown' options={options} />
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