import React, { useState } from 'react';
import "./SearchArea.css";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Chip from '@mui/material/Chip';
import FilterBar from "./FilterBar";
import CheckBox from "./CheckBox";
import ArtworkDisplay from './ArtworkDisplay';

const listItems = ["Silk", "Bone", "Bottles", "Bowls", "Boxes", "Arms", "Books", "Canvas", "Clay", "Chalk", "Copper", "Cups", "Dresses", "Dishes"];
export default function SearchArea() {
    const [filterList, setFilterList] = useState([]);
    const [filterArea, setFilterArea] = useState(false);

    function editFilterList(action, item) {
        if (action) {
            setFilterList((prevValue) => { return [...prevValue, item] });
        }
        else {
            setFilterList((prevValue) => {
                return prevValue.filter((value) => {
                    return value !== item;
                });
            })
        }
        console.log(filterList);
    }

    function handleFilterByOnClick() {
        setFilterArea((prevValue) => (!prevValue));
    }

    function checkboxOnClick(event) {
        let { name, checked } = event.target;
        editFilterList(checked, name);
    }

    function checkSelected(item) {
        return filterList.includes(item);
    }

    function handleDelete(event) {
        console.log(event);
        // editFilterList(false, event.target.label);
    }

    return (
        <div className="search-area-container">
            <div>
                <div className="main-search">
                    Search The Collection <br />
                    <div className="main-search search-wrap">
                        <input className="main-search-bar" type="search" name="q" placeholder="Search all fields." />
                        <button><SearchIcon /></button>
                    </div>
                </div>
            </div>
            <div className="filter-field">
                <div className="filter-by-button">
                    <button onClick={handleFilterByOnClick}>Filter By {filterArea ? <KeyboardArrowUpIcon fontSize="lg" /> : <KeyboardArrowDownIcon fontSize="lg" />}</button>
                </div>
                {filterArea && (
                    <div className="filter-options-container">
                        <div className="filter-bar-container">
                            <FilterBar title="Medium" items={listItems} checkboxOnClick={checkboxOnClick} checkSelected={checkSelected}/>
                            <FilterBar title="Date/Era" items={[]} checkboxOnClick={checkboxOnClick} checkSelected={checkSelected}/>
                            <FilterBar title="Department" items={[]} checkboxOnClick={checkboxOnClick} checkSelected={checkSelected}/>
                        </div>
                        <div className="show-only">
                            <h3>Show Only:</h3>
                            <div className="show-only-container">
                                < CheckBox name="highlights" text="Highlights" checkboxOnClick={checkboxOnClick} />
                                < CheckBox name="onDisplay" text="Artworks On Display" checkboxOnClick={checkboxOnClick} />
                            </div>
                        </div>
                        
                        <div className="selected-filter-list">
                            {filterList.map((item) => {
                                return <Chip label={item} variant="filled" onDelete={() => {
                                    editFilterList(false, item);
                                }} />
                            })}
                        </div>
                    </div>

                )}

            </div>
            <h3>Showing Results</h3>
            <ArtworkDisplay />

        </div>
    );
}