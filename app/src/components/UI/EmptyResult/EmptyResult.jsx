import React from 'react';
import classes from './EmptyResult.module.css'

const EmptyResult = ({ category }) => {
    const message = category && category.replaceAll("%", "").trim().length > 0 ?
        <span>No Result for <span className={classes.category_bold}>{category.replaceAll("%", "")}</span></span> :
        <span>No Result</span>
    return (
        <div>
            {message}
        </div>
    );
};

export default EmptyResult;