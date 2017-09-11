/**
 * Send plan to the server. FIXME: not really implemented yet
 * @async
 * @return {Promise}
 */
// produces a send error. FIXME: remove when actually implemented
// export const savePlan = () =>
//  new Promise((resolve, reject) => reject(new Error('PlanForm error!')));
export const savePlan = () => new Promise(resolve => resolve({ projectId: 123 }));
