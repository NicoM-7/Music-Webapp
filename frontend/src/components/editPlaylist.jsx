import { useState, useEffect } from 'react';
import moment from 'moment';
import Track from './track';

import '../styles/editPlaylist.css';

function EditPlaylist({ description, id, lastModified, name, numTracks, playtime, isPublic, rating, tracks, user, allPlaylists, setAllPlaylists }) {

    let [details, setDetails] = useState({});
    let [savedDetails, setSavedDetails] = useState({});
    let [tracksList, setTracksList] = useState([]);
    let [deleteFunction, setdeleteFunction] = useState(<input id="delButton" type="button" value="DELETE" onClick={deletePlaylist} />)


    useEffect(() => {
        let playlist = {
            description: description,
            id: id,
            lastModified: lastModified,
            name: name,
            numTracks: numTracks,
            playtime: playtime,
            public: isPublic,
            rating: rating,
            tracks: tracks,
            user: user
        }
        setDetails(playlist);
        setSavedDetails(playlist);
    }, [description, id, lastModified, name, numTracks, playtime, isPublic, rating, tracks, user]);

    useEffect(() => {
        fetchTracks();
    }, [savedDetails]);

    // fetchs the tracks for the selected playlist from backend
    const fetchTracks = async () => {
        let newTracks = [];
        let totalDuration = 0;
        let trackIds = details.tracks ? details.tracks.split(",").map(n => parseInt(n)).filter(n => n) : [];

        for (let id of trackIds) {
            await fetch("/api/open/tracks/" + id,
                {
                    method: "GET",
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (httpResp.ok) {
                            newTracks.push(data[0]);
                            // Calculation for total duration of list
                            let trackDur = data[0].trackDuration.split(":");
                            totalDuration += parseInt(trackDur[0]) * 60 + parseInt(trackDur[1]);
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

        setDetails(values => ({ ...values, numTracks: trackIds.length }));

        // Formating total duration to string for display
        totalDuration = `${parseInt(totalDuration / 60)}:${totalDuration % 60}`;
        setDetails(values => ({ ...values, playtime: totalDuration }));

        setTracksList(newTracks);
    }

    // Updates state based on value changes to form fields
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDetails(values => ({ ...values, [name]: value }));
    }

    // Updates state for checkboxes
    const handleCheckboxChange = (event) => {
        const name = event.target.name;
        const value = event.target.checked ? 1 : 0;
        setDetails(values => ({ ...values, [name]: value }));
    }

    // Updates state for tracks box
    const handleTracksChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDetails(values => ({ ...values, [name]: value }));
    }

    // On submission updates selected playlist's details in the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (JSON.stringify(details) !== JSON.stringify(savedDetails)) {
                // Fetching and checking if the tracks entered exist
                let newTracks = [];
                let totalDuration = 0;
                let trackIds = details.tracks ? details.tracks.split(",").map(n => parseInt(n)).filter(n => n) : [];

                if (trackIds.length === 0) {
                    throw new Error("Cannot save a playlist with no tracks");
                }
                for (let id of trackIds) {
                    await fetch("/api/open/tracks/" + id,
                        {
                            method: "GET",
                            headers: new Headers({
                                'Content-Type': 'application/json'
                            })
                        })
                        .then(httpResp => {
                            return httpResp.json().then(data => {
                                if (httpResp.ok) {
                                    newTracks.push(data[0]);
                                    // Calculation for total duration of list
                                    let trackDur = data[0].trackDuration.split(":");
                                    totalDuration += parseInt(trackDur[0]) * 60 + parseInt(trackDur[1]);
                                }
                                else {
                                    throw new Error(httpResp.status + "\n" + JSON.stringify(data));
                                }
                            })
                        })
                        .catch(err => {
                            throw err;
                        });
                }

                let time = moment().format('YYYY-MM-DD HH:mm:ss');
                setDetails(values => ({ ...values, lastModified: time, tracks: trackIds.toString() }));
                setSavedDetails({ ...details, lastModified: time, tracks: trackIds.toString() });
                savePlaylist({ ...details, lastModified: time, tracks: trackIds.toString() });
            }
        }
        catch (err) {
            alert(err);
        }
    }

    const savePlaylist = (playlist) => {
        fetch("/api/secure/playlists/" + playlist.id,
            {
                method: "POST",
                body: JSON.stringify({
                    "description": playlist.description,
                    "public": playlist.public,
                    "numTracks": playlist.numTracks,
                    "playtime": playlist.playtime,
                    "lastModified": playlist.lastModified,
                    "tracks": playlist.tracks,
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(httpResp => {
                return httpResp.json().then(data => {
                    if (httpResp.ok) {
                        let newPlaylists = allPlaylists;
                        let index = newPlaylists.findIndex(playlist => playlist.id === savedDetails.id);
                        newPlaylists[index] = playlist;
                        setAllPlaylists(newPlaylists);
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

    // Removes the track that was clicked on visually from the page
    const removeTrack = (event) => {
        let newTrackIds = details.tracks.split(",").map(n => parseInt(n)).filter(n => n);
        newTrackIds.splice(event.target.name, 1);
        setDetails(values => ({ ...values, tracks: newTrackIds.toString() }));
        let newTracks = tracksList;
        newTracks.splice(event.target.name, 1)
        setTracksList(newTracks);
    }

    function deletePlaylist(event) {
        if (event.target.value === "DELETE") {
            setdeleteFunction(
                <div>
                    <input id="delButton" type="button" value="CONFIRM" onClick={deletePlaylist} />
                    <input id="cancelButton" type="button" value="CANCEL" onClick={deletePlaylist} />
                </div>
            );
        }
        else if (event.target.value === "CONFIRM") {
            // Deletes playlist
            fetch("/api/secure/playlists/" + id,
                {
                    method: "DELETE",
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(httpResp => {
                    return httpResp.json().then(data => {
                        if (httpResp.ok) {
                            const filteredPlaylists = allPlaylists.filter((playlist) => playlist.id !== savedDetails.id);
                            setAllPlaylists(filteredPlaylists);
                            setDetails({
                                name: "Select a Playlist"
                            });
                            setSavedDetails({
                                name: "Select a Playlist"
                            });
                            setTracksList([]);
                            setdeleteFunction(<input id="delButton" type="button" value="DELETE" onClick={deletePlaylist} />);
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
        else {
            setdeleteFunction(<input id="delButton" type="button" value="DELETE" onClick={deletePlaylist} />);
        }
    }

    return (
        <div className='editPlaylist'>
            <h1>{details.name}</h1>
            <p>Created By: {details.user}</p>
            <p>Number of Tracks: {details.numTracks}</p>
            <p>Total Playtime: {details.playtime}</p>
            <p>Last Modified: {details.lastModified}</p>
            <form onSubmit={handleSubmit}>
                <textarea className='description' name="description" onChange={handleChange} value={details.description || ""} placeholder="Description"></textarea><br />
                <label>Make Public  </label>
                <input type="checkbox" name="public" onChange={handleCheckboxChange} value={details.public === 1 ? true : false} checked={details.public === 1 ? true : false} /><br />
                <button id="saveButton" type="submit">SAVE</button>
                {
                    deleteFunction
                }
                <br />
                {
                    tracksList.map((track, i) => {
                        return (
                            <div className="trackListItem" key={i}>
                                <div className="trackRemoveButton">
                                    <input type="button" name={i} onClick={removeTrack} value="-" />
                                </div>
                                <div className="trackDetails">
                                    <Track {...track} />
                                </div>
                            </div>
                        );
                    })
                }
                <label>Tracks  </label><br />
                <textarea id="tracksInput" type="text" name="tracks" onChange={handleTracksChange} value={details.tracks || ""} />
            </form >
        </div >

    );
}

export default EditPlaylist;
