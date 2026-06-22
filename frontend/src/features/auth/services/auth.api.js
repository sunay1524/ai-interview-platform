import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { username, email, password }, {
            withCredentials: true
        })

        return response.data
    }
    catch (err) {
        console.log(err)
    }
}


export async function login({ email, password }) {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password }, {
            withCredentials: true
        })

        return response.data
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

export async function getMe() {
    try {
        const response = await axios.get(`${API_URL}/auth/me`, {
            withCredentials: true
        })
        return response.data;
    } catch (err) {
        throw err;
    }
}

export async function logoutApi() {
    try {
        const response = await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true
        })
        return response.data;
    } catch (err) {
        throw err;
    }
}