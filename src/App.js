import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import Activities from "./components/Activities";
import Profile from "./components/Profile";
import Help from "./components/Help";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard/:username" element={<Dashboard component={<Welcome />}/>} />
                <Route path="/dashboard/:username/activities" element={<Dashboard component={Activities}/>} />
                <Route path="/dashboard/:username/profile" element={<Dashboard component={<Profile />}/>} />
                <Route path="/dashboard/:username/help" element={<Dashboard component={<Help />}/>} />
            </Routes>
        </Router>
    );
}

export default App;
