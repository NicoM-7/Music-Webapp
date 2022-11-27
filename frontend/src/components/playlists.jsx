import React from "react";
import { useState } from 'react';
import "../styles/playlist.css"
import Track from "./track";

function Playlists(){

    const [inputs, setInputs] = useState({});
    const [playlists, setPlaylists] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = () => {
        fetch("http://" + window.location.hostname + ":9000/api/open/list/playists", {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            setPlaylists(data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
    <React.Fragment>
            <form onKeyDown={handleSubmit}>
                <input type="text" name="playlist" onChange={handleChange} value={inputs.playlist || ""} placeholder="Search Playlist" /><br />
            </form>
    </React.Fragment>
)
}

export default Playlists;