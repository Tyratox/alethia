import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Time from "../components/Time";
import Day from "../components/Day";
import Tasks from "../containers/Tasks";
import MenuButton from "../components/MenuButton";

const PositionedTimeDate = styled.div`
  position: absolute;
  top: 5vh;
  left: 5vw;

  font-size: 11vw;

  & > time:last-child {
    margin-top: -2rem;
    font-size: 6vw;
  }
`;

const PositionedTasks = styled.div`
  position: absolute;
  bottom: 5vh;
  right: 5vw;
`;

/**
 * The hello screen
 * @returns {Component} The component
 */
class Hello extends React.PureComponent {
  constructor() {
    super();
  }
  render = () => {
    return (
      <div>
        <PositionedTimeDate>
          <Time />
          <Day />
        </PositionedTimeDate>
        <PositionedTasks>
          <Tasks />
        </PositionedTasks>
        <MenuButton to="/menu" />
      </div>
    );
  };
}

Hello.propTypes = {};

export default Hello;
