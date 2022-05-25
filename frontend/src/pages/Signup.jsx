import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Container,
  Button,
  TextField,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { registerUser } from "services/helpers";
import styled from "styled-components";
import triangle from "../assets/triangle_blue.png";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // console.log(useSelector((store) => store.auth))

  const registerUser = async (options) => {
    try {
      const response = await fetch(
        "https://project-auth-asm.herokuapp.com/register",
        options
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        navigate("/home");
      } else if (!data.success) {
        console.log(error);
        setError(data.response);
      }
    } catch (error) {
      console.log(error);
      // setError(error.response)
    }
  };

  const onSignUp = () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

    if (password.match(passwordPattern) && username.length > 4) {
      console.log("Password is good to go");
      registerUser({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
    } else {
      setError(
        "Password needs to be between 8 and 30 characters and contain at least one uppercase letter, one lowercase letter, one special symbol, and one number."
      );
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <Stack spacing={2} mt={12}>
          <Logo src={triangle} alt="esoteric logo." />
          <Typography
            variant="h1"
            fontSize={24}
            fontWeight={500}
            textAlign="center"
            color="secondary"
          >
            Sign up
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            required={true}
            autoComplete="true"
            fullWidth
            onChange={(event) => setUsername(event.target.value)}
            color="secondary"
            // value={username}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required={true}
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            color="secondary"
            //value={}
          />
          {error.length > 0 && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          )}
          <Button
            color="secondary"
            onClick={onSignUp}
            variant="contained"
            fullWidth
            size="large"
          >
            REGISTER IF YOU MUST
          </Button>
          <Divider />
          <Button onClick={() => navigate("/signin")} color="secondary">
            Already registered? Login here
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Signup;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 0 22px #fff);
  margin: 0 auto;
`;
