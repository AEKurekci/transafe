import React, {useContext} from "react";
import Card from "../../UI/Card/Card";
import styles from './TransferItem.module.css';
import moment from "moment";
import {FaDownload, FaSearch} from "react-icons/fa";
import useHttp from "../../../hooks/use-http";
import PageContext from "../../../store/page-context";
import ErrorModal from "../ErrorModal/ErrorModal";

const TransferItem = props => {
    const startDate = moment(props.fileInfo.startDate)
    startDate.locale('tr')
    const endDate = moment(props.fileInfo.endDate)
    endDate.locale('tr')
    const pageCtx = useContext(PageContext);

    const {isLoading, error, sendRequest: receiveFile} = useHttp();

    const handleFile = (response) => {
        props.onDownloadFinish();
        let a = document.createElement("a"); //Create <a>
        a.href = response.file; //Image Base64 Goes here
        a.download = response.title ? response.title : 'Dosya'; //File name Here
        a.click(); //Downloaded file
    }

    const downloadHandler = () => {
        receiveFile(handleFile, {
            path: 'receiveFile',
            method: 'POST',
            body: {
                sender: props.fileInfo.senderAccount,
                receiver: props.fileInfo.receiverAccount,
                senderHost: props.fileInfo.senderHost,
                linearId: props.fileInfo.linearId
            }
        })
    }

    const examineHandler = () => {
        console.log('todo examine')
    }

    const isDownloadActive = !props.fileInfo.isReceived && !props.sentFile

    if(isLoading){
        return (
            <Card className={styles.loading}>
                <p>Dosya İndiriliyor...</p>
            </Card>
        )
    }

    return (
        <Card className={styles.container}>
            <div className={styles.main}>
                <div className={styles.title}>{props.fileInfo.title}</div>
                <div className={styles.content}>
                    <div><span className={styles.boldText}>Gönderen: </span> {props.fileInfo.senderAccount}</div>
                    <div><span className={styles.boldText}>Transfer ID: </span>{props.fileInfo.linearId}</div>
                    <p className={styles.boldText}>Dosya Kullanım Tarihi:</p>
                    <div>{startDate.format('HH:mm DD/MM/YYYY')} - {endDate.format('HH:mm DD/MM/YYYY')}</div>
                    <div className={`${styles.boldText} ${props.fileInfo.isReceived ? styles.redText : styles.greenText}`}>
                        {props.fileInfo.isReceived ? 'İndirildi' : 'Henüz İndirilmedi'}
                    </div>
                </div>
                <div className={styles.txHash}><span className={styles.boldText}>Transaction ID: </span>{props.fileInfo.txHash}</div>
            </div>
            <div className={`${styles.download} ${isDownloadActive ? styles.greenBack : styles.yellowBack}`}
                 onClick={isDownloadActive ? downloadHandler : examineHandler}>
                {isDownloadActive ? 'İndir' : 'İncele'}
                {isDownloadActive ? <FaDownload/> : <FaSearch/>}
            </div>
            {pageCtx.isErrorModalOpen && <ErrorModal
                title='Indirme Hatası'
                message={`'Dosya İndirilirken bir hata oluştu' ${error}`}
                onConfirm={() => pageCtx.setIsErrorModalOpen(false)}
            />}
        </Card>
    )
}

export default TransferItem;