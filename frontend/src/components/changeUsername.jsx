import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";

function ChangeUsername() {

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const changeUsername = (e) => {

        e.preventDefault();
        const user = auth.currentUser;
        const newUsername = inputs.username;

        fetch("http://" + window.location.hostname + ":9000/api/open/usernames", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                if(data.some(user => user.username === newUsername)){
                    alert("That username is taken!");
                }
                else{
                fetch("http://" + window.location.hostname + ":9000/api/secure/usernames/update/" + user.uid, { method: "PUT", body: JSON.stringify({ "username": newUsername }), headers: new Headers({ 'Content-Type': 'application/json' }) })
                    .then(res => res.json())
                    .then(data => {
                        alert("Your username has been changed!");
                        Navigate(useLocation);

                    })
                    .catch(err => {

                        alert("Error changing username. Please try again later")
                        console.log(err);
                    })
                }
            })
            .catch(err => {
                alert("An error occured");
                console.log(err);
            })
    }

    return (
        <div>
            <form onSubmit={changeUsername}>
                <label>Change Username</label>
                <input type="text" name="username" onChange={handleChange} value={inputs.username || ""} />
                <button type="submit">Change Username</button>
            </form>
        </div>
    )
}

export default ChangeUsername;