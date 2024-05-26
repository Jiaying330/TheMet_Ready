import React, { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./FilterBar.css";
import CheckBox from "./CheckBox";

export default function FilterBar(props) {
    const [dropdown, setDropdown] = useState(false);
    const [dropdownContent, setDropdownContent] = useState(props.items);
    const filterSeachBarRef = useRef(null);
    const dropDownRef = useRef(null);

    // useEffect(() => {
    //     document.body.addEventListener("click", (event) => {
    //         if( dropDownRef && dropdown && !(event.composedPath().includes(dropDownRef) 
    //         || event.composedPath().includes(filterSeachBarRef))) {
    //             reset();
    //         }
    //         // console.log(dropdown);
            
    //         // setDropdown((prevValue) => { return !prevValue });
    //     });
    // }, []);

    // function reset() {
    //     filterSeachBarRef.current.value = "";
    //     setDropdownContent(props.items);
    //     setDropdown(false);
    //     // dropDownRef = useRef(null);
    // }

    function buttonOnClick() {
        // console.log(filterSeachBarRef.current);
        filterSeachBarRef.current.focus();
        setDropdown((prevValue) => { return !prevValue });
        // console.log(dropdonw);
    }

    function searchBarOnChange(event) {
        let value = event.target.value;
        setDropdownContent(() => {
            return props.items.filter((item) => {
                if (item.search(new RegExp(value, "i")) > -1) return item;
            })
        })
    }

    return (
        <div className="filter-field-container">
            <div className="filter-search-wrap">
                <input type="text" className="drop-down-search-bar" onClick={buttonOnClick} onChange={searchBarOnChange} ref={filterSeachBarRef} placeholder={props.title} />

                <button onClick={buttonOnClick}><KeyboardArrowDownIcon /></button>

            </div>
            {dropdown && (<ul className="drop-down" ref={dropDownRef}>
                {dropdownContent.map((item) => {
                    return <li>
                        < CheckBox className={props.title} name={item} text={item} checkboxOnClick={props.checkboxOnClick} checked={props.checkSelected(item)}/>
                    </li>
                })}
            </ul>)}
        </div>
    );
}