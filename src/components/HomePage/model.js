// import t, { tpl } from '../../locale';

// const FETCH_PROJECT_LIST_URL = '/pythia/vi/projects/';

export class ResourceNotFoundError extends Error { }

// return function escaped temporally
/* export const fetchProjectList = () => new Promise((resolve, reject) => {
  fetch(
    { FETCH_PROJECT_LIST_URL }, {
      method: 'GET',
      headers: { 'Conten-Type': 'application/json' },
    })
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
        return;
      }
      if (response.status === 404) {
        reject({
          status: response.status,
          message: tpl('network.error.project_list.not_found'),
        });
        return;
      }
      reject({
        type: 'Error',
        message: t('network.error.project_list.fetch'),
      });
    })
    .catch(() => reject({ status: 0, message: t('network.error.project_list.fetch') }));
});
 */
export const fetchProjectList = () => new Promise(resolve => resolve(
  [{ projectId: 1, hansuProjectId: '1234H', name: 'testip', mainNo: 2345, description: 'kuvaus' }]
));

