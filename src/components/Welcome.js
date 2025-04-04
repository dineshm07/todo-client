import React from 'react'
import { useParams } from "react-router-dom";
import '../css/Welcome.css'

function Welcome() {

    const { username } = useParams();

    return (
        <div className="welcome-container">
            welcome {username}
        </div>
    )
}

export default Welcome
