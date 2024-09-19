import React from 'react';
import './css/Footer.css'; // Add CSS for footer styling

// Footer component to display creator information and a link
function Footer() {
  return (
    <footer className="footer">
      <p className="footer-content">
        Created by Rayan Gouadfel. Check out my work on{' '}
        {/* External link to GitHub profile */}
        <a href="https://github.com/AirG213/React_Assessment" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;
