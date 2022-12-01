import React, { useEffect } from "react";
import { useState} from "react";
import { Rating } from "react-simple-star-rating";

function ReviewInfo(review){

    const [inputs, setInputs] = useState({});
    const [hidden, setHidden] = useState(review.hidden === "true" ? "true" : "false");
    const [dmca, setDMCA] = useState({});
    const [takedown, setTakedown] = useState(false);
    const [infringement, setInfringement] = useState(false);
    const [dispute, setDispute] = useState(false);
    const [save, setSave] = useState(false);

    useEffect(() => {
        fetch("/api/admin/dcma/" + review.reviewId, {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setDMCA(data[0]);
        })
        .catch(err => {
            console.log(err);
        })
    }, [save]);

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

    const handleInputs = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const takedownButton = () => {
        setTakedown(!takedown);
    }

    const infringementButton = () => {
        setInfringement(!infringement);
    }

    const disputeButton = () => {
        setDispute(!dispute);
    }

    const saveTakedown = () => {
        
        setSave(true);
        
        fetch("/api/admin/update/takedown/" + review.reviewId, {method: "POST", body: JSON.stringify({"takedown" : inputs.takedown}), headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setSave(false);
        })
        .catch(err => {
            console.log(err);
            setSave(false);
        });
    }

    const saveInfringement = () => {
        setSave(true);
        
        fetch("/api/admin/update/infringement/" + review.reviewId, {method: "POST", body: JSON.stringify({"infringement" : inputs.infringement}), headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            setSave(false);
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const saveDispute = () => {

        setSave(true);

        fetch("/api/admin/update/dispute/" + review.reviewId, {method: "POST", body: JSON.stringify({"dispute" : inputs.dispute}), headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            setSave(false);
            console.log(data);
        })
        .catch(err => {
            setSave(false);
            console.log(err);
        });
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
            <li>Takedown Request: {dmca.takedown != undefined ? dmca.takedown : null}
            <input type="button" name="submitTakedown" onClick={takedownButton} value={!takedown ? "Enter Date" : "Cancel"} />
                {takedown ? <div><input type="text" name="takedown" onChange={handleInputs} value={inputs.takedown || ""}/><button onClick={saveTakedown}>Save</button></div> : null}
            </li>
            <li>Infringement Notice: {dmca.infringement != undefined ? dmca.infringement : null}
                <input type="button" name="submitInfringement" onClick={infringementButton} value={!infringement ? "Enter Date" : "Cancel"} />
                {infringement ? <div><input type="text" name="infringement" onChange={handleInputs} value={inputs.infringement || ""}/><button onClick={saveInfringement}>Save</button></div> : null}
            </li>
            <li>Dispute Claim: {dmca.dispute != undefined ? dmca.dispute : null}
                <input type="button" name="submitTakedown" onClick={disputeButton} value={!dispute ? "Enter Date" : "Cancel"} />
                {dispute ? <div><input type="text" name="dispute" onChange={handleInputs} value={inputs.dispute || ""}/><button onClick={saveDispute}>Save</button></div> : null}
            </li>
                <label>Hidden: </label>
                <input type="checkbox" name="public" onChange={handleChange} checked={hidden === "true" ? true : false} /><br />
            </ul>
            <br></br>
        </React.Fragment>
    )
}

export default ReviewInfo;