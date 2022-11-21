import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Tracks from "./components/tracks";
import Login from "./components/login";
import PrivateWrapper from "./components/privateRoute";
import HomePage from "./components/homePage";
import SignUp from "./components/signUp";

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/tracks" element={<Tracks />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route element={<PrivateWrapper/>}>
                        <Route path="/authenticated" element={<HomePage/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;