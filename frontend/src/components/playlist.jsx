import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Track from "./track";
import ReviewForm from "./reviewForm";
import Review from "./review";
import { Rating } from "react-simple-star-rating";
function Playlist(playlist) {

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
                await fetch("http://" + window.location.hostname + ":9000/api/open/tracks/" + trackID[c], { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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
            fetch("http://" + window.location.hostname + ":9000/api/secure/playlists/review/" + playlist.id, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
                .then(res => res.json())
                .then(data => {
                    setReviews(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <React.Fragment>
            <ul>
                <li>Playlist ID: {playlist.id}</li>
                <li>Playlist Name: {playlist.name}</li>
                <li>Created By: {playlist.username}</li>
                <li>Description: {playlist.description}</li>
                <li>Number of Tracks: {playlist.numTracks}</li>
                <li>Total Playtime: {playlist.playtime}</li>
                <li>Rating: {rating == null ? "No reviews" : <Rating
                    initialValue={rating}
                    size={20}
                    readonly={rating > 0}
                    fillColor='orange'
                    emptyColor='gray'
                    className='foo'
                />}</li>
                <li>Last Modified: {playlist.lastModified}</li>
                <li>
                    {tracks.map((track) => <Track {...track} key={track.trackID} />)}
                </li>
                <li>
                    <input type="button" name="addReview" onClick={clickAddReviewButton} value={!addReviewButton ? "Add Review" : "Close"} /><br />
                    <input type="button" name="expandReviews" onClick={clickExpandReviewsButton} value={!openReviewButton ? "Open Reviews" : "Close"} /><br />
                    {addReviewButton ? <ReviewForm {...playlist} key={playlist.id} /> : null}
                    {openReviewButton ? reviews.map((review) => <Review {...review} key={review.playlistId} />) : null}
                </li>
            </ul>
        </React.Fragment>
    )
}

export default Playlist;