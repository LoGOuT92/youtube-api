import React from 'react';
import {useState} from 'react';
import ModalVideo from 'react-modal-video';
import './Content.scss';
import styles from './Content.module.css';



export default function Content(props) {
    const [isOpen, setOpen] = useState(false)
    return (
        <li key={props.id} className={props.favorites?(styles.v2):(styles.video)}>
            <button type="button" onClick={props.handleRemove}>Usun</button>
            <button type="button" onClick={props.addToFav}>{props.favorites?('Usun z FAV'):('Dodaj do Fav')}</button>
            <a href="https://google.com" className="button">obejrzyj</a>
            <p>Dodano : {props.dateAdd}</p>
            <p><b>Tytul</b> {props.title}</p>
            <p><b>Liczba polubien</b> : {props.like}</p>
            <p><b>Wiswietlenia</b> : {props.views}</p>
            <a href="#"> <img src={props.image} alt="img" onClick={()=> setOpen(true)}></img></a>
            
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={props.id} onClose={() => setOpen(false)} />



        </li>
    )
}
