import React from "react";
import styles from './BlockItem.module.css'
import Card from "../Card/Card";
import moment from "moment";

const BlockItem = props => {
    const startDate = moment(props.startDate)
    startDate.locale('tr')
    const endDate = moment(props.endDate)
    endDate.locale('tr')

    return (
        <Card className={styles.container}>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div><span className={styles.boldText}>Gönderen: </span> {props.senderAccount}</div>
                    <div><span className={styles.boldText}>Transfer ID: </span>{props.linearId}</div>
                    <div><span className={styles.boldText}>Alıcı: </span> {props.receiverAccount}</div>
                    <p className={styles.boldText}>Dosya Kullanım Tarihi:</p>
                    <div>{startDate.format('HH:mm DD/MM/YYYY')} - {endDate.format('HH:mm DD/MM/YYYY')}</div>
                    <div className={`${styles.boldText} ${props.isReceived ? styles.redText : styles.greenText}`}>
                        {props.isReceived ? 'İndirildi' : 'Gönderildi'}
                    </div>
                </div>
                <div className={styles.txHash}><span className={styles.boldText}>Transaction ID: </span>{props.txHash}</div>
            </div>
        </Card>
    )
}

export default BlockItem;