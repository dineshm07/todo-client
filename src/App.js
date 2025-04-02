import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard/:username" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
