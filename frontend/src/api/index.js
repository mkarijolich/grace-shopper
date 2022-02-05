// import axios from 'axios';
export const HOME_URL = "https://localhost:4000";

// export async function getSomething() {
//   try {
//     const { data } = await axios.get('/api');
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function getAllProducts() {
//   try{
//     const res = await axios.get(`${HOME_URL}`);
//     const data = res.data;
//     console.log(data);
//   } catch(error){
//     throw error;
//   }
// }


export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log("An error occurred while fetching all products.");
    throw error;
  }
};

export const fetchProductsByCategory = async ( category ) => {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log("An error occurred while fetching the product.");
    throw error;
  }
}

export const fetchProductById = async ( id ) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log("An error occurred while fetching the product.");
    throw error;
  }
}


export const postNewProduct = async (name, detail, category, price, linksArray) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':
          `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        detail: detail,
        category: category,
        price: price,
        linksArray: linksArray
      })
    })
    return await response.json();

  } catch (error) {
    console.log("An error occurred while trying to list a product.")
    throw error
  }
};


export const destroyProduct = async (productId) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':
          `Bearer ${token}`
      },
    })
    const result = await response.json()

    return result;
  } catch (error) {
    console.log("An error occurred while trying to delist a product.")
    throw error
  }
}


export const changeProduct = async (id, name, detail, category, price, linksArray) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await fetch(`${BASE_URL}/product/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':
          `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        detail: detail,
        category: category,
        price: price,
        linksArray: linksArray
      })
    })
    return await response.json()

  } catch (error) {
    console.log("An error occurred while trying to update a product.");
    throw error;
  }
}


export const register = async (username, password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      }),
    });
    const res = await response.json(); return res;
  } catch (error) {
    console.log("An error occurred while trying to register a new user.");
  }
};
// export async function detailedProductView() {
//   try{
//     const { data } = await axios.get();
//   } catch(error){

//   }
// }

// const axios = require('axios');

async function makeRequest() {

  const config = {
    method: 'get',
    url: 'http://webcode.me'
  }

  let res = await axios(config)

  console.log(res.status);
}

makeRequest();