import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Logout from "./logout";
import "../styles/navbar.css";
function Navbar() {

    const [username, setUsername] = useState("");
    const [hasAdmin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            fetch("http://" + window.location.hostname + ":9000/api/open/usernames/" + auth.currentUser.uid, { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
                .then(res => res.json())
                .then(data => {
                    if (data[0].admin === "true") {
                        setAdmin(true);
                        setUsername(data[0].username + " (ADMINISTRATOR)");
                    }
                    else {
                        setAdmin(false);
                        setUsername(data[0].username);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        catch (err) {
            console.log("Not Logged In");
        }
    });

    const homeButton = () => {
        navigate("/home", { replace: true });
    }

    const loginButton = () => {
        navigate("/login", { replace: true });
    }

    const tracksButton = () => {
        navigate("/tracks", { replace: true });
    }

    const searchPlaylistButton = () => {
        navigate("/playlists", { replace: true });
    }

    const managePlaylistButton = () => {
        navigate("/managePlaylists", { replace: true });
    }

    const manageUsersButton = () => {
        navigate("/manageUsers", { replace: true });
    }

    const manageReviewsButton = () => {
        navigate("/manageReviews", { replace: true });
    }

    const refreshPageButton = () => {
        navigate(useLocation, { replace: true });
    }

    const manageAccountButton = () => {
        navigate("/manageAccount", { replace: true });
    }

    return (
        <div>
            <nav>
                <div className="navBarDiv">
                    <h1 className="welcomeh1">WELCOME {auth.currentUser === null ? "GUEST" : username} </h1>
                    <ul>
                        <li>
                            <button className="navBarB" onClick={homeButton}>Home</button>
                        </li>

                        <li>
                            <button className="navBarB" onClick={tracksButton}>View/Search Tracks</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={searchPlaylistButton}>Search Playlists</button>
                        </li>
                        <li>
                            <button className="navBarB" onClick={refreshPageButton}>Refresh Page</button>
                        </li>
                        <li>
                            {auth.currentUser != null ? <button className="navBarB" onClick={manageAccountButton}>Manage Account</button> : null}
                        </li>
                        <li>
                            {auth.currentUser != null ? <button className="navBarB" onClick={managePlaylistButton}>Create/Edit Playlist</button> : null}
                        </li>
                        <li>
                            {((auth.currentUser != null) && hasAdmin) ? <button className="navBarB" onClick={manageUsersButton}>Edit Users</button> : null}
                        </li>
                        <li>
                            {((auth.currentUser != null) && hasAdmin) ? <button className="navBarB" onClick={manageReviewsButton}>Edit Reviews</button> : null}
                        </li>
                        <li>
                            {auth.currentUser === null ? <button className="navBarB" onClick={loginButton}>Login</button> : <Logout />}
                        </li>
                    </ul>
                </div>
            </nav> <br></br><br></br>
        </div>
    )
}

export default Navbar;