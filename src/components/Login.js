import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import '../css/Login.css'
import axios from 'axios'

const API = process.env.REACT_APP_API;

function Login() {
    const [useremail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!useremail.trim() || !password.trim()) {
            alert("Please enter both useremail and password.");
            return;
        }

        axios.post(`${API}/login`, { useremail, password })
        .then((res) => {
            const data = res.data;

            localStorage.setItem("useremail", data.useremail);
            navigate(`/dashboard/${data.username}`); 
        })
        .catch((error) => {
            alert(error.response?.data?.error || "Login failed. Please try again.");
        });
    };

    return (
        <div className="login-container">
            <h2 className="login-h2">Login</h2>
            <input
                type="email"
                className="login-input"
                placeholder="useremail"
                value={useremail}
                onChange={(e) => setUserEmail(e.target.value)}
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
                <p>Don't have an account? <Link to="/signup" className="login-signup-link">Sign Up here</Link></p>
            </div>
        </div>
    );
}

export default Login;
