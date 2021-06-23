import React from 'react';


export default function Form(props) {

    return (
        <form onSubmit={props.onSubmit}>
            <input type="text" 
            value={props.term}
            onChange={props.onSearch}
            />
            <button type="submit">Dodaj</button>



        </form>
    )
}
