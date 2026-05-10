// utils/data/abilityData.js
import { apiClient } from '../apiClient';

const createAbility = (ability) => apiClient.post('/abilities/', ability);

const getSingleAbility = (id) => apiClient.get(`/abilities/${id}/`);

const getAbilities = () => apiClient.get('/abilities/');

const updateAbility = (id, ability) => apiClient.put(`/abilities/${id}/`, ability);

const deleteAbility = (id) => apiClient.delete(`/abilities/${id}/`);

export {
  createAbility,
  getSingleAbility,
  getAbilities,
  updateAbility,
  deleteAbility,
};
