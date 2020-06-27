import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => `${theme.spacing(20)}px`};
`;

const NotFound = () => {
  return (
    <StyledContainer maxWidth="xs">
      <Typography component="h1" variant="h4">
        Sorry, page not found.
      </Typography>
    </StyledContainer>
  );
};

export default NotFound;
