const url = 'api/pythia/v1/projects';
const config = {
  method: 'POST',
  'Content-Type': 'application/json',
};
/**
 * Send project to the server. FIXME: not actually implemented yet.
 * @async
 * @param {object} project Values from the project form
 * @return {Promise}
 */
export function saveProject(project) {
  return new Promise(function (resolve, reject) {
    // resolve({ ...project, id: 132 });
    fetch(url, { ...config, body: project })
      .then(function (res) {
        if (!res.ok) {
          reject(new Error(''));
          return;
        }
        res.json()
          .then(function (json) {
            resolve(json);
          })
          .catch(reject);
      })
      .catch(function () {
        reject(new Error('nmy error message'));
      });
  });
}
