import React from "react";
import styles from './ErrorModal.module.css';
import Button from "../../UI/Buttons/Button";
import Modal from "../../UI/Modal/Modal";

const ErrorModal = (props) => {
    return(
        <Modal onBackdropClick={props.onConfirm}>
            <header className={styles.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={styles.content}>
                <p>{props.message}</p>
            </div>
            <footer className={styles.actions}>
                <Button onClick={props.onConfirm}>Okay</Button>
            </footer>
        </Modal>
    )
}

export default ErrorModal;