import axios from 'axios';

// Configuration de l'instance Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Remplacez par l'URL de votre API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
