import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import SwipeSideDrawer from "./SwipeSideDrawer.js";

//add styles to an html element
const Root = styled.div``;

//add new styles or override existing styles of a material ui component
const StyledAppBar = styled(AppBar)`
  box-shadow: none;
`;

const StyledTypography = styled(Typography)`
  flex-grow: 1;
`;

const NavLinks = props => {
  return props.isAuthenticated ? (
    <Button color="inherit" onClick={props.handleLogout}>
      Logout
    </Button>
  ) : (
    <Button color="inherit" component={Link} to={"/LogIn"}>
      Login
    </Button>
  );
};

const Nav = props => {
  return (
    <Root>
      <StyledAppBar position="static">
        <Toolbar>
          <SwipeSideDrawer
            routes={[
              "Projects",
              "Users",
              "EditUserInfo",
              "Map",
              "AR",
              "UploadProject",
              "ChangePassword",
              "Register"
            ]}
          />
          <StyledTypography variant="h6">Engineering Expo</StyledTypography>
          <NavLinks {...props} />
        </Toolbar>
      </StyledAppBar>
    </Root>
  );
};

export default Nav;
