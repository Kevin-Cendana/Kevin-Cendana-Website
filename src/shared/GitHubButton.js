import React from 'react';
import '../AppColors.css';
import githubIcon from '../images/navigation_bar_images/github_icon.png';

const buttonStyle = {
    width: 'clamp(55px, 20vw, 120px)',
    backgroundColor: 'black',
    boxShadow: '3px 4px 4px rgba(0, 0, 0, 0.25)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: 'clamp(5px, 1.2vw, 8px) clamp(10px, 2.8vw, 14px)',
    fontFamily: 'Gilroy',
    fontWeight: '600',
    fontSize: 'clamp(10px, 2.4vw, 15.5px)',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
};

const githubIconStyle = {
    display: 'inline-block',
    width: 'clamp(12px, 3vw, 24px)',
    marginRight: 'clamp(3px, 0.7vw, 7px)',
    transform: 'translateY(clamp(-2px, -0.3vw, -1px))'
};

const GitHubButton = () => {
    return (
        <a href="https://github.com/Kevin-Cendana" style={buttonStyle} className="github-button" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="Open In New Window Icon" style={githubIconStyle} />
            GitHub
        </a>
    );
};

export default GitHubButton;