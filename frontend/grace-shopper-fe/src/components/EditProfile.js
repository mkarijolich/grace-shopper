import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAddress } from "../api/index";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const theme = createTheme();

const EditProfile = (props) => {
  const {
      setOpen
  } = props;

  const [editName, setEditName] = useState(""); //saved data in post page as default
  const [editStreet1, setEditStreet1] = useState("");
  const [editStreet2, setEditStreet2] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editPostalCode, setEditPostalCode] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editBillingAddress, setEditBillingAddress] = useState("");


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Address
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="editName"
                  required
                  id="editName"
                  label="Name"
                  autoFocus
                  variant="standard"
                  value={editName}
                  onChange={(e) => setEditName(e.currentTarget.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  name="editStreet1"
                  required
                  fullWidth
                  id="editStreet1"
                  label="Street 1"
                  variant="standard"
                  value={editStreet1}
                  onChange={(e) => setEditStreet1(e.currentTarget.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  name="editStreet2"
                  fullWidth
                  id="editStreet2"
                  label="Street 2"
                  variant="standard"
                  value={editStreet2}
                  onChange={(e) => setEditStreet2(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="editCity"
                  required
                  fullWidth
                  id="editCity"
                  label="City"
                  variant="standard"
                  value={editCity}
                  onChange={(e) => setEditCity(e.currentTarget.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  name="editState"
                  required
                  fullWidth
                  id="editState"
                  label="State"
                  variant="standard"
                  value={editState}
                  onChange={(e) => setEditState(e.currentTarget.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  name="editPostalCode"
                  id="editPostalCode"
                  label="Postal Code"
                  variant="standard"
                  fullWidth
                  required
                  value={editPostalCode}
                  onChange={(e) => setEditPostalCode(e.currentTarget.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  name="editCountry"
                  id="editCountry"
                  label="Country"
                  variant="standard"
                  fullWidth
                  required
                  value={editCountry}
                  onChange={(e) => setEditCountry(e.currentTarget.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      name="editPaymentDetail"
                      id="editPaymentDetail"
                      variant="standard"
                      value={editBillingAddress}
                      onChange={(e) =>
                        setEditBillingAddress(!editBillingAddress)
                      }
                    />
                  }
                  label="Use this address for payment detail"
                />
              </Grid>
            </Grid>

            <Box>
            <Button
              sx={{ mt: 2, ml: 18 }}
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                createAddress(
                  editName,
                  editStreet1,
                  editStreet2,
                  editCity,
                  editState,
                  editPostalCode,
                  editCountry,
                  editBillingAddress
                );
                setOpen(false);
              }}
              to="/"
            >
              Submit
            </Button>

            <Button  
              sx={{ mt: 2, ml: 18 }} 
              variant="outlined"
              onClick={()=> setOpen(false)} >
              Cancel
            </Button>
            </Box>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditProfile;
