import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import '../css/Welcome.css'
import axios from 'axios';

const API = process.env.REACT_APP_API;

function Welcome({setTodos}) {

    const { username } = useParams();

    useEffect(()=>{
        axios.get(`${API}/todos/${username}`)
        .then((res) => setTodos(res.data))
        .catch((err) =>
            alert(err.response?.data?.error || "Error fetching todos:")
      );
    }, [username, setTodos])

    return (
        <div className="welcome-container">
            welcome {username}
        </div>
    )
}

export default Welcome
