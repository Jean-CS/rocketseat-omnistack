import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rocketseat-omnistack-backend.herokuapp.com',
});

export default api;
