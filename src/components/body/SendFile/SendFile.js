import React, {useContext, useEffect, useReducer, useState} from "react";
import Card from "../../UI/Card/Card";
import styles from './SendFile.module.css';
import Input from "../../UI/Input/Input";
import PageContext from "../../../store/page-context";
import useHttp from "../../../hooks/use-http";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../../UI/Buttons/Button";

const RECEIVER_SELECT = 'RECEIVER_SELECT';
const SENDER_SELECT = 'SENDER_SELECT';
const TITLE_CHANGE = 'TITLE_CHANGE';
const START_DATE_SELECT = 'START_DATE_SELECT';
const END_DATE_SELECT = 'END_DATE_SELECT';
const FILE_LOAD = 'FILE_LOAD';

const inputReducer = (state, action) => {
    switch (action.type){
        case RECEIVER_SELECT:
            return {
                ...state,
                receiver: action.data.receiver,
                receiverHost: action.data.receiverHost
            }
        case SENDER_SELECT:
            return {
                ...state,
                sender: action.sender
            }
        case TITLE_CHANGE:
            return {
                ...state,
                title: action.title
            }
        case START_DATE_SELECT:
            return {
                ...state,
                startDate: action.startDate
            }
        case END_DATE_SELECT:
            return {
                ...state,
                endDate: action.endDate
            }
        case FILE_LOAD:
            return {
                ...state,
                file: action.file
            }
        default:
            return state;
    }
}
const initialState = {
    title: '',
    sender: '',
    receiver: '',
    receiverHost: '',
    file: '',
    startDate: '',
    endDate: '',
}

const SendFile = () => {
    const [inputState, dispatchInput] = useReducer(inputReducer, initialState);
    const pageCtx = useContext(PageContext);
    const [options, setOptions] = useState();
    const {isLoading, error, sendRequest} = useHttp();
    const [isLoadingFile, setIsLoadingFile] = useState(false);

    const accountResponseHandler = (response) => {
        if(pageCtx.user){
            setOptions(response.accounts.filter(acc => acc.state.data.name !== pageCtx.user.cordaKey)
                .map(acc => ({
                    value: acc.state.data.host,
                    label: acc.state.data.name
                })));
            dispatchInput({type: SENDER_SELECT, sender: pageCtx.user.cordaKey})
        }else{
            let cacheUser = JSON.parse(localStorage.getItem('user'));
            setOptions(response.accounts.filter(acc => acc.state.data.name !== cacheUser.cordaKey)
                .map(acc => ({
                    value: acc.state.data.host,
                    label: acc.state.data.name
                })));
            pageCtx.setUser(cacheUser)
            dispatchInput({type: SENDER_SELECT, sender: cacheUser.cordaKey})
        }
    }

    useEffect(() => {
        sendRequest(accountResponseHandler,{
            path: 'receiveAllAccounts'
        })
    }, [sendRequest])

    const titleChangeHandler = (event) => {
        dispatchInput({type: TITLE_CHANGE, title: event.target.value})
    }

    const receiverChangeHandler = (value) => {
        dispatchInput({type: RECEIVER_SELECT, data: {receiver: value.label, receiverHost: value.value}})
    }

    const startDateChange = (event) => {
        let startDate = event.target.value.replace('T', ' ')
        dispatchInput({type: START_DATE_SELECT, startDate})
    }

    const endDateChange = (event) => {
        let endDate = event.target.value.replace('T', ' ')
        dispatchInput({type: END_DATE_SELECT, endDate: endDate})
    }

    const fileSelectHandler = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        setIsLoadingFile(true);
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            dispatchInput({type: FILE_LOAD, file: reader.result})
            setIsLoadingFile(false);
        };
        reader.onerror = (fail) => {
            console.log('Error: ', fail);
            setIsLoadingFile(false);
        };
    }

    const sendFileResponseHandler = (response) => {
        console.log(response);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        await sendRequest(sendFileResponseHandler, {
            path: 'sendFile',
            method: 'POST',
            body: inputState
        })
    }

    useEffect(() => {
        if(error){
            pageCtx.setIsErrorModalOpen(true);
        }
    }, [error])

    const errorConfirmHandler = () => {
        pageCtx.setIsErrorModalOpen(false);
    }

    if(isLoading){
        return(
            <Card className={styles.container}>
                <p>Dosya Gönderiliyor...</p>
            </Card>
        )
    }

    if(isLoadingFile){
        return(
            <Card className={styles.container}>
                <p>Dosya Yükleniyor...</p>
            </Card>
        )
    }

    return(
        <Card className={styles.container}>
            <form onSubmit={submitHandler}>
                <Input inputConfig={{
                    id: 'title',
                    value: inputState.title,
                }} label='Dosya Başlığı: ' onChange={titleChangeHandler}/>
                <Input inputConfig={{
                    id: 'receiverFirm'
                }} label='Alıcı Firma: ' type='dropdown' options={options} onChange={receiverChangeHandler}/>
                <Input inputConfig={{
                    id: 'startDate',
                    type: 'datetime-local',
                    step: '1'
                }} label='Kullanılabilir Süre Başlangıç Tarihi: ' onChange={startDateChange} />
                <Input inputConfig={{
                    id: 'endDate',
                    type: 'datetime-local',
                    step: '1'
                }} label='Kullanılabilir Süre Bitiş Tarihi: ' onChange={endDateChange}/>
                <Input inputConfig={{
                    id: 'file',
                    type: 'file',
                }} label='Dosya: ' onChange={fileSelectHandler} />
                <div className={styles.fullWidth}>
                    <Button type='submit' className={styles.fullWidth}>Gönder</Button>
                </div>
            </form>
            {pageCtx.isErrorModalOpen && <ErrorModal
                title='Hata'
                message={`Dosyalar Gönderilirken Bir Hata Oluştu ${error}`}
                onConfirm={errorConfirmHandler}
            />}
        </Card>
    )
}

export default SendFile;