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

export default function Register(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });

  function validateForm() {
    return (
      fields.password.length > 0 && fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);

      let postData = {
        email: fields.email.toString(),
        user_id: newUser["userSub"].toString()
      };

      await fetch(
        "https://v5yyja3u9i.execute-api.us-east-1.amazonaws.com/v0/create-new-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData)
        }
      );
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  };

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Container maxWidth="xs">
        <FormContainer>
          <Typography component="h1" variant="h4">
            Confirm Registration
          </Typography>
          <form onSubmit={handleConfirmationSubmit}>
            <TextField
              required
              id="confirmationCode"
              label="confirmationCode"
              variant="outlined"
              margin="normal"
              fullWidth
              value={fields.confirmationCode}
              onChange={handleFieldChange}
            />
            <LoaderButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              isLoading={isLoading}
              disabled={!validateConfirmationForm()}
              size="large"
            >
              Confirm Registration
            </LoaderButton>
          </form>
        </FormContainer>
      </Container>
    );
  }

  function renderForm() {
    return (
      <Container maxWidth="xs">
        <FormContainer>
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="email"
              label="e-mail address"
              variant="outlined"
              margin="normal"
              fullWidth
              value={fields.email}
              onChange={handleFieldChange}
            />
            <TextField
              required
              id="password"
              label="password"
              type="password"
              variant="outlined"
              margin="normal"
              value={fields.password}
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
              Register
            </LoaderButton>
          </form>
        </FormContainer>
      </Container>
    );
  }

  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
