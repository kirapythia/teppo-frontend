const FETCH_PROJECT_URL = '/pythia/v1/projects/';
/**
 * Rearrange project object by selected criteria
 */

export const tidy = (project) => {
  const titleAndDetails = {
    title: project.name,
    details: {
      hansuProjectId: project.hansuProjectId,
      mainNo: project.mainNo,
      /* alternativeNames: (project.alternativeNames || []).join(', '),
      */
      description: project.description,
    },
  };
  return titleAndDetails;
};

export const fetchProject = projectId =>
  new Promise((resolve, reject) => {
    fetch(`${FETCH_PROJECT_URL}${projectId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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

