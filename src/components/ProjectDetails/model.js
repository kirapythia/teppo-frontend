/**
 * Rearrange project object by selected criteria
 */

export const tidy = (project) => {
  const titleAndDetails = {
    title: project.name,
    details: {
      hansuProjectId: project.hansuProjectId,
      mainNo: project.mainNo,
      alternativeNames: (project.alternativeNames || []).join(', '),
      description: project.description,
    },
  };
  return titleAndDetails;
};
