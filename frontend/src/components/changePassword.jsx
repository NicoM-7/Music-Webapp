import React, { useState } from "react";

import { updatePassword } from "firebase/auth";
import { auth } from "../firebase"; 
import { Navigate } from "react-router-dom";
import "../styles/changePassword.css";
 
function ChangePassword(){

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const changePassword = (e) => {

        e.preventDefault();
        const user = auth.currentUser;
        const newPassword = inputs.password;

        updatePassword(user, newPassword).then(() => {
            alert("Password change succsesful!");
        })
        .catch((error) => {
            alert("Password change failed!");
        })

        }

    return(
        <div className='cPadding'>
            <form onSubmit={changePassword}>
                <label className="cLabel">Change Password</label>
                <input className="cInput" placeholder="New Password" type="text" name="password" onChange={handleChange} value={inputs.password || ""}/>
                <button className="cButton" type="submit">Change Password</button>
            </form>
        </div>
    )
}

export default ChangePassword;