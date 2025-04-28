import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://blog.leets.land',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Axios;
