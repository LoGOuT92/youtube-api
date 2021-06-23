import React from 'react';
import styles from './Content.module.css';

export default function Content(props) {
    return (
        <li className={styles.video} key={props.id}>
 
            <p><b>Tytul</b> {props.title}</p>
            <p><b>Liczba polubien</b> : {props.like}</p>
            <p><b>Wiswietlenia</b> : {props.views}</p>
            <img src={props.image} alt="image"></img>
            <button type="button" onClick={props.handleRemove}>
            Usun
          </button>
        </li>
    )
}
