import React from 'react';
import '../styles/Footer.scss'; 

// Footer component to display contact information and links
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="contact-icons"> {/* New container for icons */}
        <img 
          src={`${process.env.PUBLIC_URL}/mail-logo.png`} 
          alt="Mail" 
          className="mail-icon" 
          onClick={() => window.location.href = 'mailto:rayan.gouadfel@outlook.com'} 
        />
        <a href="https://www.linkedin.com/in/gouadfelrayan/" target="_blank" rel="noopener noreferrer">
          <img src={`${process.env.PUBLIC_URL}/linkedin-logo.png`} alt="LinkedIn" className="contact-icon" />
        </a>
        <a href="https://github.com/AirG213" target="_blank" rel="noopener noreferrer">
          <img src={`${process.env.PUBLIC_URL}/github-logo.png`} alt="GitHub" className="contact-icon" />
        </a>
      </div>
      <p>Created by Rayan Gouadfel. Terms & Conditions</p>
      <p>©2024. All rights reserved.</p>
    </footer>
  );
};


export default Footer;

