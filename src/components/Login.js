import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import '../css/Login.css'

const API = process.env.REACT_APP_API;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            alert("Please enter both username and password.");
            return;
        }

        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem("username", username); // Store username for session persistence
            navigate(`/dashboard/${username}`); // Redirect to user's dashboard
        } else {
            alert(data.error || "Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-h2">Login</h2>
            <input
                type="text"
                className="login-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="login-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={handleLogin}>Login</button>

            {/* Signup prompt with Link */}
            <div className="login-footer">
                <p>Don't have an account? <Link to="/" className="login-signup-link">Sign Up here</Link></p>
            </div>
        </div>
    );
}

export default Login;
