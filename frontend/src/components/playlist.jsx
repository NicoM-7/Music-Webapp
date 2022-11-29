import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Track from "./track";
import ReviewForm from "./reviewForm";
import Review from "./review";
import { Rating } from "react-simple-star-rating";
import '../styles/playlist.css'

function Playlist(playlist) {

    const [expanded, setExpanded] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);
    const [addReviewButton, addReviewClicked] = useState(false);
    const [openReviewButton, openReviewClicked] = useState(false);

    useEffect(() => {
        const getTracks = async () => {
            const trackID = playlist.tracks.toString().split(',');
            const tracks = [];
            for (let c = 0; c < trackID.length; c++) {
                await fetch("/api/open/tracks/" + trackID[c], { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
                    .then(res => res.json())
                    .then(data => {
                        tracks.push(data[0]);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            setTracks(tracks);
        }
        getTracks();
    }, []);

    useEffect(() => {
        fetch("http://" + window.location.hostname + ":9000/api/open/playlists/rating/" + playlist.id, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setRating(data);
            })
            .catch(err => {
                console.log(err);
            })
    });

    const clickAddReviewButton = (event) => {
        addReviewClicked(!addReviewButton);
    }

    const clickExpandReviewsButton = (event) => {
        console.log(openReviewButton);
        openReviewClicked(!openReviewButton);
        console.log(openReviewButton);
        if (openReviewButton) {
            fetch("/api/secure/playlists/review/" + playlist.id, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setReviews(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
         
    const showExpandedView = () => {
        return (
            <div>

                <li>
                    {tracks.map((track) => <Track {...track} key={track.trackID} />)}
                </li>
                <li>
                    <input type="button" name="addReview" onClick={clickAddReviewButton} value={!addReviewButton ? "Add Review" : "Close"} /><br />
                    <input type="button" name="expandReviews" onClick={clickExpandReviewsButton} value={!openReviewButton ? "Open Reviews" : "Close"} /><br />
                    {addReviewButton ? <ReviewForm {...playlist} key={playlist.id} /> : null}
                    {openReviewButton ? reviews.map((review) => <Review {...review} key={review.playlistId} />) : null}
                </li>
            </div>
        );
    }

    const expand = (event) => {
        if (event.target == event.currentTarget) {
            setExpanded(!expanded);
        }
    }

    return (
        <div className="playlist">
            <ul onClick={expand}>
                <li onClick={expand}>Playlist ID: {playlist.id}</li>
                <li onClick={expand}>Playlist Name: {playlist.name}</li>
                <li onClick={expand}>Created By: {playlist.user}</li>
                <li onClick={expand}>Description: {playlist.description}</li>
                <li onClick={expand}>Number of Tracks: {playlist.numTracks}</li>
                <li onClick={expand}>Total Playtime: {playlist.playtime}</li>
                <li onClick={expand}>Rating: {playlist.rating}</li>
                <li onClick={expand}>Last Modified: {playlist.lastModified}</li>
                {
                    expanded ? showExpandedView() : <div></div>
                }
            </ul>
        </div>
    )
}

export default Playlist;