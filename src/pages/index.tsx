import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/content/HeroSection';
import AboutSection from '@/components/content/AboutSection';
import PathwaySection from '@/components/content/PathwaySection';
import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar'

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Layout>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <PathwaySection />
        <Footer/>
      </Layout>
    </div>
  );
};

export default HomePage;
