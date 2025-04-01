import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/Dashboard.css'

function Dashboard() {
    const { username } = useParams();
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    // Fetch user's todos on load
    useEffect(() => {
        fetch(`http://localhost:5000/todos/${username}`)
            .then(res => res.json())
            .then(data => setTodos(data));
    }, [username]);

    // Add a new todo
    const addTodo = async () => {
        if (!task.trim()) return;

        const res = await fetch(`http://localhost:5000/todos/${username}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task }),
        });

        if (res.ok) {
            const data = await res.json();
            setTodos([...todos, data.todo]); // Use returned todo (includes _id)
            setTask("");
        }
    };

    // Toggle completion status
    const toggleTodo = async (id) => {
        await fetch(`http://localhost:5000/todos/${username}/${id}`, {
            method: "PUT",
        });

        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Delete todo
    const deleteTodo = async (id) => {
        await fetch(`http://localhost:5000/todos/${username}/${id}`, {
            method: "DELETE",
        });

        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
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
                        className={`dashboard-li ${todo.completed ? 'completed' : ''}`}
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
    );
}

export default Dashboard;
