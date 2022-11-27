import React from "react";
import { useState } from "react";

function Playlist(playlist) {
    
    const [tracks, setTracks] = useState({});

    const getTracks = () => {
        const trackID = playlist.tracks.toString().split(',');
        for(let c = 0; c < trackID.length; c++){
            
        }

    }
    return(
        <React.Fragment>
            <ul>
                <li>Playlist ID: {playlist.id}</li>
                <li>Playlist Name: {playlist.name}</li>
                <li>Created By: {playlist.user}</li>
                <li>Description: {playlist.description}</li>
                <li>Number of Tracks: {playlist.numTracks}</li>
                <li>Total Playtime: {playlist.playtime}</li>
                <li>Rating: {playlist.rating}</li>
                <li>Last Modified: {playlist.lastModified}</li>
                <li>
                    {}
                </li>
            </ul>
        </React.Fragment>
    )
}

export default UserInfo;