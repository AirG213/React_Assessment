import React from 'react';
import '../styles/Header.css'; // Add CSS for header styling

// Header component to display the page title and subtitle
function Header() {
  return (
    <header className="app-header">
      <h1 className="app-title">Lizard Global Assessment</h1>
      {/* Subtitle for additional context or description */}
      <p className="app-subtitle">Discover the world of innovative solutions</p>
    </header>
  );
}

export default Header;
