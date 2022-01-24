import React from "react";

import {Container, Box, Typography} from '@mui/material';



const CustomerHome = (props) => {

    const { username, password } = props;

    return (

        <Container>
            <Box>
                <Typography>
                Grace Shopper for customer
                </Typography>
            </Box>

        </Container>



    )
}

export default CustomerHome;