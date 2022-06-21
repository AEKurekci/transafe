import React, {useCallback, useEffect, useState} from "react";
import Card from "../../UI/Card/Card";
import styles from './MyFiles.module.css';
import {usePageContext} from "../../../store/page-context";
import useHttp from "../../../hooks/use-http";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import TransferItem from "../../UI/TransferItem/TransferItem";

const MyFiles = () => {
    const pageCtx = usePageContext();
    const [myTransfers, setMyTransfers] = useState([]);
    const {isLoading, error, sendRequest: fetchFiles} = useHttp();
    const [downloadCounter, setDownloadCounter] = useState(0)

    const fetchFilesHandler = useCallback(data => {
        setMyTransfers(data.myTransfers.filter(transfer => transfer.state.data.receiverAccount === pageCtx.user.cordaKey)
            .map(transfer => ({
                txHash: transfer.ref.txhash,
                file: transfer.state.data.file,
                startDate: transfer.state.data.startDate,
                endDate: transfer.state.data.endDate,
                senderAccount: transfer.state.data.senderAccount,
                receiverAccount: transfer.state.data.receiverAccount,
                linearId: transfer.state.data.linearId.id,
                title: transfer.state.data.title,
                senderHost: transfer.state.data.senderHost,
                isReceived: transfer.state.data.isReceived
            })));
    }, [pageCtx.user.cordaKey])

    useEffect(() => {
        fetchFiles(fetchFilesHandler, {
            path: 'getMyTransfers',
            body: {accountName: pageCtx.user.cordaKey},
            method: 'POST'
        });
    }, [fetchFiles, pageCtx.user.cordaKey, pageCtx.activePage, downloadCounter, fetchFilesHandler]);

    useEffect(() => {
        if(error){
            pageCtx.setIsErrorModalOpen(true);
        }
    }, [error, pageCtx.setIsErrorModalOpen])

    const errorConfirmHandler = () => {
        pageCtx.setIsErrorModalOpen(false);
    }

    const downloadFinishHandler = () => {
        setDownloadCounter(prevState => ++prevState);
    }

    if(isLoading){
        return(
            <Card className={styles.container}>
                <p>Gelen Dosyalar yükleniyor...</p>
            </Card>
        )
    }

    return(
        <div className={styles.container}>
            {myTransfers.length > 0 && myTransfers.map(transferData => <TransferItem key={transferData.txHash} fileInfo={transferData} onDownloadFinish={downloadFinishHandler} sentFile={false} />)}
            {myTransfers.length === 0 && <Card className={styles.container}>Size henüz gelen bir dosya bulunmuyor. Dosya göndermek için dosya gönder sekmesine geçebilirsiniz.</Card>}
            {pageCtx.isErrorModalOpen && <ErrorModal
                title='Hata'
                message={`Dosyalar Yüklenirken Bir Hata Oluştu ${error}`}
                onConfirm={errorConfirmHandler}
            />}
        </div>
    )
}

export default MyFiles;