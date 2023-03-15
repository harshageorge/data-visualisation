import React, { useState, useContext, useEffect } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import { AppContext } from "../components/app-context";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/Auth-context";

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, seterrorMessage] = useState("");
  const { createUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    seterrorMessage("");
    try {
      await createUser(email, password);
    } catch {}
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
      style={{ minHeight: "100vh", padding: 10 }}
    >
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align="center">
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            label="Email"
            type="email"
            onChange={(e) => setEmail( e.target.value )}
            placeholder="Enter email"
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
          {errorMessage ? errorMessage : ""}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Log in
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
