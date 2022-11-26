import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Logout from "./logout";

function Navbar() {

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        try{
        fetch("http://" + window.location.hostname + ":9000/api/open/usernames/" + auth.currentUser.uid, {method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
        .then(res => res.json())
        .then(data => {
            if(data[0].admin === "true"){
                setUsername(data[0].username + " (ADMINISTRATOR)");
            }
            else{
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

    return (
        <div>
        <nav>
            <h1>Spotify</h1>
            <ul>
                <li>
                    <button onClick={homeButton}>Home</button>
                </li>
        
                <li>
                    <button onClick={tracksButton}>View Tracks</button>
                </li>
                <li>
                    {auth.currentUser === null ? <button onClick={loginButton}>Login</button> : <Logout/> }
                </li>
                <li>
                    {auth.currentUser === null ? <p>Welcome Guest</p> : <p>{username}</p>}
                </li>
            </ul>
        </nav>
        </div>
    )
}

export default Navbar;