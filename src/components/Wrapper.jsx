import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SPRING_MORNING_COLLECTION_ID = 2481547;
const SPRING_DAY_COLLECTION_ID = 2481588;
const SPRING_EVENING_COLLECTION_ID = 2481562;
const SPRING_NIGHT_COLLECTION_ID = 2481540;

const SUMMER_MORNING_COLLECTION_ID = 2481549;
const SUMMER_DAY_COLLECTION_ID = 2481568;
const SUMMER_EVENING_COLLECTION_ID = 2481563;
const SUMMER_NIGHT_COLLECTION_ID = 2481538;

const AUTUMN_MORNING_COLLECTION_ID = 2481553;
const AUTUMN_DAY_COLLECTION_ID = 2481577;
const AUTUMN_EVENING_COLLECTION_ID = 2481565;
const AUTUMN_NIGHT_COLLECTION_ID = 2481541;

const WINTER_MORNING_COLLECTION_ID = 2481554;
const WINTER_DAY_COLLECTION_ID = 2481566;
const WINTER_EVENING_COLLECTION_ID = 2481574;
const WINTER_NIGHT_COLLECTION_ID = 2481543;

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #6ab5d9;

  z-index: -1;
`;

/**
 * The app wrapper
 * @returns {Component} The component
 */
class Wrapper extends React.Component {
  constructor() {
    super();

    this.state = { collectionId: this.getCollectionId() };
  }

  componentDidMount = () => {
    this.updateBackground = setInterval(
      () => this.setState({ collectionId: this.getCollectionId() }),
      1000 * 60 * 10
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.updateBackground);
  };

  /** Returns the collection id appropriate for the given date
   * @param {Date} [date=new Date()] The date to get the collection id of
   * @returns {number} The collection id
   */
  getCollectionId = (date = new Date()) => {
    const month = date.getMonth() + 1,
      hours = date.getHours();

    if (month >= 3 && month <= 5) {
      //spring
      if (hours >= 7 && hours <= 10) {
        return SPRING_MORNING_COLLECTION_ID;
      } else if (hours >= 11 && hours <= 17) {
        return SPRING_DAY_COLLECTION_ID;
      } else if (hours >= 18 && hours <= 20) {
        return SPRING_EVENING_COLLECTION_ID;
      } else {
        return SPRING_NIGHT_COLLECTION_ID;
      }
    } else if (month >= 6 && month <= 8) {
      //summer
      if (hours >= 6 && hours <= 9) {
        return SUMMER_MORNING_COLLECTION_ID;
      } else if (hours >= 10 && hours <= 18) {
        return SUMMER_DAY_COLLECTION_ID;
      } else if (hours >= 19 && hours <= 22) {
        return SUMMER_EVENING_COLLECTION_ID;
      } else {
        return SUMMER_NIGHT_COLLECTION_ID;
      }
    } else if (month >= 9 && month <= 11) {
      //autumn
      if (hours >= 7 && hours <= 10) {
        return AUTUMN_MORNING_COLLECTION_ID;
      } else if (hours >= 11 && hours <= 17) {
        return AUTUMN_DAY_COLLECTION_ID;
      } else if (hours >= 18 && hours <= 20) {
        return AUTUMN_EVENING_COLLECTION_ID;
      } else {
        return AUTUMN_NIGHT_COLLECTION_ID;
      }
    } else {
      //winter
      if (hours >= 8 && hours <= 11) {
        return WINTER_MORNING_COLLECTION_ID;
      } else if (hours >= 12 && hours <= 16) {
        return WINTER_DAY_COLLECTION_ID;
      } else if (hours >= 17 && hours <= 19) {
        return WINTER_EVENING_COLLECTION_ID;
      } else {
        return WINTER_NIGHT_COLLECTION_ID;
      }
    }
  };

  render = () => {
    const { collectionId } = this.state;

    return (
      <StyledWrapper>
        <Background
          style={{
            backgroundImage: `url(https://source.unsplash.com/collection/${collectionId}/${
              screen.width
            }x${screen.height})`
          }}
        />
        {this.props.children}
      </StyledWrapper>
    );
  };
}

Wrapper.propTypes = {
  children: PropTypes.node
};

export default Wrapper;
