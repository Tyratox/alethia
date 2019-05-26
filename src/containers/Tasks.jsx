import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { shadows, borders } from "../utilities/style";
import { getTasks } from "../reducers/index";
import { fetchTasks } from "../actions/tasks";

const StyledTasks = styled.ul`
  display: block;
  list-style: none;

  width: 20vw;
  padding: 0.5rem 1rem;
  margin: 0;

  background-color: rgba(255, 255, 255, 0.8);
  border-radius: ${borders.radius};

  color: #555;
  font-weight: normal;
  font-size: 1vw;

  max-height: 40vh;
  overflow-y: scroll;
`;

const Task = styled.li`
  margin-bottom: 0.5rem;
  border-bottom: #555 1px solid;
  padding-bottom: 0.5rem;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  h2,
  h3 {
    margin: 0;
  }
`;

/**
 * The current tasks
 * @returns {Component} The component
 */
class Tasks extends React.PureComponent {
  componentDidMount = () => {
    this.fetchData();

    this.updateTasks = setInterval(this.fetchData, 1000 * 60 * 10);
  };

  componentWillUnmount = () => {
    clearInterval(this.updateTasks);
  };

  fetchData = () => this.props.fetchTasks();

  render = () => {
    const { tasks } = this.props;
    return (
      <StyledTasks>
        <Task>
          <h2>Aufgaben</h2>
        </Task>
        {tasks.map((task, index) => (
          <Task key={index}>
            <h3>{task.title}</h3>
            {task.start.day}.{task.start.month}.{task.start.year}
          </Task>
        ))}
      </StyledTasks>
    );
  };
}

Tasks.propTypes = {};

const mapStateToProps = state => ({ tasks: getTasks(state) });
const mapDispatchToProps = dispatch => ({
  /**
   * Fetches all tasks
   * @param {boolean} visualize Whether to visualize the progress
   * @returns {Promise} The fetch promise
   */
  fetchTasks(visualize = true) {
    return dispatch(fetchTasks(visualize));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
