import { apiClient } from '../apiClient';

const createArchetype = (archetype) => apiClient.post('/archetypes/', archetype);

const getSingleArchetype = (id) => apiClient.get(`/archetypes/${id}/`);

const getArchetypes = () => apiClient.get('/archetypes/');

const updateArchetype = (archetype, id) => apiClient.put(`/archetypes/${id}/`, archetype);

const deleteArchetype = (id) => apiClient.delete(`/archetypes/${id}/`);

export {
  createArchetype,
  getSingleArchetype,
  getArchetypes,
  updateArchetype,
  deleteArchetype,
};
