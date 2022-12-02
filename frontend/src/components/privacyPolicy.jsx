import React from "react"
import { useState, useEffect } from "react"
import '../styles/dmca.css';

function PrivacyPolicy() {

    const [html, setHTML] = useState(null);

    useEffect(() => {
        fetch("/api/open/privacyPolicy", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' }) })
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

export default PrivacyPolicy;