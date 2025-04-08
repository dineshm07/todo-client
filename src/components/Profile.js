import React, { useEffect, useState } from 'react';
import '../css/Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API = process.env.REACT_APP_API;

function Profile({setPic}) {
  const { username } = useParams();
  const [user, setUser] = useState(null);
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

  const renderValue = (value) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes ✅' : 'No ❌';
    if (Array.isArray(value)) return (
      <ul className="profile-array">
        {value.map((item, index) => (
          <li key={index}>
            {typeof item === 'object'
              ? JSON.stringify(item, null, 2)
              : item.toString()}
          </li>
        ))}
      </ul>
    );
    if (typeof value === 'object') return <pre>{JSON.stringify(value, null, 2)}</pre>;
    return value.toString();
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      axios.post(`${API}/upload/${username}`, { 'file': base64 })
      .then((photo)=>{
          setPic(photo)
      })
      .catch((err)=>{
          alert(err)
      })
      }
      
    reader.readAsDataURL(file);
  };
  return (
    <div className="profile-container">
      <label className="profile-photo-upload">
        👤 Upload Profile Pic
        <input type="file" hidden onChange= {handleUpload} />
      </label>

      {loading ? (
        <p className="profile-loading">Loading...</p>
      ) : error ? (
        <p className="profile-error">{error}</p>
      ) : (
        <ul className="profile-details">
          {Object.entries(user).map(([key, value]) => (
            <li key={key} className="profile-item">
              <strong className="profile-key">{key}:</strong> {renderValue(value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;
