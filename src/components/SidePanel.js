import { Link } from "react-router-dom"; // Import Link from React Router
import "../css/SidePanel.css";
import profileImg from '../assets/585e2f1c1364116ce58fc610e4726336.jpg'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const API = process.env.REACT_APP_API;


function SidePanel({ progress , pic}) {
  const { username } = useParams();
  
  return (
    <div className="side-panel-container">
      {/* Profile Section */}
       <div className="side-panel-profile">
        <img
          src={pic.data || profileImg} // fallback if no photo
          alt="Profile"
          className="side-panel-profile-img"
        />
        <h3 className="side-panel-profile-name">{username || "Anonymous"}</h3>
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












// const [pic, setPic] = useState();
  // useEffect(()=>{
  //     axios.get(`${API}/profile/${username}`)
  //       .then((res) => {
  //         setPic(res.data.profile_pic);
  //       })
  //       .catch((err) => {
  //         alert(err || err.response?.data?.error || 'Server Down');
  //       });
  // }, [username, pic, setPic])