import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import styled, {
  ThemeProvider as StyledThemeProvider
} from "styled-components";
import { withRouter } from "react-router-dom";
import Routes from "./Routes.js";
import Nav from "./components/Nav.js";

// explicitly create the theme, this is so that
// it can be shared with styled-components also
const theme = createMuiTheme({
  //override theme defaults
  palette: { primary: { main: "#d73f09" } }
});

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const App = props => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  };

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    props.history.push("/login");
  };

  return (
    // Tell material-ui to inject its styles first so that
    // styled-components can override/extend the styles, else
    // material-ui will override
    !isAuthenticating && (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* pass theme to styled-components so it can be used
      (see StyledPaper above) */}
          <StyledThemeProvider theme={theme}>
            <CssBaseline />
            <Flex>
              <Nav
                handleLogout={handleLogout}
                isAuthenticated={isAuthenticated}
              />
              <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
            </Flex>
          </StyledThemeProvider>
        </ThemeProvider>
      </StylesProvider>
    )
  );
};

export default withRouter(App);
