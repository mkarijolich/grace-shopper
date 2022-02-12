import React from "react";
import DashboardContent from "./DashboardContent";
import CustomerHome from "./CustomerHome";
import {Container, Typography } from '@mui/material';


const Home = (props) => {

    const { userData } = props

    return (
        
        <Container>
            {
                (() => {
                    // Admin Dashboard Page
                    if (userData.account_type === 'ADMIN') 
                    return <DashboardContent />

                    else  return <CustomerHome />

                    
                })()
            }

        </Container>
    )    
}

export default Home;
