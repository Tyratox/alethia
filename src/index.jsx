//react
import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import throttle from "lodash/throttle";

import App from "./App";
import "./scss/global";
import { loadState, saveState } from "./local-storage";
import reducers from "./reducers";

//Load state from local storage and create history object
const persistedState = loadState();
const history = createHistory();

//and the redux store
const store = createStore(
  connectRouter(history)(reducers),
  persistedState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      store => next => action => {
        if (action.visualize) {
          store.dispatch(action.isFetching ? showLoading() : hideLoading());
        }
        return next(action);
      }
    )
  )
);

//storing some keys of the application state in the localstorage
store.subscribe(
  throttle(() => {
    const {} = store.getState();

    saveState({});
  }, 1000)
);
/**
 * Renders the application
 * @param {Component} Component that should be rendered as the top level application
 * @returns {void}
 */
const render = Component =>
  ReactDOM.render(
    <Component history={history} store={store} />,
    document.getElementById("root")
  );
//do the initial render
render(App);
