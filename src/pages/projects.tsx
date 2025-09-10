import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Link from 'next/link';
import Layout from '@/components/layout/layout';
import styles from '../styles/Projects.module.css';

// Define a type for your project row (adjust fields as per your CSV columns)
type Project = {
  id: string;
  title: string;
  description: string;
  members: string; // "member1;member2"
  tags: string;
  github_url: string;
  demo_url: string;
};

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/projects.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        Papa.parse<Project>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setProjects(results.data);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          }
        });
      } catch (e: any) {
        setError(`Failed to load projects data: ${e.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <div>
        <section className={styles.hero}>
          <h1>Our Innovations</h1>
          <p>A showcase of projects built by members of the QC Club.</p>
        </section>

        <main className={styles.projectGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.tags}>
                {project.tags.split(',').map(tag => (
                  <span key={tag} className={styles.tag}>{tag.trim()}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p className={styles.description}>{project.description}</p>
              <p className={styles.contributors}>
                By:{' '}
                {project.members.split(';').map((memberSlug, idx) => (
                  <React.Fragment key={idx}>
                    <Link href={`/members/${memberSlug.trim()}`}>
                      {memberSlug.trim()}
                    </Link>
                    {idx < project.members.split(';').length - 1 && ', '}
                  </React.Fragment>
                ))}
              </p>

              <div className={styles.links}>
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                    GitHub Repo
                  </a>
                )}
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </main>

        <section className={styles.cta}>
          <h2>Have a Project to Share?</h2>
          <p>To add your project, create a new branch and update the projects.csv file!</p>
          <a href="https://github.com/qc-iiti/qc-iiti.github.io/issues" className={styles.ctaButton}>
            Learn How
          </a>
        </section>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
