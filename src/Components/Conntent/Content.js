import React from 'react';
import {useState} from 'react';
import ModalVideo from 'react-modal-video';
import './Content.scss';
import styles from './Content.module.css';



export default function Content(props) {
    const [isOpen, setOpen] = useState(false)
    return (
        <li key={props.id} className={styles.video}>
            <button type="button" onClick={props.handleRemove}>
            Usun
          </button>
          <p>Dodano: {props.dateAdd}</p>
            <p><b>Tytul</b> {props.title}</p>
            <p><b>Liczba polubien</b> : {props.like}</p>
            <p><b>Wiswietlenia</b> : {props.views}</p>
           <a href="#"> <img src={props.image} alt="image"onClick={()=> setOpen(true)}></img></a>

            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={props.id} onClose={() => setOpen(false)} />



        </li>
    )
}
