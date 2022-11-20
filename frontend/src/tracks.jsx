import { useState } from 'react';

function Tracks() {
    const [inputs, setInputs] = useState({
        track: "",
        artist: "",
        album: "",
        genre: "",
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            alert(JSON.stringify(inputs));
        }
    }

    return (
        <form onKeyDown={handleSubmit}>
            <input type="text" name="track" onChange={handleChange} value={inputs.track || ""} placeholder="Search by Track" /><br />
            <input type="text" name="artist" onChange={handleChange} value={inputs.artist || ""} placeholder="Search by Artist" /><br />
            <input type="text" name="album" onChange={handleChange} value={inputs.album || ""} placeholder="Search by Album" /><br />
            <input type="text" name="genre" onChange={handleChange} value={inputs.genre || ""} placeholder="Search by Genre" /><br />
        </form>
    );
}

export default Tracks;