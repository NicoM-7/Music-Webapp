import React from 'react';
import {useNavigate} from 'react-router-dom';

function HomePage() {

    let navigate = useNavigate();
    const loginPage = () => {
        navigate("/login");
    };

    return (
        <div>
            <h1>SPOOTIFY</h1>
            <button onClick={loginPage}>Login</button>
            <div>About</div>
            <div>We collected all the songs from Free Music Archive and presented them in a cleaner and easier to understand way. Made by Ayush Sharma, Gabe Oliovotto, and Nico Myknees</div>
        </div>
    );
}

export default HomePage;