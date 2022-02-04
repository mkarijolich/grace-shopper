import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

// import Home from "./components/Home"
// import ProductWall from './src/components/ProductWall';
// import Featured from './src/components/Featured';
// import Orders from './src/components/Orders';
// import NavBar from './src/components/NavBar';
// import MyAccount from './src/components/Myaccount';

import { getAllProducts } from "../api/index";

import { ProductWall, Featured } from "./";


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
  const [productsArray, setProductsArray] = useState([]);
  const [generalViewOn, setGeneralViewOn] = useState(true);
  const [productBeingViewed, setProductBeingViewed] = useState({});

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    Promise.all( 
      [
        getAllProducts() //need to make a a getAllProductPictures function in api/index and integrate throughout backend
      ]
    )
    .then(([productsFromAPI]) => {
      setProductsArray(productsFromAPI);
      // console.log(routinesFromAPI)
    })
  }, [])

  // useEffect(() => {
  //   Promise.all( 
  //     [
  //       fetchAllOrders()
  //     ]
  //   )
  //   .then(([ordersFromAPI]) => {
  //     setRoutines(ordersFromAPI);
  //     // console.log(routinesFromAPI)
  //   })
  // }, [])



  

  return (
    <Router>
      <NavBar handleLogout={handleLogout} user={user} products={products} orders={orders}/>
      <Routes>
        <Route exact path='/' element={<><Home setUser={setUser} user={user} /> <Featured productsArray={productsArray} generalViewOn={generalViewOn} setGeneralViewOn={setGeneralViewOn} productBeingViewed={productBeingViewed} setProductBeingViewed={setProductBeingViewed}/></>}/>
        <Route exact path='/products' element={<ProductWall user={user} productsArray={productsArray} setProducts={setProductsArray} generalViewOn={generalViewOn} setGeneralViewOn={setGeneralViewOn} productBeingViewed={productBeingViewed} setProductBeingViewed={setProductBeingViewed} />} />
        <Route exact path='/orders' element={<Orders orders={orders} setOrders={setOrders}/>} />
        <Route exact path='/myaccount' element={<MyAccount products={products} user={user} orders={orders}/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;