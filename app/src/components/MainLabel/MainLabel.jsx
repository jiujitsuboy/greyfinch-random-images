import React from 'react';
import classes from './MainLabel.module.css'

const MainLabel = () => {
    return (
        <div className={classes.container}>
            <img src='animals.jpeg' width='120pt' alt='logo-animals' />
            <div className={classes.label}>Funny Animals Videos</div>
        </div>

    );
};

export default MainLabel;