import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./components/Home"
import Products from './components/Products'
import Orders from './components/Orders';
import NavBar from './components/NavBar';
import MyAccount from './components/Myaccount'
import Login from "./components/Login";
import Register from "./components/Register";
import { loadTokenFromLocalStorage } from './helpers/tokenHelpers';

// import { fetchAllProducts, fetchAllOrders } from "./api/index";



function App() {
  
  // Load login from cookie
  let userData = loadTokenFromLocalStorage();

  const [user, setUser] = useState(userData);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('token');
  };

  // useEffect(() => {
  //   Promise.all( 
  //     [
  //       fetchAllProducts()
  //     ]
  //   )
  //   .then(([productsFromAPI]) => {
  //     setProducts(productsFromAPI);
  //     // console.log(routinesFromAPI)
  //   })
  // }, [])

  // useEffect(() => {
  //   Promise.all( 
  //     [
  //       fetchAllOrders()
  //     ]
  //   )
  //   .then(([ordersFromAPI]) => {
  //     setOrders(ordersFromAPI);
  //     // console.log(routinesFromAPI)
  //   })
  // }, [])



  

  return (
    <Router>
      <NavBar handleLogout={handleLogout} user={user} products={products} orders={orders}/> 
      <Routes>
        <Route path='/' element={<Home userData={user}/>}/>
        <Route path='/login' element={<Login  setUser={setUser}/>} />
        <Route path='/register' element={<Register  setUser={setUser} user={user}/>} /> 
        <Route path='/products' element={<Products user={user} products={products} setProducts={setProducts} />} />
        <Route path='/orders' element={<Orders orders={orders} setOrders={setOrders}/>} />
        <Route path='/myaccount' element={<MyAccount products={products} user={user} orders={orders}/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
