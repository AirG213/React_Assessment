import React from 'react';
import '../styles/Header.scss'; 
import { Link } from 'react-router-dom';

// Header component to display the page title and subtitle
const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Link to="/" className="app-title-link" style={{ textDecoration: 'none', color: 'white' }}>
      <h1 className="app-title" style={{ color: '#363737' }}>Lizard Global Assessment</h1>
        <p className="app-subtitle">Discover the world of innovative solutions</p>
      </Link>
    </header>
  );
}
export default Header;