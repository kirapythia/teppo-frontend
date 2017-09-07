import React from 'react';
import { Link } from 'redux-little-router';
import t from '../../locale';
import { HOME } from '../../constants/routes';

/**
 * The 404 page.
 */
const NotFoundPage = () => (
  <div>
    <h2>{t('notfoundpage.title')}</h2>
    <p>
      {t('notfoundpage.message')}. <Link href={HOME}>{t('link.back_to_home_page')}.</Link>
    </p>
  </div>
);

export default NotFoundPage;
