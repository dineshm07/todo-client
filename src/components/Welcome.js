import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import '../css/Welcome.css'
import axios from 'axios';
import SplitText from '../react-bit/SplitText';

const API = process.env.REACT_APP_API;

function Welcome({ setTodos }) {
  const { username } = useParams();

  useEffect(() => {
    axios.get(`${API}/todos/${username}`)
      .then((res) => setTodos(res.data))
      .catch((err) =>
        alert(err.response?.data?.error || "Error fetching todos:")
      );
  }, [username, setTodos]);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-glow" />
      <div className="welcome-header">
        <h2 className="welcome-title">Welcome,</h2>
        <SplitText
          text={username}
          className="username-text"
          delay={100}
          animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
          animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
          easing="easeOutCubic"
          threshold={0.2}
          rootMargin="-50px"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </div>
      <div className="welcome-description">
      <p>
        Welcome to your personal productivity dashboard! This Todo Manager is built to help you stay focused, organized, and motivated. Designed with simplicity and elegance in mind, our tool empowers you to track tasks, visualize progress, and manage your time efficiently.
    </p>
        <br />
    <p>
        Each user has a personalized space where you can create, update, and complete your tasks seamlessly. Your profile dynamically reflects your activity, showcasing completed tasks and your overall progress.
    </p>
        <br />
    <p>
        This app is powered by a modern tech stack using <strong>React.js</strong> for the frontend and <strong>Flask + MongoDB</strong> for the backend.
    </p>
        <br />
    <p>
        Explore your dashboard, plan your day, and take control of your productivity. Your next big achievement starts here — one task at a time ✅.
    </p>
      </div>
    </div>
  );
}

export default Welcome;
