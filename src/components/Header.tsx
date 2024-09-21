import React from 'react';
import '../styles/Header.css'; 
import { Link } from 'react-router-dom';

// Header component to display the page title and subtitle
const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Link to="/" className="app-title-link">
        <h1 className="app-title">Lizard Global Assessment</h1>
      </Link>
      {/* Subtitle for additional context or description */}
      <p className="app-subtitle">Discover the world of innovative solutions</p>
    </header>
  );
}

export default Header;
