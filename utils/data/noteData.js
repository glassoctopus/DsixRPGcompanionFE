// utils/data/noteData.js
import { apiClient } from '../apiClient';

const createNote = (note) => apiClient.post('/notes/', note);

const getSingleNote = (id) => apiClient.get(`/notes/${id}/`);

const getNotes = () => apiClient.get('/notes/');

const updateNote = (id, note) => apiClient.put(`/notes/${id}/`, note);

const deleteNote = (id) => apiClient.delete(`/notes/${id}/`);

export {
  createNote,
  getSingleNote,
  getNotes,
  updateNote,
  deleteNote,
};
