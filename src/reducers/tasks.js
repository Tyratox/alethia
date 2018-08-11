/**
 * The tasks reducer
 * @param {Object} state The redux state
 * @param {Object} action The dispatched action
 * @returns {Object} The new state
 */
const tasksReducer = (
  state = { isFetching: false, error: null, tasks: [] },
  action
) => {
  switch (action.type) {
    case "FETCH_TASKS":
      return {
        isFetching: action.isFetching,
        error:
          action.error || action.error === null ? action.error : state.error,
        tasks: !action.isFetching && action.tasks ? action.tasks : state.tasks
      };
    default:
      return state;
  }
};

export default tasksReducer;

/**
 * Gets all tasks
 * @param {Object} state The redux state
 * @returns {Object} All tasks
 */
export const getTasks = state => state.tasks;
