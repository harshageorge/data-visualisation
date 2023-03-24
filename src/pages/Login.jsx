import React, { useState, useContext, useEffect } from "react";
import { Grid, Paper, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../components/Auth-context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      seterrorMessage("");
      await signIn(email, password);
      navigate("/home");
    } catch (e) {
      seterrorMessage("invalid username/password");
      console.log(e.message);
    }
  };
  const paperStyle = { padding: 15, minheight: "60vh" };
  const btnstyle = { margin: "20px 0" };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", padding: 20 }}
    >
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align="center">
            <h2>Log In</h2>
          </Grid>
          {errorMessage && (
            <Alert variant="standard" color="error">
              {errorMessage}{" "}
            </Alert>
          )}

          <TextField
            label="Username"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <br></br>
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Log in
          </Button>

          <p>
            Don't have an account yet? <Link to="/signup">Sign up</Link>{" "}
          </p>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
