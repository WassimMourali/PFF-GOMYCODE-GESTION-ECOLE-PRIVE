import axiosInstance from './axiosConfig';

// Créer une classe
export const createClass = async (data) => {
  try {
    const response = await axiosInstance.post('/classes', data);
    return response.data;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

// Récupérer toutes les classes
export const getAllClasses = async () => {
  try {
    const response = await axiosInstance.get('/classes');
    return response.data;
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
};

// Récupérer une classe par ID
export const getClassById = async (id) => {
  try {
    const response = await axiosInstance.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching class with ID ${id}:`, error);
    throw error;
  }
};

// Mettre à jour une classe
export const updateClass = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/classes/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating class with ID ${id}:`, error);
    throw error;
  }
};

// Supprimer une classe
export const deleteClass = async (id) => {
  try {
    const response = await axiosInstance.delete(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting class with ID ${id}:`, error);
    throw error;
  }
};
