import { apiClient } from '../apiClient';

const createSkill = (skill) => apiClient.post('/skills/', skill);

const getSingleSkill = (id) => apiClient.get(`/skills/${id}/`);

const getSkills = () => apiClient.get('/skills/');

const updateSkill = (id, skill) => apiClient.put(`/skills/${id}/`, skill);

const deleteSkill = (id) => apiClient.delete(`/skills/${id}/`);

export {
  createSkill,
  getSingleSkill,
  getSkills,
  updateSkill,
  deleteSkill,
};
