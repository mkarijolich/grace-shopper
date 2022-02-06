import React, { useState } from "react";
import { Container, Box, Typography, Tab, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const CategoryCard = () => {
  return (
    <Container style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 15,
      }}>
      <Card sx={{ maxWidth: 250 }}>
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

        
      </Card>

      <Card sx={{ maxWidth: 250}}>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1581783898377-1c85bf937427?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2515&q=80)',
          }}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Hardware
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Electronics
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kitchen
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1632393088059-53b002f8f2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Essentials
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kitchen
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kitchen
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 250 }}>
        <CardMedia
          component="img"
          height="100"
          sx={{backgroundImage: 'url(https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)',
        }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kitchen
          </Typography>
        </CardContent>
      </Card>

      




    </Container>
  );
};

export default CategoryCard;
