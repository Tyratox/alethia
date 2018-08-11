import React from "react";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { hot } from "react-hot-loader";
import { ThemeProvider, createTheme, Arwes } from "@arwes/arwes";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import Wrapper from "./components/Wrapper";
import Hello from "./pages/Hello";
import Menu from "./pages/Menu";

const theme = createTheme({
  color: {
    primary: {
      base: "#fff",
      dark: "#56ccf2",
      light: "#fff"
    },
    header: {
      base: "#fff",
      dark: "#56ccf2",
      light: "#fff"
    }
  }
});

/**
 * The root component rendering the whole app
 */
class App extends React.Component {
  /**
   * Renders the component
   * @returns {Component} The component
   */
  render = () => {
    const { history, store } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <StyledThemeProvider
              theme={{
                breakpoints: ["36rem", "48rem", "62rem", "75rem"]
              }}
            >
              <Arwes>
                <Wrapper>
                  <Switch>
                    <Route exact path="/" component={Hello} />
                    <Route exact path="/menu" component={Menu} />
                  </Switch>
                </Wrapper>
              </Arwes>
            </StyledThemeProvider>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  };
}

export default hot(module)(App);
