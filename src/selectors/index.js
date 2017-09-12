/**
 * A collection of selectors that return values from the state. Used mainly
 * in mapStateToProps function when mapping state values to components using
 * react-redux library's connect function
 * @module selectors
 */


/**
 * Return url's projectId
 * @param {object} state
 * @return {number}
 */
export const getCurrentProjectId = state => (state.router.params || {}).projectId;
