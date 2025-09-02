import React from 'react';

const Footer: React.FC = () => {
  return (
    <div id="Footer">
      <div className="footerSection">
        <h4>© 2025 Quantum Computing Club, IIT Indore</h4>
        <p>Made with ❤️ by the QC IITI Web Dev Team.</p>
        <p>&nbsp;</p>
        <p>See a bug? Raise an <a href="https://github.com/qc-iiti/qc-iiti.github.io/issues">Issue</a>!</p>
      </div>
      <div className="footerSection">
        <h4>Contact Us</h4>
        <p>quantum@iiti.ac.in</p>
        <h4>Follow Us</h4>
        <p><a href="http://github.com/qc-iiti">GitHub</a></p>
        <p><a href="http://linkedin.com/company/quantumcomputingclub">LinkedIn</a></p>
        <p><a href="http://instagram.com/">Instagram</a></p>
      </div>
      <div className="footerSection">
        <h5>President</h5>
        <p>Arham Aneeq</p>
        <p>+91 9136607511 / mems240005009@iiti.ac.in</p>
        <h5>Vice-Presidents</h5>
        <p>Aarush Bindod (+91 9422747359 / ep240051001@iiti.ac.in)</p>
        <p>V Hemal (+91 xxxxxxxxxxxx / ep240051020@iiti.ac.in)</p>
      </div>
    </div>
  );
};

export default Footer;
