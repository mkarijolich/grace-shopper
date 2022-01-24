import jwt from 'jwt-decode'

export const loadTokenFromLocalStorage = () => {
    let token = localStorage.getItem('token');
    return getDataFromTokenString(token);
}

export const getDataFromTokenString = (token) => {
    try{
        if (token) {
            const decodedData = jwt(token);
            decodedData['token'] = token;
            return decodedData;
        } 
    } catch (error) {
        console.error(error);
    }
    return {}
}