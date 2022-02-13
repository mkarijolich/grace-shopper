import { Container } from '@mui/material';
import React from "react";
import CustomerHome from "./CustomerHome";
import DashboardContent from "./DashboardContent";


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
