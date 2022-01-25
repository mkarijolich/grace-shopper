import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/index";

import {
  Container,
  Typography,
  TextField,
  IconButton,
  Button,
  Box,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Grid,
  createTheme,
  ThemeProvider,
  Avatar
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getDataFromTokenString } from "../helpers/tokenHelpers";

// const jwt = require("jsonwebtoken");

const Register = (props) => {
  const { setUser } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const token = await register(username, password);

    const userData = getDataFromTokenString(token);

    setUser(userData)
    localStorage.setItem('token', token);

    navigate("/");
}

  return (
    
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegisterSubmit}
              >
               Register
              </Button>
              <Grid container>
                
                <Grid item>
                  <Link href="./login" variant="body2">
                    {"You already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    
  );
};

export default Register;
