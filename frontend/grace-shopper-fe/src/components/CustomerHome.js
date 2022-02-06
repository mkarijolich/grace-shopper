import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Tab} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProductCard from "./productCard";
import CategoryCard from "./CategoryCard";
import PictureSlider from "./PictureSlider";
import Featured from "./Featured";
import CategoryProductsCard from "./CategoryProductsCard";

import { fetchAllProducts } from "../api";


const CustomerHome = (props) => {
  const { username, password } = props;

  const [value, setValue] = useState("All");
  const [products, setProducts] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [generalViewOn, setGeneralViewOn] = useState(true);
  const [productBeingViewed, setProductBeingViewed] = useState({});

  useEffect(() => {
    Promise.all( 
      [
        fetchAllProducts() //need to make a a getAllProductPictures function in api/index and integrate throughout backend
      ]
    )
    .then(([productsFromAPI]) => {
      setProductsArray(productsFromAPI);
      // console.log(routinesFromAPI)
    })
  }, [setProductsArray])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <Container>
      <Box>
        <Typography>logged in user</Typography>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs">
            <Tab label="All  Departments" value="All" />
            <Tab label="Home Goods" value="Home Goods" />
            <Tab label="Electronics" value="Electronics" />
            <Tab label="Essentials" value="Essentials" />
          </TabList>
        </Box>

        <TabPanel value="All">
            <CategoryProductsCard products={productsArray} />
        </TabPanel>

        <TabPanel value="Home Goods">
            <CategoryProductsCard products={productsArray} category="Home Goods" />
        </TabPanel>

        <TabPanel value="Electronics">
            <CategoryProductsCard products={productsArray} category="Electronics" />
        </TabPanel>

        <TabPanel value="Essentials">
            <CategoryProductsCard products={productsArray} category="Essentials" />
        </TabPanel>
        
      </TabContext>
    </Box>

    <Box>
        <CategoryCard />
    </Box>
    </Container>
  );
};

export default CustomerHome;
