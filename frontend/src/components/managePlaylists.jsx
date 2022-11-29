import { useState, useEffect } from 'react';
import moment from 'moment';
import Tracks from './tracks';
import EditPlaylist from './editPlaylist';

import '../styles/managePlaylist.css';
import { auth } from '../firebase.js';
import { useRef } from 'react';

function ManagePlaylist() {
    const [newPlaylist, setNewPlaylist] = useState({
        name: "",
        user: "",
        tracks: "",
        lastModified: ""
    });

    const [playlists, setPlaylists] = useState([]);

    const [selectedPlaylist, setSelectedPlaylist] = useState({});

    const playlistToSend = useRef({
        name: "",
        user: "",
        tracks: "",
        lastModified: ""
    });

    useEffect(() => {
        let user = auth.currentUser.uid;
        setNewPlaylist(values => ({ ...values, user: user }));
        getPlaylists(user);
    }, []);

    useEffect(() => {
        setSelectedPlaylist({});
    }, [playlists]);

    useEffect(() => {
        playlistToSend.current = newPlaylist;
        playlistToSend.current.lastModified = moment().format('YYYY-MM-DD HH:mm:ss');
    }, [newPlaylist]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewPlaylist(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // If no name or tracks are entered send alert
        if (playlistToSend.current.name === "" || playlistToSend.current.tracks === "") {
            alert("Playlist name and tracks are required fields");
        }
        else {
            try {
                // Fetching and checking if the tracks entered exist
                let newTracks = [];
                let totalDuration = 0;
                let trackIds = newPlaylist.tracks ? newPlaylist.tracks.split(",").map(n => parseInt(n)).filter(n => n) : [];

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

                fetch("/api/secure/playlists",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            "name": playlistToSend.current.name,
                            "user": playlistToSend.current.user,
                            "tracks": playlistToSend.current.tracks,
                            "lastModified": playlistToSend.current.lastModified,
                            "numTracks": trackIds.length,
                            "playtime": `${parseInt(totalDuration / 60)}:${totalDuration % 60}`
                        }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                    .then(httpResp => {
                        return httpResp.json().then(data => {
                            if (httpResp.ok) {
                                // Clearing new playlist inputs and getting this users playlists from backend
                                setNewPlaylist(values => ({ ...values, name: "", tracks: "", lastModified: "" }));
                                getPlaylists(newPlaylist.user);
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
            catch (err) {
                alert(err);
            }
        }
    }

    const getPlaylists = (user) => {
        fetch("/api/secure/playlists?user=" + user,
            {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
            .then(httpResp => {
                return httpResp.json().then(data => {
                    if (httpResp.ok) {
                        setPlaylists(data);
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

    const selectPlaylist = async (event) => {
        setSelectedPlaylist(playlists[event.target.name]);
    }

    return (
        <div className='managePlaylists'>
            <div className='playlistSide'>
                <div className="selectBox">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" onChange={handleChange} value={newPlaylist.name || ""} placeholder="Playlist Name" /><br></br>
                        <input type="text" name="tracks" onChange={handleChange} value={newPlaylist.tracks || ""} placeholder="Tracks" />
                        <button type="submit">+</button>
                    </form>
                    {
                        playlists.map((playlist, i) =>
                            <div key={i}>
                                <button onClick={selectPlaylist} name={i}>{playlist.name}</button>
                            </div>
                        )
                    }
                </div>
                <div className="playlistBox">
                    {
                        JSON.stringify(selectedPlaylist) === "{}" ? <h1 className='cH1'>Select a playlist</h1> : <EditPlaylist
                            description={selectedPlaylist.description}
                            id={selectedPlaylist.id}
                            lastModified={selectedPlaylist.lastModified}
                            name={selectedPlaylist.name}
                            numTracks={selectedPlaylist.numTracks}
                            playtime={selectedPlaylist.playtime}
                            isPublic={selectedPlaylist.public}
                            rating={selectedPlaylist.rating}
                            tracks={selectedPlaylist.tracks}
                            user={selectedPlaylist.user}
                            allPlaylists={playlists}
                            setAllPlaylists={setPlaylists} />
                    }
                </div>
            </div>
            <div className="tracksBox">
                <Tracks />
            </div>
        </div>
    );
}

export default ManagePlaylist;