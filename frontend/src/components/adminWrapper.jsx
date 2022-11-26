import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from "../firebase";

const AdminWrapper = () => {


    const [user, setUser] = useState({});
    const [loadingState, setLoadingState] = useState("loading");

    useEffect(() => {
        try{
        fetch("http://" + window.location.hostname + ":9000/api/open/usernames/" + auth.currentUser.uid, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                setLoadingState("Complete");
                setUser(data);
            })
            .catch(err => {
                console.log(err);
            });
        }
        catch(err){
            console.log("Not logged in");
        }
    }, []);

    return (loadingState === "Complete" ? ((auth.currentUser != null && user[0].admin === "true") ? <Outlet /> : <Navigate to="/home" />) : "");
}

export default AdminWrapper;

