import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PathwaySection from '@/components/sections/PathwaySection';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Layout isHomePage={true}>
        <HeroSection />
        <AboutSection />
        <PathwaySection />
      </Layout>
    </div>
  );
};

export default HomePage;
