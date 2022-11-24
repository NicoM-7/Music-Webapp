import React from "react";
import { useState } from 'react';
import "../styles/playlist.css"

function Playlists(){

    const [searchResults, setSearchResults] = useState({});

    fetch('http://' + window.location.hostname + ':9000/api/open/playlists/getPublicPlaylists', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})})
        .then(res => res.json())
        .then(function(data){
            setSearchResults(JSON.parse(data).filter(({data}) => data.public === 1));
        })
        .catch(err => console.log(err));

    return(
        <div className="playlistSearch">
            <div className="input">
                <input type="text" placeholder="Search Playlists"/>
            </div>
            <div className="results">
                
            </div>
        </div>
    )
}

export default Playlists;