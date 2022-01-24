export const BASE_URL = "http://localhost:4000/api";

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
}


  export const register = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            timeout:8000,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    username: username,
                    password: password
            })

        })
        const res = await response.json();
        
        return res

    } catch (error) {
        console.log("An error occurred while trying to register a new user.")
    }
}

export const login = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const res = await response.json();
        return res;
    }
    catch (error) {
        console.log("An error occurred while trying to login.")
        console.error()
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