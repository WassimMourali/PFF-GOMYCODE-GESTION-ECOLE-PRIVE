import axiosInstance from './axiosConfig';

// Créer un étudiant
export const createStudent = async (data) => {
  try {
    const response = await axiosInstance.post('/students', data);
    return response.data;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

// Récupérer tous les étudiants
export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get('/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Récupérer un étudiant par ID
export const getStudentById = async (id) => {
  try {
    const response = await axiosInstance.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    throw error;
  }
};

// Mettre à jour un étudiant
export const updateStudent = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/students/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with ID ${id}:`, error);
    throw error;
  }
};

// Supprimer un étudiant
export const deleteStudent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with ID ${id}:`, error);
    throw error;
  }
};
