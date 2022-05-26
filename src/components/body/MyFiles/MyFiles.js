import React from "react";
import Card from "../../UI/Card/Card";
import styles from './MyFiles.module.css';

const MyFiles = props => {
    return(
        <Card className={styles.container}>
            <p>My Files are listed here</p>
        </Card>
    )
}

export default MyFiles;