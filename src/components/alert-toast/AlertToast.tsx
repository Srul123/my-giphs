import React from 'react';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export interface AlertToastProps {
    open: boolean,
    vertical: "top" | "bottom",
    horizontal: "left" | "center" | "right",
    severityInfo?: severityInfo,
    messageInfo?: string
    time?: number
}

export type severityInfo = 'success' | 'info' | 'warning' | 'error' | undefined;


interface Props {
    alertPopup: AlertToastProps;
    closeAlert: () => void;
}


const AlertToast: React.FC<Props> = ({alertPopup, closeAlert}) => {

    const {open, vertical, horizontal, severityInfo, messageInfo, time} = alertPopup;

    return (
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={open}
            onClose={closeAlert}
            key={vertical + horizontal}
            autoHideDuration={time ? time : 4000}
        >
            <Alert onClose={closeAlert} severity={severityInfo}>
                <span style={{margin:"0 1em"}}> {messageInfo}</span>
            </Alert>
        </Snackbar>
    );
};

export default AlertToast;