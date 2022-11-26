import React from "react";
import { useState } from "react";

function UserInfo(user) {

    const [adminState, setAdminState] = useState(user.admin === "true" ? "true" : "false");
    const [activationState, setActivationState] = useState(user.activated === "true" ? "true" : "false");

    const handleAdminChange = () => {
        
        let tempState = "";
        if(adminState === "true"){
            tempState = "false";
        }
        else{
            tempState = "true";
        }

        fetch("http://" + window.location.hostname + ":9000/api/admin/update/admin", {method: "POST", body: JSON.stringify({"admin" : tempState, "id" : user.id}), headers: new Headers({'Content-Type': 'application/json'})})
        .then(res => res.json())
        .then(data => {
            setAdminState(tempState);
        })
        .catch(err => {
            console.log(err);
            alert("Error updating user!");
        })
    }

    const handleActivationChange = () => {

        let tempState = "";
        if(activationState === "true"){
            tempState = "false";
        }
        else{
            tempState = "true";
        }

        fetch("http://" + window.location.hostname + ":9000/api/admin/update/activation", {method: "POST", body: JSON.stringify({"activation" : tempState, "id" : user.id}), headers: new Headers({'Content-Type': 'application/json'})})
        .then(res => res.json())
        .then(data => {
            setActivationState(tempState);
        }) 
        .catch(err => {
            console.log(err);
            alert("Error updating user!");
        })
    }
    
    return(
        <React.Fragment>
            <ul>
                <li>Username: {user.username}</li>
                <li>ID: {user.id}</li>
                <li>
                    <label>Has Admin: </label>
                    <input type="checkbox" name="public" onChange={handleAdminChange} checked={adminState === "true" ? true : false} /><br />
                </li>
                <li>
                    <label>Activated: </label>
                    <input type="checkbox" name="public" onChange={handleActivationChange} checked={activationState === "true" ? true : false} /><br />
                </li>
            </ul>
        </React.Fragment>
    )
}

export default UserInfo;