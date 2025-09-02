import React from 'react';
import Layout from '@/components/layout/layout';
import Link from 'next/link';
import styles from '../styles/Projects.module.css';


const HomePage = () => {
  return (
    <Layout>
      <div
        className={styles.hero}
        style={{
          minHeight: '8vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        <h1 style={{ fontSize: '4rem', textAlign: 'center', margin: 0 }}>
          Quantum Computing Club @ IITI
        </h1>
        <p style={{ fontSize: '1.5rem', textAlign: 'center', maxWidth: '600px', margin: 0 }}>
          Welcome! Our members are actively working on exciting projects. See what we've been building.
        </p>

        {/* --- CHANGE IS HERE: No <a> tag. Style is passed directly to Link. --- */}
        <Link
          href="/projects"
          className={styles.ctaButton}
          style={{ padding: '1rem 2rem', fontSize: '1.2rem', marginTop: '1rem' }}
        >
          View Our Projects
        </Link>

      </div>
    </Layout>
  );
};

export default HomePage;
