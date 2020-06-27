import React, { useState } from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton.js";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => `${theme.spacing(10)}px`};
`;

export default function ChangePassword(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.newPassword.length > 0 &&
      fields.newPassword === fields.confirmPassword
    );
  }

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        fields.oldPassword,
        fields.newPassword
      );
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormContainer>
        <Typography component="h1" variant="h4">
          Change Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="oldPassword"
            label="old password"
            type="password"
            variant="outlined"
            margin="normal"
            value={fields.oldPassword}
            fullWidth
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="newPassword"
            label="new password"
            type="password"
            variant="outlined"
            margin="normal"
            value={fields.newPassword}
            fullWidth
            onChange={handleFieldChange}
          />
          <TextField
            required
            id="confirmPassword"
            label="confirm password"
            type="password"
            variant="outlined"
            margin="normal"
            value={fields.confirmPassword}
            fullWidth
            onChange={handleFieldChange}
          />
          <LoaderButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
            size="large"
          >
            Change Password
          </LoaderButton>
        </form>
      </FormContainer>
    </Container>
  );
}
