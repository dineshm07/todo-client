import React, { useEffect, useState } from 'react';
import '../css/Profile.css';
import axios from 'axios';
import profileImg from '../assets/585e2f1c1364116ce58fc610e4726336.jpg';
import { useParams } from 'react-router-dom';

const API = process.env.REACT_APP_API;

function Profile({ pic, setPic }) {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/profile/${username}`);
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Server Down');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      axios.post(`${API}/upload/${username}`, { file: base64 })
        .then((res) => {
          setPic(res.data.profile_pic);
        })
        .catch(() => {});
    };
    reader.readAsDataURL(file);
  };

  

  return (
    <div className="profile-container">
      <div className="profile-img-container">
        <img
          src={pic || profileImg}
          alt="Profile"
          className="profile-img"
        />
      </div>

      <label className="profile-photo-upload">
        👤 Upload Profile Pic
        <input type="file" hidden onChange={handleUpload} />
      </label>

      {loading ? (
        <p className="profile-loading">Loading...</p>
      ) : error ? (
        <p className="profile-error">{error}</p>
      ) : (
        <ul className="profile-details">
          <li className="profile-item">
            <span className="profile-key">Name:</span> {user.username || 'N/A'}
          </li>
          <li className="profile-item">
            <span className="profile-key">Email:</span> {user.useremail || 'N/A'}
          </li>
          <li className="profile-item">
            <span className="profile-key">Todos:</span> {user.todos.length}
          </li>
        </ul>
      )}

      {user.useremail && (
        <a href={`mailto:${user.useremail}`} className="email-link">
          📧 Contact via Email
        </a>
      )}
    </div>
  );
}

export default Profile;
