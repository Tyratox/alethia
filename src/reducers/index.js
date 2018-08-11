import { combineReducers } from "redux";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";

import tasks, * as fromTasks from "./tasks";
import { wrap } from "../utilities/reducer";

const appReducer = combineReducers({
  loadingBar,
  tasks
});

/**
 * Gets all tasks
 * @param {Object} state The redux state
 * @returns {Object} All tasks
 */
export const getTasks = wrap(fromTasks.getTasks, state => state.tasks);

/**
 * Make sure that the state is removed if the user signed out of the application
 * @param {Object} state The previous state
 * @param {Object} action The action to process
 * @returns {Object} The new state
 */
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
