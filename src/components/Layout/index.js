import React from 'react';

import Header from './Header';
import Footer from './Footer';

import './Layout.css';

const Layout = ({ children }) => (
  <div className="PageLayout">
    <Header />
    <main className="PageLayout__content container">
      { children }
    </main>
    <Footer />
  </div>
);

export default Layout;
