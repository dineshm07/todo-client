import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from '@react-spring/web';
import '../css/Help.css';

import loginImg from '../assets/login.png';
import signupImg from '../assets/signup.png';
import welcomeImg from '../assets/welcome.png';
import profileImg from '../assets/profile.png';
import activitiesImg from '../assets/activities.png';
import logoutImg from '../assets/logout.png';

const helpSections = [
  {
    title: '🔐 Login Page',
    image: loginImg,
    description: 'The login page allows existing users to securely log into their account using their username and password.',
  },
  {
    title: '📝 Signup Page',
    image: signupImg,
    description: 'The signup page helps new users register by filling out a short form with their credentials.',
  },
  {
    title: '🎉 Welcome Page',
    image: welcomeImg,
    description: 'Once logged in, users are greeted on the welcome page with an animated message and introductory content.',
  },
  {
    title: '👤 Profile Page',
    image: profileImg,
    description: 'The profile page shows the user’s details like name, email, and todos count, along with profile picture upload.',
  },
  {
    title: '✅ Activities Page',
    image: activitiesImg,
    description: 'This is where users manage their todos, mark them as complete, and track progress visually.',
  },
  {
    title: '🚪 Logout Page',
    image: logoutImg,
    description: 'The logout feature safely ends the user session and redirects them to the login page.',
  }
];

function Help() {
  return (
    <div className="help-container">
      {helpSections.map((section, index) => (
        <AnimatedSection key={index} section={section} />
      ))}
    </div>
  );
}

function AnimatedSection({ section }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(60px)',
    config: { tension: 120, friction: 20 },
  });

  return (
    <animated.div ref={ref} className="help-section" style={animation}>
      <h2>{section.title}</h2>
      <img src={section.image} alt={section.title} />
      <p>{section.description}</p>
    </animated.div>
  );
}

export default Help;
