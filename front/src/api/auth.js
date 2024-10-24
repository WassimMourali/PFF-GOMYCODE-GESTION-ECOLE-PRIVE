import axiosInstance from './axiosConfig';

// Inscription
export const register = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Connexion
export const login = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
