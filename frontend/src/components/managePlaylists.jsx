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
        let user = "test";
        setNewPlaylist(values => ({ ...values, user: user }));
        getPlaylists(user);
    }, []);

    useEffect(() => {
        playlistToSend.current = newPlaylist;
        playlistToSend.current.lastModified = moment().format('YYYY-MM-DD HH:mm:ss');
    }, [newPlaylist]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewPlaylist(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (playlistToSend.current.name === "" || playlistToSend.current.tracks === "") {
            alert("Playlist name and tracks are required fields");
        }
        else {
            fetch("http://" + window.location.hostname + ":9000/api/secure/playlists",
                {
                    method: "POST",
                    body: JSON.stringify({
                        "name": playlistToSend.current.name,
                        "user": playlistToSend.current.user,
                        "tracks": playlistToSend.current.tracks,
                        "lastModified": playlistToSend.current.lastModified
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
                    alert(err);
                });
        }
    }

    const getPlaylists = (user) => {
        fetch("http://" + window.location.hostname + ":9000/api/secure/playlists?user=" + user,
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

    const selectPlaylist = (event) => {
        setSelectedPlaylist(playlists[event.target.name]);
    }

    return (
        <div className='managePlaylists'>
            <div className="selectBox">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" onChange={handleChange} value={newPlaylist.name || ""} placeholder="Playlist Name" />
                    <input type="text" name="tracks" onChange={handleChange} value={newPlaylist.tracks || ""} placeholder="Tracks" />
                    <button type="submit">+</button>
                </form>
                {
                    playlists.map((playlist, i) => <button onClick={selectPlaylist} key={i} name={i}>{playlist.name}</button>)
                }
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

export default ManagePlaylist;