import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Track from "./track";

function Playlist(playlist) {
    
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const getTracks = async () => {
            const trackID = playlist.tracks.toString().split(',');
            console.log(trackID);
            const tracks = [];
            for(let c = 0; c < trackID.length; c++){
                await fetch("http://" + window.location.hostname + ":9000/api/open/tracks/" + trackID[c], {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    tracks.push(data[0]);
                })
                .catch(err => {
                    console.log("entered");

                })
            }
    
            setTracks(tracks);
        }

        getTracks();
    }, []);

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
                    {tracks.map((track) => <Track {...track} key={track.trackID} />)}
                </li>
            </ul>
        </React.Fragment>
    )
}

export default Playlist;