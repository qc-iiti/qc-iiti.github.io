import React from 'react';
import Layout from '@/components/layout/Layout';
import styles from '../styles/Projects.module.css';

// These are Node.js modules, so they run on the server during the build
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

// This is your page component. It receives the 'projects' data as a prop.
type Project = {
  id: string;
  title: string;
  description: string;
  members: string;
  tags: string;
  github_url?: string;
  demo_url?: string;
};

interface ProjectsPageProps {
  projects: Project[];
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects }) => {
  return (
    <Layout isHomePage={true}>
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
              <p className={styles.contributors}>By: {project.members}</p>
              <div className={styles.links}>
                {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer">GitHub Repo</a>}
                {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer">Live Demo</a>}
              </div>
            </div>
          ))}
        </main>

        <section className={styles.cta}>
          <h2>Have a Project to Share?</h2>
          <p>To add your project, create a new branch and update the projects.csv file!</p>
          <a href="https://github.com/qc-iiti/qc-iiti.github.io/issues" className={styles.ctaButton}>Learn How</a>
        </section>
      </div>
    </Layout>
  );
};

// This special Next.js function runs only on the server when the site is built.
// It reads your CSV and sends the data to your page component.
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const result = Papa.parse(fileContent, {
    header: true, // This tells papaparse to use the first row as keys
    skipEmptyLines: true,
  });

  return {
    props: {
      projects: result.data, // Pass the parsed data to the ProjectsPage component
    },
  };
}

export default ProjectsPage;
