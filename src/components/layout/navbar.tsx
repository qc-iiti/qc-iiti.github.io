import React from "react";
import Logo from '@/assets/logo.svg';

const Navbar : React.FC = () => {
    return <div id="Navbar">
        <div>
            <img src="/logo.svg" alt="Logo" />
            Quantum Computing @ IITI
        </div>
        <div>
            <div>Home</div>
            <div>Projects</div>
            <div>Resources</div>
            <div>Members</div>
        </div>
    </div>
}

export default Navbar;