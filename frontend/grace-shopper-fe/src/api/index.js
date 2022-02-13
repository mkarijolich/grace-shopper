import { loadTokenFromLocalStorage } from "../helpers/tokenHelpers";

export const BASE_URL = "http://localhost:4000/api";

const getHeaders = () => {
  const { token } = loadTokenFromLocalStorage();
  const headers = {"Content-Type": "application/json"}

  if (token) headers.Authorization = `Bearer ${token}`
  return headers;
}

export const register = async (username, password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      timeout: 8000,
      headers: getHeaders(),
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      }),
    });

    const res = await response.json();
    return res;
    
  } catch (error) {
    console.log("An error occurred while trying to register a new user.");
  }
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("An error occurred while trying to login.");
    console.error();
  }
};

export const fetchAllOrders = async () => {

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.orders;
  } catch (error) {
    console.log("An error occurred while fetching all orders.");
    throw error;
  }
};

export const fetchAllProducts = async () => {
  

  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log("An error occurred while fetching all products.");
    throw error;
  }
};

export const fetchAllUsers = async () => {
    
  
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: getHeaders(),
      });
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.log("An error occurred while fetching all users.");
      throw error;
    }
  };



  export const updateOrder = async(orderId, status) => {

    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
            method: "PATCH",
            headers: getHeaders(),
            body: JSON.stringify({
                    status: status
            })
        })
        return await response.json()

    } catch (error) {
        console.log("An error occurred while trying to edit a order.")
    }
}

export const getOrderByOrderId = async(orderId) => {

    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
            method: "GET",
            headers: getHeaders(),
        })
        const data = await response.json();
        return data.order;

    } catch (error) {
        console.log("An error occurred while trying to edit a order.")
    }
}

export const getAllAddresses = async() => {
  const { token, id } = loadTokenFromLocalStorage();
  try {
      const response = await fetch(`${BASE_URL}/users/${id}/addresses`, {
          method: "GET",
          headers: getHeaders(),
      })
      const data = await response.json();
      return data.addresses;

  } catch (error) {
      console.log("An error occurred while trying to get address.")
  }
}

export const createAddress = async (editName, editStreet1, editStreet2, editCity, editState, editPostalCode, editCountry, editBillingAddress) => {
  const { id } = loadTokenFromLocalStorage();

  try {
      const response = await fetch(`${BASE_URL}/users/${id}/addresses`, {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify({
                  name: editName,
                  street1: editStreet1,
                  street2: editStreet2,
                  city: editCity,
                  state: editState,
                  postalCode:editPostalCode,
                  country:editCountry,
                  BillingAddress:editBillingAddress
          })
      })
      return await response.json()

  } catch (error) {
      console.log("An error occurred while trying to create a address.")
  }
}

export const getOrdersByUserId = async() => {
  const { token, id } = loadTokenFromLocalStorage();
  try {
      const response = await fetch(`${BASE_URL}/users/${id}/orders`, {
          method: "GET",
          headers: getHeaders(),
      })
      const data = await response.json();
      return data.orders;

  } catch (error) {
      console.log("An error occurred while trying to get a order.")
  }
}

export const deleteUser = async (userId) => {
  
  try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: "DELETE",
          headers: getHeaders(),
      })
      const data = await response.json();
      return data;

  } catch (error) {
      console.log("An error occurred while trying to delete a user.")
      throw error
  }
}


export const updateUser = async(username,email,password) => {
  const { token, id } = loadTokenFromLocalStorage();

  try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({
            username:username,
            password:password,
            email:email,
          })
      })
      return await response.json()

  } catch (error) {
      console.log("An error occurred while trying to edit a user.")
  }
}

export const updateUserAccountType = async(userId, account_type) => {
  try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({
            account_type:account_type
          })
      })
      return await response.json()

  } catch (error) {
      console.log("An error occurred while trying to edit a user.")
  }
}

export const updateAddress = async (editName, editStreet1, editStreet2, editCity, editState, editPostalCode, editCountry, editBillingAddress) => {
  const { token, id } = loadTokenFromLocalStorage();

  try {
      const response = await fetch(`${BASE_URL}/users/${id}/addresses`, {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({
                  name: editName,
                  street1: editStreet1,
                  street2: editStreet2,
                  city: editCity,
                  state: editState,
                  postalCode:editPostalCode,
                  country:editCountry,
                  BillingAddress:editBillingAddress
          })
      })
      return await response.json()

  } catch (error) {
      console.log("An error occurred while trying to edit an address.")
  }
}


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
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: getHeaders(),
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
    console.log("An error occurred while trying to create a product.")
    throw error
  }
};


export const destroyProduct = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
      headers: getHeaders(),
    })
    const result = await response.json()
    return result;
  } catch (error) {
    console.log("An error occurred while trying to delist a product.")
    throw error
  }
}


export const changeProduct = async (id, name, detail, category, price, linksArray) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: getHeaders(),
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
