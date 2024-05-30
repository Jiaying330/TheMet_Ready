import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchArtworkDetails(cartItems) {
    const [artworksByDepartment, setArtworksByDepartment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchArtworkDetails() {
            setLoading(true);
            try {
                const requests = cartItems.map(id =>
                    axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                );
                const responses = await Promise.all(requests);

                let artworksDetails = responses.reduce((acc, response) => {
                    const artwork = response.data;
                    const detail = {
                        objectID: artwork.objectID,
                        image: artwork.primaryImage,
                        gallery: artwork.GalleryNumber,
                        objectURL: artwork.objectURL,
                        department: artwork.department,
                        artist: artwork.artistDisplayName,
                        title: artwork.title,
                    };

                    if (acc[artwork.department]) {
                        acc[artwork.department].push(detail);
                    } else {
                        acc[artwork.department] = [detail];
                    }

                    return acc;
                }, {});

                const sorted = Object.entries(artworksDetails).sort((a, b) => b[1].length - a[1].length);
                setArtworksByDepartment(sorted);
            } catch (err) {
                console.error('Failed to fetch artwork details:', err);
                setError('Failed to fetch artwork details. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        if (cartItems && cartItems.length > 0) {
            fetchArtworkDetails();
        }
        else {
            setArtworksByDepartment([]);
        }
    }, [cartItems]);

    return { artworksByDepartment, loading, error };
}

export default useFetchArtworkDetails;
