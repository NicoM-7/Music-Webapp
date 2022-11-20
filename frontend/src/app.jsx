import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Tracks from './tracks';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <h1>Different page</h1>
                <Routes>
                    <Route path="/tracks" element={<Tracks/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;