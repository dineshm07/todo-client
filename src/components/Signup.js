import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import '../css/Signup.css'
import axios from "axios";

const API = process.env.REACT_APP_API;

function Signup() {
    const [username, setUsername] = useState("");
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const navigate = useNavigate(); // Initialize navigation

    const handleSignup = () => {
        if (password === cpassword){
            axios.post(`${API}/signup`,{
                username, useremail, password
            })
            .then((res) => {
                const data = res.data
                alert(data.message)
                navigate("/")
            })
            .catch((err) => {
                alert(err.response?.data?.error || 'Signup Failed Due to Server Down')
            });
        }
        else{
            alert('Check Password')
        }
    };


    return (
        <div className="signup-body">
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
                    type="email"
                    className="signup-input"
                    placeholder="Useremail"
                    value={useremail}
                    onChange={(e) => setUseremail(e.target.value)}
                />
                <input
                    type="password"
                    className="signup-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="signup-input"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={(e) => setCPassword(e.target.value)}
                />
                <button className="signup-button" onClick={handleSignup}>Sign Up</button>

                {/* Login prompt with Link */}
                <div className="signup-footer">
                    <p>Already have an account? <Link to="/" className="signup-login-link">Login here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
