import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Auth-context";
export default function Navbar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              paddingRight: "20px",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {user && user.email}
          </Typography>
          {/* <Button
            color="inherit"
            sx={{ fontWeight: 700, fontSize: 17 }}
            onClick={() => {
              handleLogout();
            }}
          >
            Log out
          </Button> */}
              <Typography
            variant="h6"
            noWrap
            onClick={() => {
              handleLogout();
            }}
            sx={{
            fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              cursor:'pointer'
            }}
          >
           Log Out
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
