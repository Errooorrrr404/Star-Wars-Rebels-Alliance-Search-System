import axios from "axios";
const baseURL = 'http://localhost:8000';

export const apiAuth = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

export const apiPublic = axios.create({
    baseURL: baseURL
});
