import React, {useContext, useEffect, useState} from "react";
import Card from "../../UI/Card/Card";
import styles from './SentFiles.module.css';
import PageContext from "../../../store/page-context";
import useHttp from "../../../hooks/use-http";
import ErrorModal from "../ErrorModal/ErrorModal";
import TransferItem from "../TransferItem/TransferItem";

const SentFiles = () => {
    const pageCtx = useContext(PageContext);
    const [myTransfers, setMyTransfers] = useState([]);
    const {isLoading, error, sendRequest: fetchFiles} = useHttp();

    const fetchFilesHandler = data => {
        setMyTransfers(data.myTransfers.filter(transfer => transfer.state.data.senderAccount === pageCtx.user.cordaKey)
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
    }

    useEffect(() => {
        fetchFiles(fetchFilesHandler, {
            path: 'getMyTransfers',
            body: {accountName: pageCtx.user.cordaKey},
            method: 'POST'
        });
    }, [fetchFiles, pageCtx.user.cordaKey, pageCtx.activePage]);

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
                <p>Giden Dosyalar yükleniyor...</p>
            </Card>
        )
    }

    return(
        <div className={styles.container}>
            {myTransfers.length > 0 && myTransfers.map(t => <TransferItem id={t.txHash} fileInfo={t} sentFile/>)}
            {myTransfers.length === 0 &&
                <Card className={styles.container}>
                    Henüz hiç dosya göndermediniz. Dosya göndermek için dosya gönder sekmesine geçebilirsiniz.
                </Card>}
            {pageCtx.isErrorModalOpen && <ErrorModal
                title='Hata'
                message={`Dosyalar Yüklenirken Bir Hata Oluştu ${error}`}
                onConfirm={errorConfirmHandler}
            />}
        </div>
    )
}

export default SentFiles;