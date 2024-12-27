import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createSpecies = (species) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/species/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(species),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleSpecies = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/species/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error fetching single species:', error);
      reject(error);
    });
});

const getSpecies = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/species/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSpecies = (id, species) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/species/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(species),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating species:', error);
      reject(error);
    });
});

const deleteSpecies = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/species/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createSpecies,
  getSingleSpecies,
  getSpecies,
  updateSpecies,
  deleteSpecies,
};
