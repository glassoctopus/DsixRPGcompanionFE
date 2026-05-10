import { apiClient } from '../apiClient';

// Helper to handle custom response format for getHeros
const handleHeroListResponse = (data) => {
  if (data && Array.isArray(data['They are'])) {
    return data['They are'];
  }
  throw new Error('Invalid response format');
};

const createHero = (hero) => apiClient.post('/heros/', hero);

const getSingleHero = (id) => apiClient.get(`/heros/${id}/`);

const getHeros = () => apiClient.get('/heros/')
  .then(handleHeroListResponse);

const updateHero = (hero, id) => apiClient.put(`/heros/${id}/`, hero);

const createHeroSkills = (skills) => apiClient.post('/heros/add-or-update-character-skills/', skills);

const updateHeroSkills = (skills) => apiClient.put('/heros/add-or-update-character-skills/', skills);

const isForceSensitive = (id) => apiClient.put(`/heros/${id}/`, { force_sensitive: true });

const isNotForceSensitive = (id) => apiClient.put(`/heros/${id}/`, { force_sensitive: false });

const deleteHero = (id) => apiClient.delete(`/heros/${id}/`);

export {
  createHero,
  getSingleHero,
  getHeros,
  updateHero,
  isForceSensitive,
  isNotForceSensitive,
  deleteHero,
  createHeroSkills,
  updateHeroSkills,
};
