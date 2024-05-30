import React, { useState, useRef, useEffect } from 'react';
import ArtworkCard from './ArtworkCard';
import axios from 'axios';
import './ArtworkDisplay.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const API_SEARCH = "https://collectionapi.metmuseum.org/public/collection/v1/search?";
export default function ArtworkDisplay(props) {
    const [IDs, setIDs] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [artworks, setArtworks] = useState([]);
    const PER_PAGE = 16;
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const constructAndFetchURL = async () => {
            setLoading(true);
            let searchUrl = API_SEARCH + "q=" + (props.query || 'a');
            if (props.medium.length > 0) {
                searchUrl += '&medium=' + props.medium.join('|');
            }
            if (props.department.length > 0) {
                searchUrl += '&departmentId=' + props.department.join('|');
            }
            if (props.geoLocation.length > 0) {
                searchUrl += '&geoLocation=' + props.geoLocation.join('|');
            }
            if (props.era != null) {
                searchUrl += '&dateBegin=' + props.era[0] + '&dateEnd=' + props.era[1];
            }
            if(props.isHighlight) {
                searchUrl += '&isHighlight=true';
            }
            if(props.isOnView) {
                searchUrl += '&isOnView=true';
            }

            try {
                console.log(searchUrl);
                const response = await axios.get(searchUrl);
                setIDs(response.data.objectIDs);
                setDataLength(response.data.total);
                setPageCount(Math.ceil(response.data.total / PER_PAGE));
            } catch (err) {
                console.error('Error fetching artwork IDs:', err);
                setError('Failed to load artwork IDs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        constructAndFetchURL();
        setCurrPage(1);
    }, [props.query, props.medium, props.department, props.era, props.geoLocation, props.isHighlight, props.isOnView]); // Ensuring useEffect runs on these prop changes

    useEffect(() => {
        const fetchArtworks = async () => {
            if (IDs.length > 0) {
                setLoading(true);
                const artworksData = [];
                for (const id of IDs.slice((currPage - 1) * PER_PAGE, currPage * PER_PAGE)) {
                    try {
                        const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                        const artwork = response.data;
                        if (artwork && artwork.objectID) {
                            artworksData.push({
                                objectID: artwork.objectID,
                                // isHighlight: artwork.isHighlight,
                                image: artwork.primaryImage,
                                objectURL: artwork.objectURL,
                                // imageSmall: artwork.primaryImageSmall,
                                // department: artwork.department,
                                artist: artwork.artistDisplayName,
                                title: artwork.title,
                            });
                        }
                    } catch (error) {
                        console.error(`Failed to fetch artwork with ID ${id}: ${error}`);
                    }
                }
                setArtworks(artworksData);
                setLoading(false);
            }
        };
        fetchArtworks();
    }, [currPage, IDs]);

    function pageOnChange(e, p) {
        setCurrPage(p);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="artwork-display-container">
                {artworks.map((artwork) => {
                    return < ArtworkCard key={artwork.objectID} artwork={artwork} />
                })}
            </div>
            <div className="pagination">
                <Pagination count={pageCount} size="large" page={currPage} onChange={pageOnChange} />
            </div>
        </div>
    )
}