/**
 * Created by shahartaite on 07/09/2016.
 */
import React from 'react';
import styles from './boo_logo.css';
import logo from '../../images/logo.svg';
const BooLogo = () => {
    return (
        <span className={styles.mainDiv}>
            <img src={logo} className={styles.booImg} alt=""/>
        </span>
    );
};

export default BooLogo;
