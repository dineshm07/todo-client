import { useState, useEffect } from "react";
import "../css/Dashboard.css";
import SidePanel from "./SidePanel";

function Dashboard({ component: Component }) {
    const [todos, setTodos] = useState([]);
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
            <Component todos={todos} setTodos={setTodos} />
            <SidePanel progress={progressPercentage} />
        </div>
    );
}

export default Dashboard;
