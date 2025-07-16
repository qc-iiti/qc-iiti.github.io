import React from "react";

const Footer : React.FC = () => {
    return <div id="Footer">
        <div className="footerSection">
            <h4>Quantum Computing @ IIT Indore</h4>
            <p>Made with ❤️ by the QC@IITI Web Dev Team.</p>
            <p>See a bug? Raise an <a href="https://github.com/qc-iiti/qc-iiti.github.io/issues">Issue</a>!</p>
        </div>
        <div className="footerSection">
            <h4>
                Follow Us
            </h4>
                <a href="http://github.com/qc-iiti">GitHub</a>
                <a href="http://linkedin.com/company/quantumcomputingclub">LinkedIn</a>
                <a href="http://instagram.com/">Instagram</a>
        </div>
        <div className="footerSection">
            <p>© 2025 Quantum Computing Club, IIT Indore</p>
        </div>
    </div>
}

export { Footer };