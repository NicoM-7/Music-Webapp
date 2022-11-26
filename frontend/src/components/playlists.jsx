import React from "react";
import { useState } from 'react';
import "../styles/playlist.css"

function Playlists(){
    return (<div>public playlists page</div>)
    // const [userSearch, setUserSearch] = useState({});
    // const [publicPlaylists, setPublicPlaylists] = useState({});
    // const [searchResults, setSearchResults] = useState({});

    // const handleChange = (event) => {
    //     const value = event.target.value;
    //     setUserSearch(value);
    // }

    // const handleSubmit = (event) => {
    //     if(event.key === "Enter") {
    //         event.preventDefault();

    //         fetch("http://" + window.location.hostname + ":9000/api/open/playlists/getPublicPlaylists", {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})})
    //             .then(httpResp => {
    //                 return httpResp.json().then(data => {
    //                     if(httpResp.ok) {
    //                         setPublicPlaylists(data);
    //                     } else {
    //                         throw new Error(httpResp.status + "\n" + JSON.stringify(data));
    //                     }
    //                 })
    //             })
    //             .catch(err => {
    //                 alert(err);
    //             });
    //     }

    //     return(
    //         <div>
    //             <form onKeyDown={handleSubmit}>
    //                 <input type="text" name="playlistSearch" onChange={handleSubmit} placeholder="Search Playlists"/>
    //             </form>
    //             {
    //                 publicPlaylists.map((publicPlaylists) => <Playlists {...publicPlaylists} key={publicPlaylists.name} />)
    //             }
    //         </div>
    //     )
    // }

    // const handleSubmit = (event) => {
    //     if (event.key === "Enter"){
    //         event.preventDefault();

    //         setUserSearch = event.target.name;

    //         console.log("before fetch");

    //         fetch('http://' + window.location.hostname + ':9000/api/open/playlists/getPublicPlaylists', {method: 'GET', headers: new Headers({'Content-Type': 'application/json'})})
    //             .then(res => res.json())
    //             .then(function(data){
    //                 console.log(data);
    //                 setPublicPlaylists(data);
    //                 setSearchResults(publicPlaylists.filter(publicP => publicP.name.toString().toLowerCase().includes(userSearch.toLowerCase())));
    //                 console.log(searchResults);
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }
        
    // return(
    //     <div className="playlistSearch">
    //         <div className="input">
    //             <input type="text" name="playlistSearch" onChange={handleSubmit} placeholder="Search Playlists"/>
    //         </div>
    //         <div className="results">
    //             {JSON.stringify(publicPlaylists)}
    //             {JSON.stringify(searchResults)}
    //         </div>
    //     </div>
    // )
}

export default Playlists;