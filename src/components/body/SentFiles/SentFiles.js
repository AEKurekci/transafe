import React, {useContext, useEffect, useState} from "react";
import Card from "../../UI/Card/Card";
import styles from './SentFiles.module.css';
import PageContext from "../../../store/page-context";
import useHttp from "../../../hooks/use-http";
import ErrorModal from "../ErrorModal/ErrorModal";

const SentFiles = props => {
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
                sender: transfer.state.data.sender,
                receiver: transfer.state.data.receiver,
                linearId: transfer.state.data.linearId.id
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
        <Card className={styles.container}>
            {myTransfers.length > 0 && myTransfers.map(t => <p>{t.txHash}</p>)}
            {myTransfers.length === 0 && <p>Henüz hiç dosya göndermediniz. Dosya göndermek için dosya gönder sekmesine geçebilirsiniz.</p>}
            {pageCtx.isErrorModalOpen && <ErrorModal
                title='Hata'
                message={`Dosyalar Yüklenirken Bir Hata Oluştu ${error}`}
                onConfirm={errorConfirmHandler}
            />}
        </Card>
    )
}

export default SentFiles;