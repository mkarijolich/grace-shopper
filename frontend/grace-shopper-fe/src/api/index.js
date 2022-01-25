export const BASE_URL = "http://localhost:4000/api";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const register = async (username, password) => {
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
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization':
                     `Bearer ${token}`
      },
    });
    const data = await response.json();
    console.log("GOT ORDERS", data.orders)
    return data.orders;
  } catch (error) {
    console.log("An error occurred while fetching all orders.");
    throw error;
  }
};

export const fetchAllProducts = async () => {
  const token = getTokenFromLocalStorage();

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

export const fetchAllUsers = async () => {
    const token = getTokenFromLocalStorage();
  
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization':
                     `Bearer ${token}`
        },
      });
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.log("An error occurred while fetching all users.");
      throw error;
    }
  };



  export const updateOrder = async(orderId, status) => {
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
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
    const token = getTokenFromLocalStorage();
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':
                    `Bearer ${token}`
            },
        })
        const data = await response.json();
        return data.order;

    } catch (error) {
        console.log("An error occurred while trying to edit a order.")
    }
}








// export const getMe = async () => {
//     const token = getTokenFromLocalStorage();

//     try {
//       const response = await fetch(`${BASE_URL}/users/me`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization':
//                     `Bearer ${token}`
//         },
//       });
//       const data = await response.json();
//       console.log(data)
//       return data.user;

//     } catch (error) {
//       console.log("An error occurred while fetching user data.");
//       throw error;
//     }
//   };

// export const fetchMyAccount = async () => {
//     const token = getTokenFromLocalStorage();

//     try {
//       const response = await fetch(`${BASE_URL}/users/me/myaccount`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           'Authorization':
//                     `Bearer ${token}`
//         },
//       });
//       const data = await response.json();
//       console.log(data)
//       return data.routines;

//     } catch (error) {
//       console.log("An error occurred while fetching all routines.");
//       throw error;
//     }
//   };
