import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const storeToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
        return true;
    }

    const expirationTime = decodedToken.exp * 1000;
    return Date.now() > expirationTime;
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        return null;
    }
    return token;
};

export const login = async (navigate, setLogin, setRole, credentials) => {
    try {
        const response = await axios.post('/api/user/login', credentials);
        const { token } = response.data;

        if (!token) {
            throw new Error('Login failed: No token provided');
        }

        console.log('Raw token:', token);

        let decodedToken;
        try {
            decodedToken = jwtDecode(token);
            console.log(decodedToken)
            storeToken(token);
            setRole(decodedToken.user.role);
            setLogin(true);

            if (decodedToken.user.role == 'user') {
                navigate('/user/home');
            } else if (decodedToken.user.role == 'admin') {
                navigate('/admin/dashboard');
            }
        } catch (error) {
            throw new Error('Token error occurred: Unable to decode token');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};


export const logoutUser = () => {
    removeToken();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });
};

export const getUserRole = () => {
    const token = getToken();
    if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
    }
    return null;
};
