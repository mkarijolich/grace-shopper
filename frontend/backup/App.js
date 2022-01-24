import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./components/Home"
import Products from './src/components/Products';
import Orders from './src/components/Orders';
import NavBar from './src/components/NavBar';
import MyAccount from './src/components/Myaccount';

import { fetchAllProducts, fetchAllOrders } from "./API/index";



function App() {
  
  let savedUsername = localStorage.getItem('username')
  let savedToken = localStorage.getItem('token')
  let savedUser = {};
  if(savedUsername && savedToken) {
    savedUser = {
      username: savedUsername,
      token: savedToken
    }
  }
  const [user, setUser] = useState(savedUser ? savedUser : {});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    Promise.all( 
      [
        fetchAllProducts()
      ]
    )
    .then(([productsFromAPI]) => {
      setRoutines(productsFromAPI);
      // console.log(routinesFromAPI)
    })
  }, [])

  useEffect(() => {
    Promise.all( 
      [
        fetchAllOrders()
      ]
    )
    .then(([ordersFromAPI]) => {
      setRoutines(ordersFromAPI);
      // console.log(routinesFromAPI)
    })
  }, [])



  

  return (
    <Router>
      <NavBar handleLogout={handleLogout} user={user} products={products} orders={orders}/>
      <Routes>
        <Route path='/' element={<Home setUser={setUser} user={user}/>}/>
        <Route path='/products' element={<Products user={user} products={products} setProducts={setProducts} />} />
        <Route path='/orders' element={<Orders orders={orders} setOrders={setOrders}/>} />
        <Route path='/myaccount' element={<MyAccount products={products} user={user} orders={orders}/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
