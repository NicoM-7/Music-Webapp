import React from "react";
import { useState} from "react";
import { Rating } from "react-simple-star-rating";

function ReviewInfo(review){

    const [hidden, setHidden] = useState(review.hidden === "true" ? "true" : "false");
    const handleChange = () => {

        let tempState = "";
        if (hidden === "true") {
            tempState = "false";
        }
        else {
            tempState = "true";
        }

        fetch("/api/admin/update/review", { method: "POST", body: JSON.stringify({ "hidden": tempState, "reviewId": review.reviewId }), headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setHidden(tempState);
            })
            .catch(err => {
                console.log(err);
                alert("Error updating user!");
            })
    }

    return (
        <React.Fragment>
            <br></br>
            <ul>
                <li>Review By: {review.username}</li>
                <li>Description: {review.review}</li>
                <li>Rating: {<Rating
                initialValue={review.rating}
                size={20}
                readonly={review.rating > 0}
                fillColor='orange'
                emptyColor='gray'
                className='foo' // Will remove the inline style if applied
            />}</li>
                <label>Hidden: </label>
                <input type="checkbox" name="public" onChange={handleChange} checked={hidden === "true" ? true : false} /><br />
            </ul>
            <br></br>
        </React.Fragment>
    )
}

export default ReviewInfo;