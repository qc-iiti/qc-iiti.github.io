import React from "react";
import styles from '../styles/Footer.module.css'

const Footer : React.FC = () => {
    return <div className={styles.footer}>
        <div className={styles.footerSection}>
            <h4>QC@IIT</h4>
            <p>Contact us via <a href="mailto:quantum@iiti.ac.in">email</a>.</p>
            <p>Made with ❤️ by the QC@IITI Web Dev Team.</p>
            <a href="https://github.com/qc-iiti/qc-iiti.github.io/issues">See a bug? Raise an Issue!</a>
        </div>
        <div className={styles.footerSection}>
            <h4>
                Follow Us
            </h4>
                <a href="http://github.com/qc-iiti">GitHub</a>
                <a href="http://linkedin.com/company/quantumcomputingclub">LinkedIn</a>
                <a href="http://instagram.com/">Instagram</a>
        </div>
        <div className={styles.footerSection}>
            <p>© 2025 Quantum Computing Club, IIT Indore</p>
        </div>
    </div>
}

export { Footer };