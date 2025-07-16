import React from "react";

const Footer : React.FC = () => {
    return <div id="Footer">
        <div className="footerSection">
            <h4>© 2025 Quantum Computing Club, IIT Indore</h4>
            <p>Made with ❤️ by the QC IITI Web Dev Team.</p>
            <p>See a bug? Raise an <a href="https://github.com/qc-iiti/qc-iiti.github.io/issues">Issue</a>!</p>
        </div>
        <div className="footerSection">
            <h4>
                Contact Us
            </h4>
                <p>quantum.iiti.ac.in</p>
            <h4>
                Follow Us
            </h4>
                <p>
                    <a href="http://github.com/qc-iiti">GitHub</a>
                </p><p>
                    <a href="http://linkedin.com/company/quantumcomputingclub">LinkedIn</a>
                </p><p>
                    <a href="http://instagram.com/">Instagram</a>
                </p>
        </div>
        <div className="footerSection">
            
                
                <h5>President</h5>
                <p>Arham Aneeq</p>
                <p>+91 xxxxxxxxxxxx / mems2400050009@iiti.ac.in</p>

                <h5>Vice-Presidents</h5>
                <p>Aarush Bindod (+91 xxxxxxxxxxxx / ep...)</p>
                <p>V Hemal (+91 xxxxxxxxxxxx / ep...)</p>
        </div>
    </div>
}

export { Footer };