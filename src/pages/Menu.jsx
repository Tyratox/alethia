import React from "react";
import styled, { keyframes } from "styled-components";
import Particles from "react-particles-js";
import { List, Logo, Button, Words, Project, Loading } from "@arwes/arwes";
import { Flex, Box } from "grid-styled";
import { FaItunes, FaSpotify, FaYoutube } from "react-icons/fa";

import MenuButton from "../components/MenuButton";
import RelativeBox from "../components/RelativeBox";
import { colors, shadows } from "../utilities/style";
import Time from "../components/Time";
import Day from "../components/Day";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #56ccf2,
    #2f80ed
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #56ccf2,
    #2f80ed
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  z-index: -1;

  opacity: 0.9;
`;

const Spacer = styled.div`
  width: 0.5rem;
  display: inline-block;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const Online = styled.div`
  background-color: ${({ online }) =>
    online ? colors.success : colors.danger};

  height: 1rem;
  width: 1rem;

  border-radius: 50%;
  vertical-align: middle;

  display: inline-block;

  animation: ${pulse} 1.3s ease-in-out infinite;
`;

const StyledLogo = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Icon = styled.span`
  vertical-align: middle;
  margin-right: 0.5rem;
`;

const AppListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const MarginButton = styled(Button)`
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

/**
 * The menu screen
 * @returns {Component} The component
 */
class Menu extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      ip: false,
      fullscreen:
        window.fullScreen ||
        (window.innerWidth == screen.width &&
          window.innerHeight == screen.height)
    };
  }

  componentDidMount = () => {
    window.RTCPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection; //compatibility for Firefox and chrome

    if (!window.RTCPeerConnection) {
      return this.setState({ ip: "Unknown" });
    }

    let pc = new RTCPeerConnection({ iceServers: [] });

    pc.createDataChannel(""); //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), () => {}); // create offer and set local description
    pc.onicecandidate = ice => {
      if (ice && ice.candidate && ice.candidate.candidate) {
        let myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
          ice.candidate.candidate
        )[1];
        this.setState({ ip: myIP });
        pc.onicecandidate = () => {};
      }
    };
  };

  enableFullscreen = () => {
    const elem = document.querySelector("body");

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }

    this.setState({ fullscreen: true });
  };

  disableFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }

    this.setState({ fullscreen: false });
  };

  render = () => {
    const { ip, fullscreen } = this.state;

    return (
      <div>
        <Flex flexWrap="wrap">
          <RelativeBox width={[1, 1, 1, 1 / 3]} pt={3} px={3}>
            <Project animate header="Alethia V0.1">
              {anim => (
                <div>
                  <div>
                    <Words animate show={anim.entered}>
                      IP
                    </Words>
                    <Spacer />
                    {ip ? (
                      <Words animate show={anim.entered}>
                        {ip}
                      </Words>
                    ) : (
                      <Loading animate small />
                    )}
                  </div>
                  <div>
                    <Words animate show={anim.entered}>
                      Online
                    </Words>
                    <Spacer />
                    <Online online={navigator.onLine} />
                  </div>
                  <div>
                    <Words animate show={anim.entered}>
                      Time
                    </Words>
                    <Spacer />
                    <Day inline /> <Time inline />
                  </div>
                </div>
              )}
            </Project>
          </RelativeBox>
          <RelativeBox width={[1, 1, 1, 1 / 3]} pt={3} px={3}>
            <Project animate header="Actions">
              <MarginButton
                animate
                onClick={() => {
                  window.location = "/";
                }}
              >
                Refresh
              </MarginButton>
              {fullscreen ? (
                <MarginButton
                  animate
                  onClick={this.disableFullscreen}
                  layer="alert"
                >
                  Disable Fullscreen
                </MarginButton>
              ) : (
                <MarginButton
                  animate
                  onClick={this.enableFullscreen}
                  layer="success"
                >
                  Enable Fullscreen
                </MarginButton>
              )}
            </Project>
          </RelativeBox>
          <RelativeBox width={[1, 1, 1, 1 / 3]} pt={3} px={3} />
          <RelativeBox width={[1, 1, 1, 1 / 3]} pt={3} px={3}>
            <Project animate header="Applications">
              <List node="ul">
                <AppListItem>
                  <Button
                    animate
                    onClick={() => (window.location = "itunes://")}
                  >
                    <Icon>
                      <FaItunes />
                    </Icon>
                    iTunes
                  </Button>
                </AppListItem>
                <AppListItem>
                  <Button
                    animate
                    onClick={() => (window.location = "spotify://")}
                  >
                    <Icon>
                      <FaSpotify />
                    </Icon>
                    Spotify
                  </Button>
                </AppListItem>
                <AppListItem>
                  <Button
                    animate
                    onClick={() => {
                      var win = window.open("https://youtube.com", "_blank");
                      win.focus();
                    }}
                  >
                    <Icon>
                      <FaYoutube />
                    </Icon>
                    YouTube
                  </Button>
                </AppListItem>
              </List>
            </Project>
          </RelativeBox>
        </Flex>
        <Background>
          <StyledLogo>
            <Logo animate size={300} />
          </StyledLogo>
        </Background>

        <Particles
          params={{
            particles: {
              number: {
                value: 80
              }
            },
            retina_detect: true
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%"
          }}
        />
        <MenuButton to="/" />
      </div>
    );
  };
}

Menu.propTypes = {};

export default Menu;
