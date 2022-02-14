import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchAllProducts } from "./api/index";
import './App.css';
import Cart from './components/Cart';
import CategoryProductsCard from './components/CategoryProductsCard';
import Home from "./components/Home";
import Login from "./components/Login";
import MyAccount from './components/Myaccount';
import NavBar from './components/NavBar';
import OrderDetail from './components/OrderDetail';
import ProductWall from './components/ProductWall';
import Register from "./components/Register";
import SearchResult from './components/SearchResult';
import TopDeals from './components/TopDeals';
import { loadTokenFromLocalStorage } from './helpers/tokenHelpers';


function App() {
  // Load login from cookie
  let userData = loadTokenFromLocalStorage();

  const [user, setUser] = useState(userData);
  const [products, setProducts] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [generalViewOn, setGeneralViewOn] = useState(true);
  const [productBeingViewed, setProductBeingViewed] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Promise.all([
      fetchAllProducts(), //need to make a a getAllProductPictures function in api/index and integrate throughout backend
    ]).then(([productsFromAPI]) => {
      setProductsArray(productsFromAPI);
      
    });
  }, [setProductsArray]);


  const handleLogout = () => {
    setUser({});
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <NavBar handleLogout={handleLogout} user={user} products={products} setSearchTerm={setSearchTerm}/> 
      <Routes>
        <Route path='/' element={<Home userData={user}/> }/>
        <Route path='/login' element={<Login  setUser={setUser}/>} />
        <Route path='/register' element={<Register  setUser={setUser} user={user}/>} /> 
        <Route path='/products' element={<ProductWall user={user} productsArray={productsArray} setProducts={setProductsArray} generalViewOn={generalViewOn} setGeneralViewOn={setGeneralViewOn} productBeingViewed={productBeingViewed} setProductBeingViewed={setProductBeingViewed} />} />
        <Route path='/orders/:id' element={<OrderDetail />} />
        <Route path='/myaccount' element={<MyAccount products={products} user={user} />}/>
        <Route path='/electronics' element={<CategoryProductsCard products={productsArray} category={"Electronics"} /> }></Route>
        <Route path='/essentials' element={<CategoryProductsCard products={productsArray} category={"Essentials"} /> }></Route>
        <Route path='/grocery' element={<CategoryProductsCard products={productsArray} category={"Grocery"} /> }></Route>
        <Route path='/lighting' element={<CategoryProductsCard products={productsArray} category={"Lighting"} /> }></Route>
        <Route path='/pets' element={<CategoryProductsCard products={productsArray} category={"Pets"} /> }></Route>
        <Route path='/homegoods' element={<CategoryProductsCard products={productsArray} category={"Home goods"} /> }></Route>
        <Route path='/topdeals' element={<TopDeals products={productsArray} /> }></Route>
        <Route path='/search' element={<SearchResult products={productsArray} searchTerm={searchTerm}/>} />
        <Route path='/cart' element={<Cart user={user} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
