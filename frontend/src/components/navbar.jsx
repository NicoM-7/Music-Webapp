import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Logout from "./logout";

function Navbar() {

    const [username, setUsername] = useState("");
    const [hasAdmin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        try{
        fetch("http://" + window.location.hostname + ":9000/api/open/usernames/" + auth.currentUser.uid, {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            if(data[0].admin === "true"){
                setAdmin(true);
                setUsername(data[0].username + " (ADMINISTRATOR)");
            }
            else{
                setAdmin(false);
                setUsername(data[0].username);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    catch(err){
        console.log("Not Logged In");
    }
    }, []);

    const homeButton = () => {
        navigate("/home", {replace: true});
    }

    const loginButton = () => {
        navigate("/login", {replace: true});
    }

    const tracksButton = () => {
        navigate("/tracks", {replace: true});
    }

    const searchPlaylistButton = () => {
        navigate("/playlists", {replace: true});
    }

    const managePlaylistButton = () => {
        navigate("/managePlaylists", {replace: true});
    }

    const manageUsersButton = () => {
        navigate("/management", {replace: true});
    }

    //TODO
    const manageReviewsButton = () => {
       
    }

    //TODO
    const refreshPageButton = () => {

    }

    return (
        <div>
        <nav>
            <h1>WELCOME {auth.currentUser === null ? "GUEST" : username } </h1>
            <ul>
                <li>
                    <button onClick={homeButton}>Home</button>
                </li>
        
                <li>
                    <button onClick={tracksButton}>View/Search Tracks</button>
                </li>
                <li>
                    <button onClick={searchPlaylistButton}>Search Playlists</button>
                </li>
                <li>
                    {auth.currentUser != null ? <button onClick={managePlaylistButton}>Create/Edit Playlist</button> : null}
                </li>
                <li>
                    {((auth.currentUser != null) && hasAdmin) ? <button onClick={manageUsersButton}>Edit Users</button> : null}
                </li>
                <li>
                    {((auth.currentUser != null) && hasAdmin) ? <button onClick={manageReviewsButton}>Edit Reviews</button> : null}
                </li>
                <li>
                    {auth.currentUser === null ? <button onClick={loginButton}>Login</button> : <Logout/> }
                </li>
                
            </ul>
        </nav>
        </div>
    )
}

export default Navbar;