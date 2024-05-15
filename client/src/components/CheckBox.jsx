import React, { useState } from 'react';

export default function CheckBox(props) {
    
    return (
        <div>
           <input type="checkbox" name={props.name} onClick={props.checkboxOnClick} checked={props.checked}/> <label for={props.name}>{props.text}</label>
        </div>
        
        // <input type="checkbox" name={props.item} onClick={checkboxOnClick}/>
        //                 <label for={item}>{item}</label>
    )
}