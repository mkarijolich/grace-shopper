import React from "react";
import { useState } from "react";
import { Container, Typography, TextField, IconButton, Button } from "@mui/material";
import { register, login } from "../api/index";

const Home = (props) => {
    const { user, setUser } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("logging in with username + password ", username, password);
        const response = await login(username, password);
    
        if (!response) {
          alert("An unknown error occurred, please try again later.");
        }
    
        else if (response.token) {
          const token = response.token;
          console.log(token);
          if (!token) {
            return;
          }
          const user = {
            token: token,
            username: username,
          };
          
          setUser(user);
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
    
        //   navigate("/myroutines");
        } else if (response.error) {
          alert(response.error.message);
        }
      };

      const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const response = await register(username, password);
    
        if (!response) {
          alert("An unknown error occurred, please try again later.");
    
         }else if (response.token) {
            const token = response.token;
            console.log(token);
            if (!token) {
              return;
            }
            const user = {
              token: token,
              username: username,
            };
    
            setUser(user);
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
            // console.log("newusername", username);
    
            // navigate("/");
          } else if (response.error) {
            alert(response.error.message);
          }
        }










    return(
        <Container component="main" maxWidth="false">
            <Box
            ></Box>
        </Container>
    )
}

export default Home;