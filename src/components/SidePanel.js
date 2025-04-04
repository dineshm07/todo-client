import { Link } from "react-router-dom"; // Import Link from React Router
import "../css/SidePanel.css";
import profileImg from '../assets/dog-img.jpg'
import { useParams } from "react-router-dom";



function SidePanel({ progress }) {
  const { username } = useParams();
  return (
    <div className="side-panel-container">
      {/* Profile Section */}
      <div className="side-panel-profile">
        <img src={profileImg} alt="Profile" className="side-panel-profile-img" />
        <h3 className="side-panel-profile-name">John Doe</h3>
      </div>

      {/* Navigation Options */}
      <ul className="side-panel-list">
        <li><Link to={`/dashboard/${username}/profile`}>Profile</Link></li>
        <li>
          <Link to={`/dashboard/${username}/activities`}>Activities</Link>
          <div className="side-panel-progress-bar">
            <div className="side-panel-progress" style={{ width: `${progress}%` }}></div>
          </div>
        </li>
        <li><Link to={`/dashboard/${username}/help`}>Help</Link></li>
        <li><Link to="/" className="side-panel-logout">Logout</Link></li>
      </ul>
    </div>
  );
}

export default SidePanel;
