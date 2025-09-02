import React from 'react';
import Header from './header'; // Import the header you made
import Footer from './footer'; // Import the footer you made



interface LayoutProps {
  children: React.ReactNode; // This will be the actual page content
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
