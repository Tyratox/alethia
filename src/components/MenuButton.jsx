import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MenuLink = styled(Link)`
  position: absolute;
  right: 5vw;
  top: 10vh;

  max-width: 5rem;

  display: flex;
  flex-wrap: wrap;
`;

const MenuSquare = styled.div`
  display: block;
  width: 2vw;
  height: 2vw;

  background-color: rgba(255, 255, 255, 0.8);
  margin: 0 0.25vw 0.25vw 0;
`;

/**
 * Renders the menu button
 * @returns {Component} The react component
 */
class MenuButton extends React.PureComponent {
  render = () => {
    return (
      <MenuLink {...this.props}>
        <MenuSquare />
        <MenuSquare />
        <MenuSquare />
        <MenuSquare />
      </MenuLink>
    );
  };
}

export default MenuButton;
