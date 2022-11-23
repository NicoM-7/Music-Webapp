import { useState } from 'react';
import Tracks from './tracks';
import EditPlaylist from './editPlaylist';

import '../styles/managePlaylist.css';

function CreatePlaylist() {
    const [name, setName] = useState("");

    const [selectedPlaylist, setSelectedPlaylist] = useState({
        name: "Select a Playlist",
        description: "",
        tracks: "2,3,5"
    });

    const handleChange = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://" + window.location.hostname + ":9000/api/secure/playlists?",
            {
                method: "POST",
                body: JSON.stringify({
                    "name": name,
                    "user": ""
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(httpResp => {
                return httpResp.json().then(data => {
                    if (httpResp.ok) {
                        console.log(data);
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

    return (
        <div className='managePlaylists'>
            <div className="selectBox">
                <form onSubmit={handleSubmit}>
                    <button type="submit">+</button>
                    <input type="text" name="name" onChange={handleChange} value={name || ""} placeholder="Playlist Name" />
                </form>
            </div>
            <div className="playlistBox">
                <EditPlaylist {...selectedPlaylist} />
            </div>
            <div className="tracksBox">
                <Tracks />
            </div>
        </div>
    );
}

export default CreatePlaylist;