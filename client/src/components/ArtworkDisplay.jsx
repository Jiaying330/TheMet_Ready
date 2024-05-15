import React, { useState, useRef, useEffect } from 'react';
import ArtworkCard from './ArtworkCard';
import axios from 'axios';
import './ArtworkDisplay.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function ArtworkDisplay(props) {
    const [IDs, setIDs] = useState([]);
    const [dataLength, setDataLength] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [artworks, setArtworks] = useState([]);
    const PER_PAGE = 40;
    const [pageCount, setPageCount] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworkIDs = async () => {
            try {
                const response = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=van");
                setIDs(response.data.objectIDs)
                setDataLength(response.data.total);
                setPageCount(Math.ceil(response.data.total / PER_PAGE));

            } catch (err) {
                console.error('Error fetching artwork IDs:', err);
                setError('Failed to load artwork IDs. Please try again later.');
            } finally {
                setLoading(false);  
            }
        };

        fetchArtworkIDs();
    }, []);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                setLoading(true);
                const artworkRequests = IDs.slice((currPage - 1) * PER_PAGE, currPage * PER_PAGE).map((id) =>
                    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                );
                const responses = await Promise.all(artworkRequests);
                const artworksData = responses.map((artworkResponse) => {
                    const artwork = artworkResponse.data;
                    return {
                        objectID: artwork.objectID,
                        isHighlight: artwork.isHighlight,
                        image: artwork.primaryImage,
                        imageSmall: artwork.primaryImageSmall,
                        department: artwork.department,
                        artist: artwork.artistDisplayName,
                        title: artwork.title,
                    };
                });

                setArtworks(artworksData);

            } catch (err) {
                console.error('Error fetching artwork details:', err);
                setError('Failed to load artworks. Please try again later.');
            } finally {
                setLoading(false); 
            }
        }
        if (IDs.length > 0) { 
            fetchArtworks();
        }

    }, [currPage, IDs]);

    function pageOnChange(e, p) {
        console.log(p);
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
           <div class="artwork-display-container">
            {artworks.map((artwork) => {
                return < ArtworkCard artwork={artwork} />
            })}
        </div> 
        <div class="pagination">
        <Pagination count={pageCount} size="large" page={currPage} onChange={pageOnChange}/>
        </div>
        </div>
        

    )

}