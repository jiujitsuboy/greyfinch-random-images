
import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import classes from './Gif.module.css'
import 'react-lazy-load-image-component/src/effects/blur.css';

const Gif = ({ url, category }) => {

    return <LazyLoadImage className={classes.img} src={url} alt={category}
        placeholderSrc='./loading.gif' effect='blur'
    />

};

export default Gif;