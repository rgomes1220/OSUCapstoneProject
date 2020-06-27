import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledProgress = styled(CircularProgress)`
  margin-right: ${({ theme }) => `${theme.spacing(1)}px`};
`;

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button disabled={disabled || isLoading} {...props}>
      {isLoading && <StyledProgress size={20} />}
      {props.children}
    </Button>
  );
}
