import { useState } from 'react';

import Track from './track';

function Tracks() {
    const [inputs, setInputs] = useState({
        track: "",
        artist: "",
        album: "",
        genre: "",
    });

    const [tracks, setTracks] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const results = 10;

            fetch("http://" + window.location.hostname + ":9000/api/tracks?" +
                "track=" + inputs.track.trim() +
                "&artist=" + inputs.artist.trim() +
                "&album=" + inputs.album.trim() +
                "&genre=" + inputs.genre.trim() +
                "&results=" + results,
                {
                    method: "GET",
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (httpResp.ok) {
                            data = data.map(track => track.trackTitle)
                            alert(JSON.stringify(data));
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
    }

    const renderTrack = (track) => {
        return (
            <Track />
        );
    }

    return (
        <div>
            <form onKeyDown={handleSubmit}>
                <input type="text" name="track" onChange={handleChange} value={inputs.track || ""} placeholder="Search by Track" /><br />
                <input type="text" name="artist" onChange={handleChange} value={inputs.artist || ""} placeholder="Search by Artist" /><br />
                <input type="text" name="album" onChange={handleChange} value={inputs.album || ""} placeholder="Search by Album" /><br />
                <input type="text" name="genre" onChange={handleChange} value={inputs.genre || ""} placeholder="Search by Genre" /><br />
            </form>
            <Track />
        </div>
    );
}

export default Tracks;