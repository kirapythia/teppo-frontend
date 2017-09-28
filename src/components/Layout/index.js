import React from 'react';

import Header from './Header';
import Footer from './Footer';

import './Layout.css';

const Layout = ({ children }) => (
  <div className="PageLayout">
    <Header />
    <div className="PageLayout__content container">
      { children }
    </div>
    <Footer />
  </div>
);

export default Layout;
