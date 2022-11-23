import { useState, useEffect } from 'react';
import Track from './track';

import '../styles/editPlaylist.css';

function EditPlaylist(playlist) {

    let [details, setDetails] = useState(playlist);

    let [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetchTracks();
    }, [details.tracks]);

    const fetchTracks = async () => {
        let newTracks = [];
        let trackIds = details.tracks.split(",");

        for (let id of trackIds) {
            await fetch("http://" + window.location.hostname + ":9000/api/open/tracks/" + id,
                {
                    method: "GET",
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (httpResp.ok) {
                            newTracks.push(data[0]);
                        }
                        else {
                            throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                        }
                    })
                })
                .catch(err => {
                    alert(err);
                });
        }

        setTracks(newTracks);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDetails(values => ({ ...values, [name]: value }));
    }

    return (
        <div className='editPlaylist'>
            <h1>{details.name}</h1>
            <textarea className='description' name="description" onChange={handleChange} value={details.description || ""} placeholder="Description"></textarea>
            {
                tracks.map((track) => <Track {...track} key={track.trackID} />)
            }
            {
                console.log(tracks)
            }
        </div>

    );
}

export default EditPlaylist;
