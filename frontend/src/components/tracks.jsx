import { useState } from 'react';

import Track from './track';

function Tracks() {
    const [inputs, setInputs] = useState({
        track: "",
        artist: "",
        album: "",
        genre: "",
        similarity: false,
    });

    const [tracks, setTracks] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleCheckboxChange = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
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
                "&similarity=" + inputs.similarity +
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
                            setTracks(data);
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

    return (
        <div>
            <form onKeyDown={handleSubmit}>
                <input type="text" name="track" onChange={handleChange} value={inputs.track || ""} placeholder="Search by Track" /><br />
                <input type="text" name="artist" onChange={handleChange} value={inputs.artist || ""} placeholder="Search by Artist" /><br />
                <input type="text" name="album" onChange={handleChange} value={inputs.album || ""} placeholder="Search by Album" /><br />
                <input type="text" name="genre" onChange={handleChange} value={inputs.genre || ""} placeholder="Search by Genre" /><br />
                <label>Similarity Search </label>
                <input type="checkbox" name="similarity" onChange={handleCheckboxChange} value={inputs.similarity} />
            </form>
            {
                tracks.map((track) => <Track {...track} key={track.trackID} />)
            }
        </div>
    );
}

export default Tracks;