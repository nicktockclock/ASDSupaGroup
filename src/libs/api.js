import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

/**
 * Checks if a token is valid
 */
export const isTokenValid = (token) => {
    if (token) {
        const payload = token.split('.')[1];
        if (payload) {
            const decoded = JSON.parse(atob(payload));
            return (Date.now() / 1000 < decoded.exp);
        }
    }
    return false;
};

/**
 * Gets a token from email address
 */
export const getEmail = (token) => {
    const payload = token.split('.')[1];
    if (payload) {
        const decoded = JSON.parse(atob(payload));
        return decoded['email'];
    }
    return null;
}

/**
 * Returns an axios instance
 */
const getApiInstance = () => {
    const token = localStorage.getItem('token');

    const config = {
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Authorization': (isTokenValid(token)) ? `Bearer ${token}` : undefined,
        }
    };
    return axios.create(config);
};

export default getApiInstance