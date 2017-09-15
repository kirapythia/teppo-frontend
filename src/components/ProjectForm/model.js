const SAVE_PROJECT_URL = '/pythia/v1/projects/';

/**
 * Send project to the server. FIXME: not actually implemented yet.
 * @async
 * @param {object} project Values from the project form
 * @return {Promise}
 */
export function saveProject(project) {
  return new Promise(function (resolve, reject) {
    // resolve({ ...project, id: 132 });
    fetch(SAVE_PROJECT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    })
      .then(function (res) {
        if (!res.ok) {
          reject(new Error('This is error!'));
          return;
        }
        res.json()
          .then(resolve)
          .catch(() => reject(new Error('Invalid JSON')));
      })
      .catch(function () {
        reject(new Error('nmy error message'));
      });
  });
}
