import { apiClient } from '../apiClient';

const createSpecies = (species) => apiClient.post('/species/', species);

const getSingleSpecies = (id) => apiClient.get(`/species/${id}/`);

const getSpecies = () => apiClient.get('/species/');

const updateSpecies = (id, species) => apiClient.put(`/species/${id}/`, species);

const deleteSpecies = (id) => apiClient.delete(`/species/${id}/`);

export {
  createSpecies,
  getSingleSpecies,
  getSpecies,
  updateSpecies,
  deleteSpecies,
};
