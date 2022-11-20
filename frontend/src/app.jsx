import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Tracks from  "./components/tracks";
import Login from "./components/login";
import PrivateRoute from './components/privateRoute';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    <Route path="/tracks" element={<Tracks/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <PrivateRoute path="/authenticated" element={<Tracks/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;