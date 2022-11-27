import { useState } from "react";
import UserInfo from "./userInfo";
import React from "react";
import { useEffect } from 'react';
import "../styles/userManagement.css";

function UserManagement() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://" + window.location.hostname + ":9000/api/admin/usernames", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="mainDivUM">
            <React.Fragment>
                {users.map((user) => <UserInfo {...user} key={user.id} />)}
            </React.Fragment>
        </div>
    )

}

export default UserManagement;
