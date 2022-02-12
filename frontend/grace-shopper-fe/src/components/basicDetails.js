import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button,  Box, Typography, Container, Grid, TextField } from "@mui/material";
import { updateUser } from '../api';
import { loadTokenFromLocalStorage } from '../helpers/tokenHelpers';


const theme = createTheme();

const BasicDetails = (props) => {

    const {
        username,password
    } = props;

    const [editName, setEditName] = useState(""); //saved data in post page as default
    const [editEmailAddress, setEditEmailAddress] = useState("");
    const [editPassword, setEditPassword] = useState("");

    useEffect(() => {
        Promise.all([
            loadTokenFromLocalStorage(),
        ]).then(([token]) => {
            setEditName(token.username);
            setEditEmailAddress(token.email)
        });
      }, [setEditName, setEditEmailAddress]);
    
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">

                

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Basic detail</Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="userName"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="Username"
                                    autoFocus
                                    variant="standard"
                                    value={editName}
                                    onChange={(e) => setEditName(e.currentTarget.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="emailAddress"
                                    required
                                    fullWidth
                                    id="emailAddress"
                                    label="Email address"
                                    variant="standard"
                                    value={editEmailAddress}
                                    onChange={(e) => setEditEmailAddress(e.currentTarget.value)}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="password"
                                    fullWidth
                                    required
                                    id="password"
                                    label="Password"
                                    variant="standard"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.currentTarget.value)}
                                />
                            </Grid>

                            
                        </Grid>
                        <Button
                            sx={{ mt: 2, ml: 18 }}
                            variant="outlined"
                            onClick={(e) => {
                                e.preventDefault()
                                updateUser(editName, editEmailAddress, editPassword);
                            }}
                            
                                
                        >Update</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>


    )
}

export default BasicDetails;










