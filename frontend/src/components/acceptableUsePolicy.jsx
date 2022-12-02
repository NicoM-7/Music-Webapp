import React from "react"
import { useState, useEffect } from "react"
import '../styles/dmca.css';

function AcceptableUsePolicy() {

    const [html, setHTML] = useState(null);

    useEffect(() => {
        fetch("/api/open/acceptableUsePolicy", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setHTML(data);
            })
            .catch(err => {
                console.log(err);
                setHTML(err);
            })
    }, []);

    return (
        <React.Fragment>
            <div className="dmcaP">
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        </React.Fragment>
    )
}

export default AcceptableUsePolicy;