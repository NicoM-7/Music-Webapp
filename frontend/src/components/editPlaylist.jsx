import { useState, useEffect } from 'react';
import Track from './track';

import '../styles/editPlaylist.css';

function EditPlaylist(playlist) {

    let [details, setDetails] = useState(playlist);

    let [tracks, setTracks] = useState([]);

    useEffect(() => {
        fetchTracks();
    }, []);

    // fetchs the tracks for the selected playlist from backend
    const fetchTracks = async () => {
        let newTracks = [];
        let trackIds = details.tracks;

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

    // Updates state based on value changes to form fields
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDetails(values => ({ ...values, [name]: value }));
    }

    // Updates state for checkboxes
    const handleCheckboxChange = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        setDetails(values => ({ ...values, [name]: value }));
    }

    // Updates state for tracks box
    const handleTracksChange = (event) => {
        const name = event.target.name;
        const value = event.target.value.split(",");
        setDetails(values => ({ ...values, [name]: value }));
    }

    // On submission updates selected playlist's details in the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTracks();
        console.log(details);
    }

    // Removes the track that was clicked on visually from the page
    const removeTrack = (event) => {
        let newTrackIds = details.tracks;
        newTrackIds.splice(event.target.name, 1);
        setDetails(values => ({ ...values, tracks: newTrackIds }));
        let newTracks = tracks;
        newTracks.splice(event.target.name, 1)
        setTracks(newTracks);
    }

    return (
        <div className='editPlaylist'>
            <h1>{details.name}</h1>
            <form onSubmit={handleSubmit}>
                <textarea className='description' name="description" onChange={handleChange} value={details.description || ""} placeholder="Description"></textarea><br />
                <label>Make Public  </label>
                <input type="checkbox" name="public" onChange={handleCheckboxChange} value={details.public} /><br />
                <button id="saveButton" type="submit">SAVE</button><br />
                {
                    tracks.map((track, i) => {
                        return (
                            <div className="trackListItem" key={i}>
                                <div className="trackRemoveButton">
                                    <input type="button" name={i} onClick={removeTrack} value="-" />
                                </div>
                                <div className="trackDetails">
                                    <Track {...track} />
                                </div>
                            </div>
                        );
                    })
                }
                <label>Tracks  </label><br />
                <textarea id="tracksInput" type="text" name="tracks" onChange={handleTracksChange} value={details.tracks || ""} />
            </form >
        </div >

    );
}

export default EditPlaylist;
