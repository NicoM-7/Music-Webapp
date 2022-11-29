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

        if(!openReviewButton){
            fetch("/api/secure/playlists/review/" + playlist.id, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setReviews(data.map((review) => <Review {...review} key={review.playlistId} />));
            })
            .catch(err => {
                console.log(err);
            })
        }
        else{
            setReviews(<div></div>);
        }
        openReviewClicked(!openReviewButton);
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
                {reviews}
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
            <li onClick={expand}>Created By: {playlist.username}</li>
            <li onClick={expand}>Description: {playlist.description}</li>
            <li onClick={expand}>Number of Tracks: {playlist.numTracks}</li>
            <li onClick={expand}>Total Playtime: {playlist.playtime}</li>
            <li onClick={expand}>Rating: {rating != null ? <Rating
                initialValue={rating}
                size={20}
                readonly={rating > 0}
                fillColor='orange'
                emptyColor='gray'
                className='foo' // Will remove the inline style if applied
            /> : "No rating!"}</li>
            <li onClick={expand}>Last Modified: {playlist.lastModified}</li>
            {
                expanded ? showExpandedView() : <div></div>
            }
        </ul>
    </div>
)
        }

export default Playlist;