import React from 'react';

interface HeaderProps {
  isHomePage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHomePage }) => {
  return (
    <header className="qc-header">
      <div className="qc-logo">
        <img src="/images/logo.png" alt="QC Club Logo" className="qc-logo-img" />
        <div className="qc-logo-text">
          <h1>Quantum Computing Club</h1>
          <span>IIT Indore</span>
        </div>
      </div>

      {isHomePage && (
        <nav className="qc-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
