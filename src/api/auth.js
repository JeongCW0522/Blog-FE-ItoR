import axios from 'axios';

const BaseUrl = import.meta.env.VITE_API_URL;

const Axios = axios.create({
  baseURL: BaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { BaseUrl, Axios };
