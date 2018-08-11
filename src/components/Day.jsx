import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { shadows } from "../utilities/style";

const StyledDay = styled.time`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  color: #fff;
  font-weight: normal;
  text-shadow: ${shadows.textY};

  margin: 0;
  padding: 0;
`;

/**
 * The current time
 * @returns {Component} The component
 */
class Day extends React.PureComponent {
  constructor() {
    super();

    this.state = { date: 0 };
  }
  getTimeUntilMidnight = () => {
    let midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);

    return midnight.getTime() - new Date().getTime();
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.updateDate();
      this.updateInterval = setInterval(this.updateDate, 24 * 60 * 1000);
    }, this.getTimeUntilMidnight() + 500);
  };
  componentWillUnmount = () => {
    clearInterval(this.updateInterval);
  };
  updateDate = () => {
    this.setState({ date: new Date().getDate() });
  };
  render = () => {
    const date = new Date();
    return <StyledDay {...this.props}>{date.toLocaleDateString()}</StyledDay>;
  };
}

Day.propTypes = {
  inline: PropTypes.bool
};

export default Day;
