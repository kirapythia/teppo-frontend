import React from 'react';
import t from '../../locale';

const Footer = () => (
  <footer className="Footer">
    <div className="container">
      <div className="row">
        <div className="column column-100">&copy; {t('footer.copyright')}</div>
      </div>
    </div>
  </footer>
);

export default Footer;
