import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { shadows } from "../utilities/style";

const StyledTime = styled.time`
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
class Time extends React.PureComponent {
  constructor() {
    super();

    this.state = { seconds: 0 };
  }
  getTimeUntilNextMinute = () => {
    let now = new Date();
    return (60 - now.getSeconds()) * 1000;
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.updateTime();
      this.updateInterval = setInterval(this.updateTime, 60 * 1000);
    }, this.getTimeUntilNextMinute() + 500);
  };
  componentWillUnmount = () => {
    clearInterval(this.updateInterval);
  };
  updateTime = () => {
    this.setState({ seconds: new Date().getSeconds() });
  };
  render = () => {
    const date = new Date();
    return (
      <StyledTime {...this.props}>
        {date
          .getHours()
          .toString()
          .padStart(2, "0")}
        :
        {date
          .getMinutes()
          .toString()
          .padStart(2, "0")}
      </StyledTime>
    );
  };
}

Time.propTypes = {
  inline: PropTypes.bool
};

export default Time;
