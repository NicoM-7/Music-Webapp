import React from "react";
import { useState } from "react";
import {Rating} from 'react-simple-star-rating';

function ReviewForm() {

    const [rating, setRating] = useState(0) // initial rating value

  const handleRating = (rate) => {
    setRating(rate)
    
  }

    return (
        <React.Fragment>
            <form>
                <label>Description</label>
                <input type="text"></input>
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
                <button>Post Review</button>
            </form>

        </React.Fragment>
    )
}


export default ReviewForm;