
import React from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

interface LayoutProps {
  children: React.ReactNode;
  isHomePage: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isHomePage }) => {
  return (
    <>
      <Header isHomePage={isHomePage} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

