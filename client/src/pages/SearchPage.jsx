import React, { useState } from 'react';
import "./SearchPage.css";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Chip from '@mui/material/Chip';
import FilterBar from "../components/FilterBar";
import CheckBox from "../components/CheckBox";
import ArtworkDisplay from '../components/ArtworkDisplay';

const Medium = [
    "Albumen",
    "Albums",
    "Aquatint",
    "Arms",
    "Baseball Cards",
    "Beads",
    "Bone",
    "Bowls",
    "Brass",
    "Bronze",
    "Canvas",
    "Ceramics",
    "Chalk",
    "Clay",
    "Color lithographs",
    "Copper",
    "Copper alloy",
    "Costume",
    "Cotton",
    "Cups",
    "Dishes",
    "Drawings",
    "Dresses",
    "Drinking Vessels",
    "Earthenware",
    "Edged weapons",
    "Embroidery",
    "Enamels",
    "Engraving",
    "Ephemera",
    "Etching",
    "Faience",
    "Figures",
    "Figurines",
    "Film",
    "Fragments",
    "Furniture",
    "Gilt",
    "Glass",
    "Glass plate",
    "Glaze",
    "Glazing",
    "Gold",
    "Gouache",
    "Graphite",
    "Illustrations",
    "Ink",
    "Iron",
    "Iron alloy",
    "Ivory",
    "Jars",
    "Jewelry",
    "Kylikes",
    "Lace",
    "Leather",
    "Limestone",
    "Linen",
    "Lithographs",
    "Medals",
    "Metal",
    "Metalwork",
    "Musical instruments",
    "Needlework",
    "Negatives",
    "Paintings",
    "Paper",
    "Photographs",
    "Photolithographs",
    "Photomechanical reproductions",
    "Planographic prints",
    "Plastic",
    "Plates",
    "Porcelain",
    "Pottery",
    "Printing",
    "Printing blocks",
    "Prints",
    "Relief prints",
    "Reliefs",
    "Sculpture",
    "Silk",
    "Silver",
    "Statues",
    "Steel",
    "Stone",
    "Swords",
    "Terracotta",
    "Textiles",
    "Vases",
    "Vessels",
    "Watercolors",
    "Wood",
    "Wood blocks",
    "Wood engravings",
    "Woodcuts",
    "Wool",
    "Woven"
];

const Department = [
    {
      "departmentId": 1,
      "displayName": "American Decorative Arts"
    },
    {
      "departmentId": 3,
      "displayName": "Ancient Near Eastern Art"
    },
    {
      "departmentId": 4,
      "displayName": "Arms and Armor"
    },
    {
      "departmentId": 5,
      "displayName": "Arts of Africa, Oceania, and the Americas"
    },
    {
      "departmentId": 6,
      "displayName": "Asian Art"
    },
    {
      "departmentId": 7,
      "displayName": "The Cloisters"
    },
    {
      "departmentId": 8,
      "displayName": "The Costume Institute"
    },
    {
      "departmentId": 9,
      "displayName": "Drawings and Prints"
    },
    {
      "departmentId": 10,
      "displayName": "Egyptian Art"
    },
    {
      "departmentId": 11,
      "displayName": "European Paintings"
    },
    {
      "departmentId": 12,
      "displayName": "European Sculpture and Decorative Arts"
    },
    {
      "departmentId": 13,
      "displayName": "Greek and Roman Art"
    },
    {
      "departmentId": 14,
      "displayName": "Islamic Art"
    },
    {
      "departmentId": 15,
      "displayName": "The Robert Lehman Collection"
    },
    {
      "departmentId": 16,
      "displayName": "The Libraries"
    },
    {
      "departmentId": 17,
      "displayName": "Medieval Art"
    },
    {
      "departmentId": 18,
      "displayName": "Musical Instruments"
    },
    {
      "departmentId": 19,
      "displayName": "Photographs"
    },
    {
      "departmentId": 21,
      "displayName": "Modern Art"
    }
  ];
const DepartmentName = Department.map(department => department.displayName);
const departmentMap = Department.reduce((acc, department) => {
    acc[department.displayName] = department.departmentId;
    return acc;
}, {});

const GeoLocation = [
    "Africa",
    "Asia",
    "Austria",
    "Bavaria",
    "Bologna",
    "Campeche",
    "China",
    "England",
    "Europe",
    "Flanders",
    "France",
    "Germany",
    "Greece",
    "Guatemala",
    "India",
    "Istanbul",
    "Italy",
    "Marmara",
    "Mexico",
    "Netherlands",
    "New York",
    "North and Central America",
    "Nuremberg",
    "Padua",
    "Paris",
    "Roman Empire",
    "South Africa",
    "Staffordshire",
    "Tibet",
    "Turkey",
    "United Kingdom",
    "United States",
    "Venice",
    "Vienna"
];


const Era = [
    {
        displayName: "A.D. 1900-present",
        dateRange: [1900, new Date().getFullYear()] // Dynamically set the present year
    },
    {
        displayName: "A.D. 1800-1900",
        dateRange: [1800, 1900]
    },
    {
        displayName: "A.D. 1600-1800",
        dateRange: [1600, 1800]
    },
    {
        displayName: "1000 B.C.-A.D. 1",
        dateRange: [-1000, 1]
    },
    {
        displayName: "A.D. 1400-1600",
        dateRange: [1400, 1600]
    },
    {
        displayName: "2000-1000 B.C",
        dateRange: [-2000, -1000]
    },
    {
        displayName: "A.D. 500-1000",
        dateRange: [500, 1000]
    },
    {
        displayName: "A.D. 1000-1400",
        dateRange: [1000, 1400]
    },
    {
        displayName: "A.D. 1-500",
        dateRange: [1, 500]
    },
    {
        displayName: "8000-2000 B.C.",
        dateRange: [-8000, -2000]
    }
];
const EraName = Era.map(era => era.displayName);
const eraMap = Era.reduce((acc, era) => {
    acc[era.displayName] = era.dateRange;
    return acc;
},{})
export default function SearchArea() {
    const [query, setQuery] = useState(null);
    const [filterList, setFilterList] = useState([]);
    const [filterArea, setFilterArea] = useState(false);
    const [medium, setMedium] = useState([]);
    const [department, setDepartment] = useState([]);
    const [era, setEra] = useState(null);
    const [geoLocation, setGeoLocation] = useState([]);
    const [isHighlight, setIsHighlight] = useState(false);
    const [isOnView, setIsOnView] = useState(false);

    function searchBarOnChange(event) {
        setQuery(event.target.value);
    }

    function editFilterList(action, item, className) {
        console.log("className = " + className);
        if (className === "isHighlight") {
            setIsHighlight((prevValue) => !prevValue);
        } else if (className === "isOnView") {
            setIsOnView((prevValue) => !prevValue);
        } 

        if (action) {
            setFilterList((prevValue) => { 
                if (className === "Era") {
                    let newList = prevValue.filter((value) => {
                        return !EraName.includes(value);
                    });
                    return [...newList, item];
                }
                return [...prevValue, item]});
            if (className === "Medium") {
                setMedium((prevValue) => [...prevValue, item]);
            } else if (className === "Department") {
                setDepartment((prevValue) => [...prevValue, departmentMap[item]]);
            } else if (className === "Era") {
                setEra(eraMap[item])
            } else if (className === "GeoLocation") {
                setGeoLocation((prevValue) => [...prevValue, item]);
            } 
        }
        else {
            setFilterList((prevValue) => {
                return prevValue.filter((value) => {
                    return value !== item;
                });
            })
            if (className === "Medium") {
                setMedium((prevValue) => {
                    return prevValue.filter((value) => {
                        return value !== item;
                    });
                })
            } else if (className === "Department") {
                setDepartment((prevValue) => {
                    return prevValue.filter((value) => {
                        return value !== departmentMap[item];
                    });
                })
            } else if (className === "Era") {

                setEra(null);
                // setEra((prevValue) => {
                    // return prevValue.filter((value) => {
                    //     return value !== eraMap[item];
                    // });
                // })
            } else if (className === "GeoLocation") {
                setGeoLocation((prevValue) => {
                    return prevValue.filter((value) => {
                        return value !== item;
                    });
                })
            }
        }
        console.log(filterList);
    }

    function handleFilterByOnClick() {
        setFilterArea((prevValue) => (!prevValue));
    }

    function checkboxOnClick(event) {
        let { name, checked, className} = event.target;
        editFilterList(checked, name, className);
    }

    function checkSelected(item) {
        return filterList.includes(item);
    }

    return (
        <div className="search-area-container">
            <div>
                <div className="main-search">
                    Search The Collection <br />
                    <div className="main-search search-wrap">
                        <input className="main-search-bar" type="search" name="q" placeholder="Search all fields." onChange={searchBarOnChange}/>
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
                            <FilterBar title="Medium" className = "Medium" items={Medium} checkboxOnClick={checkboxOnClick} checkSelected={checkSelected}/>
                            <FilterBar title="Geographic Location" className = "GeoLocation" items={GeoLocation} checkboxOnClick={checkboxOnClick} checkSelected={checkSelected}/>
                            <FilterBar title="Date/Era" items={EraName} className = "Era" checkboxOnClick={checkboxOnClick} checkSelected={checkSelected}/>
                            <FilterBar title="Department" className = "Department" items={DepartmentName} checkboxOnClick={checkboxOnClick} checkSelected={checkSelected}/>
                        </div>
                        <div className="show-only">
                            <h3>Show Only:</h3>
                            <div className="show-only-container">
                                < CheckBox className="isHighlight" name="isHighlight" text="Highlights" checkboxOnClick={checkboxOnClick} checked={checkSelected("isHighlight")}/>
                                < CheckBox className="isOnView" name="isOnView" text="Artworks On Display" checkboxOnClick={checkboxOnClick} checked={checkSelected("isOnView")}/>
                            </div>
                        </div>
                        
                        <div className="selected-filter-list">
                            {filterList.map((item) => {
                                return <Chip label={item} variant="filled" onDelete={() => {
                                    let className = "Medium";
                                    if (DepartmentName.includes(item)) {
                                        className = "Department";
                                    } else if (EraName.includes(item)) {
                                        className = "Era";
                                    } else if (GeoLocation.includes(item)) {
                                        className = "GeoLocation"
                                    }
                                    editFilterList(false, item, className);
                                }} />
                            })}
                        </div>
                    </div>
                )}

            </div>
            <h3>Showing Results</h3>
            <ArtworkDisplay 
            query={query} 
            medium={medium} 
            department={department} 
            era={era}
            geoLocation = {geoLocation}
            isHighlight={isHighlight}
            isOnView={isOnView}
            />

        </div>
    );
}