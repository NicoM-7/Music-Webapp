import React from "react";
import {Rating} from 'react-simple-star-rating';
function Review(review) {

    return (
        <React.Fragment>
            <h1>Review by: {review.username}</h1>
            <p>Description: {review.review}</p>
            <Rating
                initialValue={review.rating}
                size={20}
                readonly={review.rating > 0}
                fillColor='orange'
                emptyColor='gray'
                className='foo' // Will remove the inline style if applied
            />
        </React.Fragment>
    )
}

export default Review;