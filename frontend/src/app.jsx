import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Tracks from "./components/tracks";
import Login from "./components/login";
import ManagePlaylists from './components/managePlaylists';
import PrivateWrapper from "./components/privateWrapper";
import HomePage from "./components/homePage";
import SignUp from "./components/signUp";
import Logout from './components/logout';
import ChangePassword from './components/changePassword';
import ManagePlaylist from './components/managePlaylists';
import Playlists from './components/playlists';
import AdminWrapper from './components/adminWrapper';
import UserManagement from './components/userManagement';
import Navbar from './components/navbar';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>

                <Routes>
                    <Route path="/" element={<div><Navbar /><HomePage /></div>} />
                    <Route path="/home" element={<div><Navbar /><HomePage /></div>} />
                    <Route path="/tracks" element={<div><Navbar /><Tracks /></div>} />
                    <Route path="/managePlaylists" element={<div><Navbar /><ManagePlaylists /></div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route element={<PrivateWrapper />}>
                        <Route path="/authenticated" element={<ChangePassword />} />
                    </Route>
                    <Route element={<AdminWrapper/>}>
                        <Route path="/management" element={<div><Navbar /><UserManagement /></div>} />
                    </Route>
                    <Route path="/playlists" element={<div><Navbar /><Playlists /></div>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;