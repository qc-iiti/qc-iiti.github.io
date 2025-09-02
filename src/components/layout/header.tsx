import React from 'react';
import Link from 'next/link';



const Header: React.FC = () => {
  return (
    <header className="qc-header">
      <div className="qc-logo">
        {/* --- CHANGE IS HERE: No <a> tag inside Link --- */}
        <Link href="/" className="qc-logo-link">
          {/*<svg*/}
          {/*  className="my-icon"*/}
          {/*  viewBox="0 0 1044 1044"*/}
          {/*  xmlns="http://www.w3.org/2000/svg"*/}
          {/*  xmlSpace="preserve"*/}
          {/*  overflow="hidden"*/}
          {/*>*/}
          {/*  /!* ... your svg data ... *!/*/}
          {/*  <g transform="translate(-2639 -633)">*/}
          {/*    <path d="M2864.97 1339.92..." fillRule="evenodd"/>*/}
          {/*    <path d="M3290.37 1165.8..." fillRule="evenodd"/>*/}
          {/*    <path d="M2862.91 997.723..." fillRule="evenodd"/>*/}
          {/*  </g>*/}
          {/*</svg>*/}
          <div className="qc-logo-text">
            <h1>QUANTUM COMPUTING @ IITI</h1>
          </div>
        </Link>
      </div>
      <nav className="qc-nav">
        <ul>
          {/* --- CHANGES ARE HERE: No <a> tags inside Links --- */}
          <li><Link href="/">Home</Link></li>
          <li><Link href="/members">Members</Link></li>
          <li><Link href="/projects">Projects</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
