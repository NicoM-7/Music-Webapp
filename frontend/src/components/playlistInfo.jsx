import React, { useInsertionEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import ReviewInfo from "./reviewInfo";

function PlaylistInfo(playlist) {

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        fetch("/api/admin/review/" + playlist.id ,{method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            if(data.length != 0){
                setReviews(data.map((review) => <ReviewInfo {...review} key={review.playlistId} />));
            }
            else{
                setReviews(<div>This playlist has no reviews!</div>);
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        fetch("/api/open/playlists/rating/" + playlist.id, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setRating(data);
            })
            .catch(err => {
                console.log(err);
            })
    });
    return (
        <React.Fragment>
            
            <ul>
                <li>Playlist By: {playlist.username}</li>
                <li>Playlist Name: {playlist.name}</li>
                <li>Description: {playlist.description}</li>
                <li>Rating: {rating != null ? <Rating
                initialValue={rating}
                size={20}
                readonly={rating > 0}
                fillColor='orange'
                emptyColor='gray'
                className='foo' // Will remove the inline style if applied
            /> : "No rating!"}</li>
                <li>
                {reviews}
                </li>
            </ul>
            <br></br>
        </React.Fragment>
    )
}

export default PlaylistInfo;