import React, {Fragment, useContext, useEffect, useState} from "react";

import styles from './TransferDetails.module.css';
import useHttp from "../../../hooks/use-http";
import Card from "../../UI/Card/Card";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import PageContext from "../../../store/page-context";
import BlockItem from "../../UI/BlockItem/BlockItem";
import Line from "../../UI/Line/Line";

const TransferDetails = () => {
    const pageCtx = useContext(PageContext)
    const {isLoading, error, sendRequest: getHistoricData} = useHttp();
    const [transferList, setTransferList] = useState([]);

    useEffect(() => {
        getHistoricData(responseHandler, {
            path: 'getHistoricDataByLinearId',
            body: {linearId: localStorage.getItem('linearId')},
            method: 'POST'
        })
    }, [getHistoricData])

    const responseHandler = (response) => {
        setTransferList(response.transferHistory.map(transfer => ({
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
            })))
    }

    const errorConfirmHandler = () => {
        pageCtx.setIsErrorModalOpen(false)
    }

    if(isLoading){
        return(
            <Card className={styles.container}>
                <p>Transfer bilgileri yükleniyor...</p>
            </Card>
        )
    }

    return(
        <div className={styles.screen}>
            {transferList.length > 0 && <h1>{transferList[0].title}</h1>}
            <div className={styles.blockContainer}>
                {transferList.length > 0 && transferList.map((transferInfo, index) => (
                    <Fragment>
                        <div>
                            <h3>{index === 0 ? transferInfo.senderAccount : transferInfo.receiverAccount}</h3>
                            <BlockItem id={transferInfo.txHash}
                                       senderAccount={transferInfo.senderAccount}
                                       linearId={transferInfo.linearId}
                                       receiverAccount={transferInfo.receiverAccount}
                                       isReceived={transferInfo.isReceived}
                                       txHash={transferInfo.txHash}
                                       startDate={transferInfo.startDate}
                                       endDate={transferInfo.endDate}/>
                        </div>
                        {index !== transferList.length - 1 && <Line/>}
                    </Fragment>
                ))}
            </div>
            {pageCtx.isErrorModalOpen && <ErrorModal
                title='Hata'
                message={`Dosyalar Yüklenirken Bir Hata Oluştu ${error}`}
                onConfirm={errorConfirmHandler}
            />}
        </div>
    )
}

export default TransferDetails;