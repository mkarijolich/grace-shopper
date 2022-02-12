import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Container, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../api";
import CategoryCard from "./CategoryCard";
import PictureSlider from "./PictureSlider";
import Register from "./Register";


const CustomerHome = (props) => {

  const [value, setValue] = useState("All");
  const [productsArray, setProductsArray] = useState([]);

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
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs">
              <Tab label="All Department" value="All" />
              <Tab label="Top Deals" value="Top Deals" />
              <Tab label="Featured Products" value="Featured Products" />
              <Tab label="Best Sellers" value="Best Sellers" />
            </TabList>
          </Box>

          <TabPanel value="All">
            <Box sx={{ mt: "40px" }}>
              <PictureSlider products={productsArray} maxItems={7} />
            </Box>
          </TabPanel>

          <TabPanel value="Top Deals">
            <Container
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 15,
              }}
            >
              <Box
                component="img"
                src="img/topDeals.png"
                alt="topDeals"
                sx={{ display: "flex", height: "300px" }}
              ></Box>
              <Box>
                {" "}
                <PictureSlider products={productsArray} maxItems={7} />
              </Box>
            </Container>
          </TabPanel>

          <TabPanel value="Featured Products"></TabPanel>

          <TabPanel value="Best Sellers"></TabPanel>

          <TabPanel value="New"></TabPanel>

          <TabPanel value="Register">
            <Register />
          </TabPanel>
        </TabContext>
      </Box>

      <Box sx={{ mt: "20px", mb: "40px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          <Box
            component="img"
            src="img/truck.jpg"
            alt="truck"
            sx={{ height: "100px", width: "100px" }}
          ></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Ready in one hour</Typography>
          </Box>

          <Box
            component="img"
            src="img/boxes.jpg"
            alt="boxes"
            sx={{ height: "100px", width: "100px" }}
          ></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Free Next Day Delivery</Typography>
          </Box>

          <Box
            component="img"
            src="img/return.jpg"
            alt="return"
            sx={{ height: "100px", width: "100px" }}
          ></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Free Return</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <CategoryCard />
      </Box>
    </Container>
  );
};

export default CustomerHome;
