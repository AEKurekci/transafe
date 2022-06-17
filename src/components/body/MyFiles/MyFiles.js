import React, {useContext, useEffect, useState} from "react";
import Card from "../../UI/Card/Card";
import styles from './MyFiles.module.css';
import {NODE_1_URL, NODE_2_URL} from '../../../constants/constants';
import PageContext from "../../../store/page-context";

const MyFiles = props => {
    const nodeURL = process.env.REACT_APP_PORT === '3000' ? NODE_1_URL : NODE_2_URL;
    const pageCtx = useContext(PageContext);
    const [myTransfers, setMyTransfers] = useState([]);

    const fetchFiles = async () => {

        const response = await fetch(nodeURL + 'getMyTransfers', {
            method: 'POST',
            body: JSON.stringify({accountName: pageCtx.user.cordaKey}),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            throw new Error("Get Files request fail!")
        }
        const data = await response.json();
        console.log(data)
        setMyTransfers(data);
    }

    useEffect(() => {
        fetchFiles();
    }, [pageCtx.activePage]);

    useEffect(() => {
        console.log(myTransfers)
    }, [myTransfers])

    return(
        <Card className={styles.container}>
            <p>My Files are listed here</p>
        </Card>
    )
}

export default MyFiles;