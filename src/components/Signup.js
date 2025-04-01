import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import '../css/Signup.css'

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize navigation

    const handleSignup = async () => {
        const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        
        if (res.ok) {
            alert(data.message);
            navigate("/login"); // Navigate to login page
        } else {
            alert(data.error);
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-h2">Signup</h2>
            <input
                type="text"
                className="signup-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                className="signup-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signup-button" onClick={handleSignup}>Sign Up</button>

            {/* Login prompt with Link */}
            <div className="signup-footer">
                <p>Already have an account? <Link to="/login" className="signup-login-link">Login here</Link></p>
            </div>
        </div>
    );
}

export default Signup;
