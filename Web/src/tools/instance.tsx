import axios from 'axios'
export const baseURL = 'http://localhost:8000'

export const apiAuth = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export const apiAuthEmpty = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export const apiPublic = axios.create({
  baseURL
})
