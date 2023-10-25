import React from 'react';
import classes from './ErrorResult.module.css'

const ErrorResult = ({ error }) => {
    return (
        <div className={classes.error_message}>Oh no... {JSON.stringify(error)}</div>
    );
};

export default ErrorResult;