import t, { tpl } from '../../locale';

const FETCH_PROJECT_LIST_URL = '/pythia/v1/projects/';

export const fetchProjectList = () => new Promise((resolve, reject) => {
  fetch(
    FETCH_PROJECT_LIST_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
        return;
      }
      reject({
        type: 'Error',
        message: t('network.error.project_list.fetch'),
      });
    })
    .catch(() => reject({ status: 0, message: t('network.error.project_list.fetch') }));
});
