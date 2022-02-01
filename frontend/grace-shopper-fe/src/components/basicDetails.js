import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button,  Box, Typography, Container, Grid, TextField } from "@mui/material";


const theme = createTheme();

const BasicDetails = (props) => {

    const {
        username,password
    } = props;

    // const [editName, setEditName] = useState(""); //saved data in post page as default
    // const [editStreet1, setEditStreet1] = useState("");
    // const [editStreet2, setEditStreet2] = useState("");

    
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
                                    name="fullName"
                                    required
                                    id="fullName"
                                    label="Full name"
                                    autoFocus
                                    variant="standard"
                                    // value={editName}
                                    // onChange={(e) => setEditName(e.currentTarget.value)}
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
                                    // value={editStreet1}
                                    // onChange={(e) => setEditStreet1(e.currentTarget.value)}
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
                                    // value={editStreet2}
                                    // onChange={(e) => setEditStreet2(e.currentTarget.value)}
                                />
                            </Grid>

                            
                        </Grid>
                        <Button
                            sx={{ mt: 2, ml: 18 }}
                            variant="outlined"
                            // onClick={(e) => {createAddress(editName, editStreet1, editStreet2);
                            // }}
                                // e.preventDefault()
                                
                        >Update</Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>


    )
}

export default BasicDetails;










