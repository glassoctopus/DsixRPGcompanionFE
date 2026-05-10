import { apiClient } from '../apiClient';

const createCharacterGroup = (characterGroup) => apiClient.post('/charactergroups/', characterGroup);

const getSingleCharacterGroup = (id) => apiClient.get(`/charactergroups/${id}/`);

const getCharacterGroups = () => apiClient.get('/charactergroups/');

const addCharacterToGroup = (groupId, characterId) => apiClient.post(`/charactergroups/${groupId}/add_character/`, { character_id: characterId });

const removeCharacterFromGroup = (groupId, characterId) => apiClient.post(`/charactergroups/${groupId}/remove_character/`, { character_id: characterId });

const updateCharacterGroup = (id, characterGroup) => apiClient.put(`/charactergroups/${id}/`, characterGroup);

const deleteCharacterGroup = (id) => apiClient.delete(`/charactergroups/${id}/`);

export {
  createCharacterGroup,
  getSingleCharacterGroup,
  getCharacterGroups,
  addCharacterToGroup,
  removeCharacterFromGroup,
  updateCharacterGroup,
  deleteCharacterGroup,
};
