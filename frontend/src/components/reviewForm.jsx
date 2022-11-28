import React from "react";
import { useState } from "react";
import { Rating } from 'react-simple-star-rating';

function ReviewForm(playlist) {

    const [rating, setRating] = useState(0) // initial rating value
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleRating = (rate) => {
        setRating(rate)
    }

    const submitReview = () => {
        fetch("http://" + window.location.hostname + ":9000/api/secure/playlists/review", {method: "POST", body: JSON.stringify({"reviewId": 2, "playlistId": playlist.id, "name": playlist.name, "user": playlist.user, "rating": rating, "review": inputs.description}), headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log("ERROR");
        })
    }

    return (
        <React.Fragment>
            <form>
                <label>Description: </label>
                <input type="text" name="description" onChange= {handleChange} value={inputs.description} /><br />
                <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                    size={20}
                    label
                    transition
                    fillColor='orange'
                    emptyColor='gray'
                    className='foo' // Will remove the inline style if applied
                />
                <input type="button" name="submitReview" onClick={submitReview} value="Post Review" /><br />
            </form>

        </React.Fragment>
    )
}


export default ReviewForm;