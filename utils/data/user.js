import { apiClient } from '../apiClient';

const updateThisUser = (id, user) => apiClient.put(`/users/${id}/`, user);

const updateGameMasterStatus = (id, isGameMaster) => apiClient.put(`/users/${id}/`, { game_master: isGameMaster });

const getSingleUser = (id) => apiClient.get(`/users/${id}/`);

const getUsers = () => apiClient.get('/users/');

const getGameMasters = () => apiClient.get('/users/'); // same as getUsers

export {
  updateThisUser,
  getSingleUser,
  getUsers,
  updateGameMasterStatus,
  getGameMasters,
};
