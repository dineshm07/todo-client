import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/Dashboard.css";

const API = process.env.REACT_APP_API;

function Dashboard() {
    const { username } = useParams();
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    // Fetch user's todos on load
    useEffect(() => {
        axios.get(`${API}/todos/${username}`)
            .then((res) => setTodos(res.data))
            .catch((err) => alert(err.response?.data?.error ||"Error fetching todos:"));
    }, [username]);

    // Add a new todo
    const addTodo =  () => {
        if (!task.trim()) return;

        axios.post(`${API}/todos/${username}`, { task })
        .then((res) => {
            setTodos([...todos, res.data.todo]); // Use returned todo (includes _id)
            setTask("");
        })
        .catch((err) => {
            alert("Error adding todo!", err);
        })
    };

    // Toggle completion status
    const toggleTodo = (id) => {
    
        axios.put(`${API}/todos/${username}/${id}`)
        .then(() => {
            setTodos(todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ))
        })
        .catch ((error) => {
            alert(error.response?.data?.error || "SERVER DOWN");
        })
    };

    // Delete todo
    const deleteTodo = (id) => {
        
        axios.delete(`${API}/todos/${username}/${id}`)
        .then(() =>{
            setTodos(todos.filter(todo => todo.id !== id));
        })
        .catch (error => {
            alert(error || "Server Down");
        })
    };

    return (
        <div className="body-container">
            {/* <div className="head-container">
                <button className="profile"></button>
            </div> */}
            <div className="dashboard-container">
                <h2 className="dashboard-h2">Welcome, {username}</h2>
                <input
                    type="text"
                    className="dashboard-input"
                    placeholder="New Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button className="dashboard-button" onClick={addTodo}>Add</button>
                <ul className="dashboard-ul">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`dashboard-li ${todo.completed ? "completed" : ""}`}
                            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                        >
                            <input
                                type="checkbox"
                                className="dashboard-checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            {todo.task}
                            <button
                                className="dashboard-delete-button"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
