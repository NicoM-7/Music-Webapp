import './track.css'

function Track(track) {
    const toggleCollapsible = (event) => {
        event.target.className.includes("active") ? event.target.className = "collapsible" : event.target.className += " active";
        var content = event.target.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        }
        else {
            content.style.display = "block";
        }
    }

    return (
        <div>
            <button type="button" className="collapsible" onClick={toggleCollapsible}>Track</button>
            <div className="content">
                <p>aisdfbiasbgiuabgiuba</p>
            </div>
        </div >
    );
}

export default Track;