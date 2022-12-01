import React from "react"
import { useState, useEffect } from "react"

function TakedownPolicy() {

    const [html, setHTML] = useState(null);

    useEffect(() => {
        fetch("/api/open/takedownPolicy", { method: "GET", headers: new Headers({ 'Content-Type': 'application/json' })})
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
            <div dangerouslySetInnerHTML={{__html: html}}></div>
        </React.Fragment>
    )
}

export default TakedownPolicy;