import './track.css'

function Track(track) {

    const toggleCollapsible = (event) => {
        event.currentTarget.className.includes("active") ? event.currentTarget.className = "collapsible" : event.currentTarget.className += " active";
        var content = event.currentTarget.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        }
        else {
            content.style.display = "block";
        }
    }

    return (
        <div>
            <button type="button" className="collapsible" onClick={toggleCollapsible}>
                <table>
                    <tr>
                        <td>{track.trackID}</td>
                        <td>{track.trackTitle}</td>
                        <td>{track.artistName}</td>
                        <td>{track.trackDuration}</td>
                    </tr>
                </table>
            </button>
            <div className="content">
                <table>
                    <tr>
                        <td>{track.albumID}</td>
                        <td>{track.albumName}</td>
                        <td>{track.artistID}</td>
                        <td>{track.artistName}</td>
                    </tr>
                    <tr>
                        <td>{track.trackGenres}</td>
                    </tr>
                    <tr>
                        <td>{track.trackTags}</td>
                    </tr>
                    <tr>
                        <td>{track.trackDateCreated}</td>
                        <td>{track.trackDateRecorded}</td>
                    </tr>
                </table>
            </div>
        </div >
    );
}

export default Track;