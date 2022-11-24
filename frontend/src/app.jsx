import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Tracks from "./components/tracks";
import Login from "./components/login";
import ManagePlaylists from './components/managePlaylists';
import PrivateWrapper from "./components/privateWrapper";
import HomePage from "./components/homePage";
import SignUp from "./components/signUp";

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/tracks" element={<Tracks />} />
                    <Route path="/managePlaylists" element={<ManagePlaylists />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route element={<PrivateWrapper />}>
                        <Route path="/authenticated" element={<HomePage />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;