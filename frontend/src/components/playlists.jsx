import React from "react";
import { useState } from 'react';
import "../styles/playlist.css"
import Playlist from "./playlist";

function Playlists() {

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
                setPlaylists(data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const addReview = () => {

    }

    const expandReviews = () => {

    }

    console.log(playlists);

    return (
        <React.Fragment>
            <div className="mainPlaylistDiv">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="playlist" onChange={handleChange} value={inputs.playlist || ""} placeholder="Search Playlist" /><br />
                </form>
                {playlists.map((playlist) => <Playlist {...playlist} key={playlist.id} />)}
            </div>
        </React.Fragment>
    )
}

export default Playlists;