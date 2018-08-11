import iCal from "ical.js";

import { createFetchAction } from "../utilities/action";

/**
 * Parses the ical string to tasks
 * @param {string} icalString The received ical data
 * @returns {Array} The mapped tasks
 */
const mapTasks = icalString => {
  const jCalData = iCal.parse(icalString);
  const component = new ICAL.Component(jCalData);
  const vevents = component.getAllSubcomponents("vevent");

  return vevents.map(vevent => ({
    title: vevent.getFirstPropertyValue("summary"),
    start: vevent.getFirstPropertyValue("dtstart")
  }));
};

/**
 * Creates the fetch tasks action
 * @param {boolean} isFetching Whether the fetch is in progress
 * @param {Error|null} error The error if one occurred
 * @param {boolean} visualize Whether the visualize the fetch progresss
 * @param {boolean} isFetching Whether the fetch is in progress
 * @param {Array} tasks The fetched tasks
 * @returns {Object} The redux action
 */
const fetchTasksAction = createFetchAction("FETCH_TASKS", "tasks");

/**
 * Fetches all sales
 * @param {boolean} visualize Whether to visualize the progress of this action
 * @returns {Promise} The fetch promise
 */
export const fetchTasks = (visualize = false) => dispatch => {
  dispatch(fetchTasksAction(true, null, visualize, [], []));

  return fetch(
    `https://a.wunderlist.com/api/v1/ical/11690894-dct8bnfmfhnqg56k79r771nje3.ics`,
    {
      method: "GET",
      credentials: "include"
    }
  )
    .then(response => response.text())
    .then(icalData => {
      dispatch(fetchTasksAction(false, null, visualize, mapTasks(icalData)));

      return Promise.resolve(icalData);
    })
    .catch(e => {
      dispatch(fetchTasksAction(false, e, visualize, [], []));

      return Promise.reject(e);
    });
};
