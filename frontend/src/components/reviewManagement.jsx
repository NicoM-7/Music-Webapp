import { useState } from "react";
import React from "react";
import { useEffect } from 'react';
import ReviewInfo from "./playlistInfo";

function ReviewManagement() {

    const [inputs, setInputs] = useState({});
    const [playlists, setPlaylists] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/open/playlists/" + inputs.playlist, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPlaylists(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <React.Fragment>
            <div className="mainPlaylistDiv">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="playlist" onChange={handleChange} value={inputs.playlist || ""} placeholder="Search Playlist" /><br />
                </form>
                {
                    playlists !== "No Lists Found" ? playlists.map((playlist) => <ReviewInfo {...playlist} key={playlist.id} />) : <div>{alert("No results found!")}</div>
                }
            </div>
            
        </React.Fragment>
    )
}

export default ReviewManagement;
