// utils/data/equipmentData.js
import { apiClient } from '../apiClient';

const createEquipment = (equipment) => apiClient.post('/equipments/', equipment);

const getSingleEquipment = (id) => apiClient.get(`/equipments/${id}/`);

const getEquipments = () => apiClient.get('/equipments/');

const updateEquipment = (id, equipment) => apiClient.put(`/equipments/${id}/`, equipment);

const deleteEquipment = (id) => apiClient.delete(`/equipments/${id}/`);

export {
  createEquipment,
  getSingleEquipment,
  getEquipments,
  updateEquipment,
  deleteEquipment,
};
