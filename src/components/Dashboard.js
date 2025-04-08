import { useState, useEffect } from "react";
import "../css/Dashboard.css";
import SidePanel from "./SidePanel";
import Activities from "./Activities";
import Welcome from "./Welcome";
import Profile from "./Profile";


function Dashboard({ component: Component }) {
    const [todos, setTodos] = useState([]);
    const [pic, setPic] = useState("");
    const [progressPercentage, setProgressPercentage] = useState(0);

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
                        <SidePanel progress={progressPercentage} />
                    </>
                ) : ( Component === Welcome ?
                    (
                        <>
                            <Component setTodos={setTodos}/>
                            <SidePanel progress={progressPercentage} pic = {pic} setPic = {setPic} />
                        </>
                    ) : (
                        Component === Profile ?
                        (
                            <>
                                <Component  setPic = {setPic}/>
                                <SidePanel setPic = {setPic} pic = {pic} />
                            </>
                        ) : (
                            <>
                                <Component />
                                <SidePanel />
                            </>
                        )
                    )
                )
            }
        </div>
    );
    
}

export default Dashboard;
