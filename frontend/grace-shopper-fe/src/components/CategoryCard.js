import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Tab, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from '@mui/material';

const CategoryCard = () => {
    const navigate = useNavigate();
    
  return (
    <Container style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 15,
      }}>
      
      
      <Card sx={{ maxWidth: 250}} onClick={() => navigate("/electronics")}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1596552183299-000ef779e88d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80)',
          }}
          
        />
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Electronics
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>
      

      <Card sx={{ maxWidth: 250 }} onClick={() => navigate("/essentials")}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Essentials
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>

     

      <Card sx={{ maxWidth: 250 }} onClick={() => navigate("/grocery")}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1571748982800-fa51082c2224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Grocery
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 250 }} onClick={() => navigate("/lighting")}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1606170033648-5d55a3edf314?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Lighting
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>

      <Card sx={{ maxWidth: 250 }} onClick={() => navigate("/pets")}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Pets
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>


      <Card sx={{ maxWidth: 250 }} onClick={() => navigate("/homegoods")}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80)',
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Home Goods
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>


    </Container>
  );
};

export default CategoryCard;
