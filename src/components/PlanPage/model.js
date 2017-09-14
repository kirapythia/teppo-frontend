/**
 * Arrange project object by selected criteria
 */

export const tidy = (project) => {
  const titleAndDetails = {
    title: project.name,
    details: {
      mainNo: project.mainNo,
    },
  };
  return titleAndDetails;
};
