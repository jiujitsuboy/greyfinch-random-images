import React from 'react';
import classes from './ErrorResult.module.css'

const ErrorResult = () => {
    return (
        <div className={classes.error_message}>Oh no... {error.message}</div>
    );
};

export default ErrorResult;