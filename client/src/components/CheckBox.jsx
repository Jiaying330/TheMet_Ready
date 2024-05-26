import React, { useState } from 'react';

export default function CheckBox(props) {
    
    return (
        <div>
           <input className={props.className} type="checkbox" name={props.name} onClick={props.checkboxOnClick} checked={props.checked}/> <label for={props.name}>{props.text}</label>
        </div>
    )
}