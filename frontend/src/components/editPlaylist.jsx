import { useState, useEffect } from 'react';

import '../styles/editPlaylist.css';

function EditPlaylist(playlist) {

    let [details, setDetails] = useState(playlist);

    let [tracks, setTracks] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDetails(values => ({ ...values, [name]: value }));
    }

    useEffect(() => {
        //fetch tracks

    });

    return (
        <div className='editPlaylist'>
            <h1>{details.name}</h1>
            <textarea className='description' name="description" onChange={handleChange} value={details.description || ""} placeholder="Description"></textarea>
        </div>
    );
}

export default EditPlaylist;
