import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProductCard from "./ProductCard";
import CategoryCard from "./CategoryCard";
import PictureSlider from "./PictureSlider";
import Featured from "./Featured";
import CategoryProductsCard from "./CategoryProductsCard";
import { fetchAllProducts } from "../api";
import Register from "./Register";
import TopDeals from "./TopDeals";

const CustomerHome = (props) => {
  const { username, password } = props;

  const navigate = useNavigate();

  const [value, setValue] = useState("All");
  const [products, setProducts] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [generalViewOn, setGeneralViewOn] = useState(true);
  const [productBeingViewed, setProductBeingViewed] = useState({});

  useEffect(() => {
    Promise.all([
      fetchAllProducts(), //need to make a a getAllProductPictures function in api/index and integrate throughout backend
    ]).then(([productsFromAPI]) => {
      setProductsArray(productsFromAPI);
      // console.log(routinesFromAPI)
    });
  }, [setProductsArray]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Container>
      <Box>
        <Typography>logged in user</Typography>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs">
            <Tab label="All Department" value="All" />
              <Tab label="Top Deals" value="Top Deals" />
              <Tab label="Featured Products" value="Featured Products" />
              <Tab label="Best Sellers" value="Best Sellers" />
              <Tab label="New" value="New" />
              <Tab label="Register" value="Register" />
            </TabList>
          </Box>

          <TabPanel value="All">
            <Box>
              <PictureSlider products={productsArray} maxItems={7}/>
            </Box>
          </TabPanel>

          <TabPanel value="Top Deals">
            <Box component="img" src="img/topDeals.png" alt="topDeals" onClick={() => navigate("/topdeals")} sx={{ display:"flex", height:"300px" }}>
                
            </Box>
          </TabPanel>

          <TabPanel value="Featured Products">
          </TabPanel>

          <TabPanel value="Best Sellers">
          </TabPanel>

          <TabPanel value="New">
            
          </TabPanel>

          <TabPanel value="Register">
            <Register />
          </TabPanel>
        </TabContext>
      </Box>

      <Box>
        <Box sx={{display:"flex" , justifyContent:"space-evenly", alignContent:"center"}}>
          <Box component="img" src="img/truck.jpg" alt="truck" sx={{ height: "100px", width: "100px" }}></Box>
          <Box sx={{display:"flex" , alignItems:"center" }}><Typography>Ready in one hour</Typography></Box>

          <Box component="img" src="img/boxes.jpg" alt="boxes" sx={{ height: "100px", width: "100px" }}></Box>
          <Box sx={{display:"flex" , alignItems:"center" }}><Typography>Free Next Day Delivery</Typography></Box>

          <Box component="img" src="img/return.jpg" alt="return" sx={{ height: "100px", width: "100px" }}></Box>
          <Box sx={{display:"flex" , alignItems:"center" }}><Typography>Free Return</Typography></Box>
        </Box>
      </Box>


      <Box>
        <CategoryCard />
      </Box>
    </Container>
  );
};

export default CustomerHome;
