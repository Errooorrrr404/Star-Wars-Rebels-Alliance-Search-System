import axios, { AxiosInstance } from 'axios'
export const baseURL = 'http://localhost:8000'

export const apiAuthEmpty = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});


export const apiAuth = (): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return instance;
};

export const apiPublic = axios.create({
  baseURL
})
