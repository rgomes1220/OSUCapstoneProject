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

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
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
          Sign in
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

          <LoaderButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
            size="large"
          >
            Sign In
          </LoaderButton>
        </form>
      </FormContainer>
    </Container>
  );
}
