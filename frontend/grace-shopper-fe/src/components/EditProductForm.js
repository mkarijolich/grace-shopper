import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  Popper, Tab, TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { changeProduct, postNewProduct } from "../api";


const EditProductForm = (props) => {
  const { product, categories, anchorEl, open, setOpen } = props;

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState([]);

  const [newPhoto, setNewPhoto] = useState("");
  const [photosToAdd, setPhotosToAdd] = useState([]);
  const [currentTab, setCurrentTab] = useState("details");


  useEffect(() => {
    if(product) {
      setName(product.name);
      setDetail(product.detail);
      setCategory(product.category);
      setPrice(product.price);
      setPhotos(product.pictureLinks);
    }
  }, [product]);

  const handleCancel = (e) => {
    e.preventDefault();
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setName("");
    setDetail("");
    setCategory("");
    setPrice("");
  }

  const handleSubmit = (e) => {
    product ? updateExistingProduct() : createNewProduct();
  };

  const updateExistingProduct = async () => {
    if(!name || !detail || !category || !price) {
      console.log(name, detail, category, price);
      return;
    }

   try{
        await changeProduct(product.id, name, detail, category, price, photosToAdd);
        resetForm();
        setOpen(false);
    } catch (error) {
      alert(error);
  }
  };

  const createNewProduct = async () => {
    if(!name || !detail || !category || !price) {
      console.log(name, detail, category, price);
      return;
    }

   try{
        await postNewProduct(name, detail, category, price, photosToAdd);
        resetForm();
        setOpen(false);
    } catch (error) {
        alert(error);
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if(!newPhoto || newPhoto.trim() === '') return;

    const photosCopy = [...photos];
    photosCopy.push(newPhoto);
    setPhotos(photosCopy);

    const photosToAddCopy = [...photosToAdd];
    photosToAddCopy.push(newPhoto);
    setPhotosToAdd(photosToAddCopy);

    setNewPhoto("");
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
      <Paper sx={{ m: 1, p: 2, width: 400, height: 650, zIndex: "tooltip" }}>
        {product ? <h2> Edit Product </h2> : <h2> Create Product </h2>}

        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab label="Details" value="details" />
              <Tab label="Photos" value="photos" />
            </TabList>
          </Box>

          <TabPanel value="details">
            <Box component="form" noValidate>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Product Name"
                    autoFocus
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="detail"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="detail"
                    label="Product Detail"
                    autoFocus
                    variant="standard"
                    value={detail}
                    onChange={(e) => setDetail(e.currentTarget.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={categories}
                    fullWidth
                    onChange={(e, val) => {
                      console.log(val);
                      setCategory(val)}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="category"
                        required
                        fullWidth
                        id="category"
                        label="Product Category"
                        autoFocus
                        variant="standard"
                        value={category}
                        onChange={(e) => setCategory(e.currentTarget.value)}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    name="price"
                    type="number"
                    required
                    fullWidth
                    id="price"
                    label="Price (USD)"
                    autoFocus
                    variant="standard"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                  />
                </Grid>

                <Grid item>
                  <Button onClick={handleSubmit}> Submit </Button>
                  <Button onClick={handleCancel}> Cancel </Button>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel value="photos">
            {photos.map((photo) => (
              <div key={photo}> {photo} </div>
            ))}
            <TextField
              name="newPhoto"
              id="newPhoto"
              label="Add Photo URL"
              variant="standard"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.currentTarget.value)}
            />
            <Button onClick={handleAddPhoto}> Add </Button>
          </TabPanel>
        </TabContext>
      </Paper>
    </Popper>
  );
};

export default EditProductForm;
