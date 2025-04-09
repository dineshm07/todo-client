import { useState, useEffect } from "react";
import "../css/Dashboard.css";
import SidePanel from "./SidePanel";
import Activities from "./Activities";
import Welcome from "./Welcome";
import Profile from "./Profile";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API = process.env.REACT_APP_API;


function Dashboard({ component: Component }) {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [todos, setTodos] = useState([]);
    const [pic, setPic] = useState("");
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        axios.get(`${API}/profile/${username}`)
        .then((res)=>{
            setUser(res.data)
            setPic(res.data.profile_pic)

        })
        .catch((err)=>{})
       }, [username, pic, setPic])

    // Update progress whenever todos change
    useEffect(() => {
        if (todos.length === 0) {
            setProgressPercentage(0);
        } else {
            const completed = todos.filter(todo => todo.completed).length;
            const progress = Math.round((completed / todos.length) * 100);
            setProgressPercentage(progress);
        }
    }, [todos]);
    

    return (
        <div className="body-container">
            {
                Component === Activities ? (
                    <>
                        <Component todos={todos} setTodos={setTodos} />
                        <SidePanel user = {user} setUser = {setUser} progress={progressPercentage} pic = {pic} />
                    </>
                ) : ( Component === Welcome ?
                    (
                        <>
                            <Component setTodos={setTodos}/>
                            <SidePanel user = {user} setUser = {setUser} progress={progressPercentage} pic = {pic} setPic = {setPic} />
                        </>
                    ) : (
                        Component === Profile ?
                        (
                            <>
                                <Component  setPic = {setPic} pic={pic}/>
                                <SidePanel user = {user} setUser = {setUser} setPic = {setPic} pic = {pic} />
                            </>
                        ) : (
                            <>
                                <Component />
                                <SidePanel pic={pic} />
                            </>
                        )
                    )
                )
            }
        </div>
    );
    
}

export default Dashboard;
